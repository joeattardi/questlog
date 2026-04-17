import Fastify from 'fastify';

const HOST = process.env.HOST ?? '0.0.0.0';
const PORT = Number(process.env.PORT ?? 3000);

const app = Fastify({
    logger: true
});

app.get('/hello', async () => {
    return { message: 'Hello, World!' };
});

const start = async () => {
    try {
        await app.listen({ host: HOST, port: PORT });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
