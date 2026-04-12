import Fastify from 'fastify';
import auth from './auth.js';

const fastify = Fastify({
    logger: true
});

await fastify.register(auth);

fastify.get(
    '/api/hello', 
    {
        onRequest: [fastify.authenticate]
    },
    () => {
        return { hello: 'world' }
    });

fastify.post('/api/login', (request, reply) => {
    console.log(request.body);
    const { username, password } = request.body as { username: string, password: string };
    
    // TODO validate username and password
    // TODO: Use short term and refresh tokens
    if (username === 'admin' && password === 'password') {
        const token = fastify.jwt.sign({ username });
        reply.send({ token });
    } else {
        reply.status(401).send({ error: 'Invalid username or password' });
    }
});

try {
    await fastify.listen({ port: 3000 });
} catch (error) {
    fastify.log.error(error);
    process.exit(1);
}
