import fastifyJwt from '@fastify/jwt';
import { FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { getUserByUsername } from './db/repositories/users.js';
import * as argon2 from 'argon2';

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}

export default fp(async (fastify) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET environment variable is not set');
    }

    fastify.register(fastifyJwt, {
        secret: process.env.JWT_SECRET,
        cookie: {
            cookieName: 'token',
            signed: false
        },
        sign: {
            expiresIn: '15m'
        }
    });

    fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify();
        } catch {
            // TODO improve this
            reply.status(401).send({ error: 'Unauthorized' });
        }
    });

    fastify.post('/api/login', async (request, reply) => {
        const { username, password } = request.body as { username: string; password: string };

        // TODO: Use short term and refresh tokens
        const user = await getUserByUsername(username);
        if (user && (await argon2.verify(user.passwordHash, password))) {
            const token = fastify.jwt.sign({ username });
            reply
                .setCookie('token', token, {
                    domain: 'localhost',
                    path: '/',
                    // TODO: enable later when using HTTPS
                    // secure: true
                    sameSite: true,
                    httpOnly: true
                })
                .code(200)
                .send({ status: 'loggedIn' });
        } else {
            reply.status(401).send({ error: 'Invalid username or password' });
        }
    });
});
