import { getAllProviders } from "@c/dockode";

export function generateCodeFromCtx(langDisplayName, ctx) {
  const execProviders = getAllProviders();
  const langName = Object.keys(execProviders).find(
    (key) => execProviders[key].displayName === langDisplayName
  );
  const generator = execProviders[langName].generator;
  const codeTemplate = generator.functionTemplate.trim();

  return codeTemplate
    .replaceAll("{name}", ctx.name)
    .replaceAll(
      "{args}",
      ctx.args.map((arg) => (generator.varPrefix ?? "") + arg.name).join(", ")
    )
    .replaceAll("{body}", ctx.body ?? "// Your code goes here...")
    .replaceAll(
      "{return}",
      ctx.args
        .map((arg) => (generator.varPrefix ?? "") + arg.name)
        .join(ctx.return.argsGlue)
    )
    .replaceAll("{usage}", ctx.usage ?? "");
}
