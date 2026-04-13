import cookie from '@fastify/cookie';
import Fastify from 'fastify';
import auth from './auth.js';
import authenticatedRoutes from './authenticated-routes.js';

const fastify = Fastify({
    logger: true
});

fastify.register(cookie);
await fastify.register(auth);

fastify.register(authenticatedRoutes);

try {
    await fastify.listen({ port: 3000 });
} catch (error) {
    fastify.log.error(error);
    process.exit(1);
}
