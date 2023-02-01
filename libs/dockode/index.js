import execAsync from "@c/execAsync";
import execProviders from "./executableProviders.js";
import v8 from "v8";

let structuredClone = globalThis.structuredClone;
if (!structuredClone) {
  structuredClone = (obj) => v8.deserialize(v8.serialize(obj));
}
export const getProvider = (lang) => structuredClone(execProviders[lang]);
export const getAllProviders = (forPublic = true) => {
  const providersCopy = structuredClone(execProviders);
  if (!forPublic) return providersCopy;

  return Object.fromEntries(
    Object.entries(providersCopy).map(([key, value]) => {
      // Remove sensitive data
      delete value.docker;

      return [key, value];
    })
  );
};

export const run = async (lang, code) => {
  const currentExecuteProvider = getProvider(lang);

  // remove comments from code
  const cleanCode = code
    .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "")
    .replaceAll("'", '"');

  const execCommand = `
        docker run 
            --rm 
            --ulimit cpu=1 
            --stop-signal=5 
            --memory 128MB 
            ${currentExecuteProvider.docker.image}:${
    currentExecuteProvider.docker.defaultTag
  } 
             timeout 5 
             ${currentExecuteProvider.docker.command.replace(
               "{code}",
               cleanCode
             )}
    `.replaceAll("\n", " ");

  return execAsync(execCommand);
};

export const preload = async () => {
  const providers = getAllProviders(false);

  await Promise.all(
    Object.entries(providers).map(([key, value]) => {
      const pullCommand = `docker pull ${value.docker.image}:${value.docker.defaultTag}`;
      return execAsync(pullCommand);
    })
  );
};

export default {
  preload,
  getAllProviders,
  getProvider,
  run,
};
