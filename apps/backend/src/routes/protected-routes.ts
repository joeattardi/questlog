import { fromNodeHeaders } from 'better-auth/node';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { auth } from '../auth/auth.js';
import { database } from '../database/database.js';
import { games } from '../database/schema.js';

import { Type, Static } from 'typebox';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { eq } from 'drizzle-orm';

const AddGameBody = Type.Object({
    name: Type.String()
});
type AddGameBody = Static<typeof AddGameBody>;

async function getSession(request: FastifyRequest, reply: FastifyReply) {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(request.headers)
    });

    if (!session) {
        return reply.status(401).send({
            error: 'Unauthorized'
        });
    }

    request.session = session;
}

export async function protectedRoutes(fastify: FastifyInstance) {
    fastify.addHook('preHandler', getSession);
    const app = fastify.withTypeProvider<TypeBoxTypeProvider>();

    fastify.get('/api/games', async (request, reply) => {
        const userGames = await database.select().from(games)
            .where(eq(games.userId, request.session!.user.id));
        reply.send(userGames);
    });

    app.post('/api/games', {
        schema: {
            body: AddGameBody
        }
    }, async (request, reply) => {
        const game = request.body;

        await database.insert(games).values({
            name: game.name,
            userId: request.session!.user.id
        });

        reply.status(201).send({ message: 'Game added successfully' });
    });
}
