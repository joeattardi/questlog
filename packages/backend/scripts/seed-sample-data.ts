import { db } from '../src/db/index.js';
import { usersTable } from '../src/db/schema.js';
import * as argon2 from 'argon2';

const user = {
    userName: 'jattardi',
    firstName: 'Joe',
    lastName: 'Attardi',
    email: 'jattardi@gmail.com',
    passwordHash: await argon2.hash('password')
};

await db.insert(usersTable).values(user);
