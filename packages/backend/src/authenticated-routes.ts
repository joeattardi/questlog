import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
    fastify.addHook('onRequest', fastify.authenticate);

    fastify.get('/api/current-user', (request, response) => {
        response.send({ user: request.user });
    });
}
