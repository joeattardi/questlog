import type { auth } from '../auth/auth.js';

type Session = typeof auth.$Infer.Session;

declare module 'fastify' {
    interface FastifyRequest {
        session?: Session;
    }
}
