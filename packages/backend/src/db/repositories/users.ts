import { eq } from 'drizzle-orm';
import { db } from '../index.js';
import { usersTable } from '../schema.js';

export function getUserByUsername(userName: string) {
    return db.query.usersTable.findFirst({
        where: eq(usersTable.userName, userName)
    });
}
