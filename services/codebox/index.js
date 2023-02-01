import Fastify from "fastify";
import dockode from "@c/dockode";
import * as DB from "@c/staticDB";
import config from "@c/config";

const server = Fastify({
  logger: true,
});

server.get(`${config.basePath}/langs`, async (request, reply) => {
  return dockode.getAllProviders(true);
});

server.post(`${config.basePath}/langs/:lang`, async (request, reply) => {
  const { lang: codeLang } = request.params;
  const { code } = request.body;

  return await dockode.run(codeLang, code).catch((e) => e);
});

server.get(`${config.basePath}/functions/:id?`, async (request, reply) => {
  const { id } = request.params;

  if (!id) return DB.functions;

  const selectedFunction = DB.functions.find((f) => f.id === Number(id));
  if (!selectedFunction)
    return reply.code(404).send({ error: "Function not found" });

  return selectedFunction;
});

server.post(`${config.basePath}/functions`, async (request, reply) => {
  const { name, args, returnObj } = request.body;

  const newFunction = {
    name,
    args,
    return: returnObj,
  };

  DB.functions.push(newFunction);

  return newFunction;
});

server.listen(
  {
    port: config.port,
    host: config.host,
  },
  (err, address) => {
    if (err) throw err;

    server.log.info(`server listening on ${address}`);
  }
);
