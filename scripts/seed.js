require('dotenv/config');
const { db } = require('@vercel/postgres');
const {
    users,
    weekly_costs,
} = require('../src/app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "users" table if it doesn't exist
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );`;

        console.log(`Created "users" table`);
        
        // Insert data into the "users" table
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
                    INSERT INTO users (id, name, email, password)
                    VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
                    ON CONFLICT (id) DO NOTHING;
                `;
            }),
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
            users: insertedUsers,
        };
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}
async function seedWeeklyCosts(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "invoices" table if it doesn't exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS weekly_costs (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            groceries INT NOT NULL,
            rent INT NOT NULL,
            gas INT NOT NULL,
            entertainment INT NOT NULL,
            date DATE NOT NULL
        );
        `;

        console.log(`Created "weekly_costs" table`);


        return createTable;
    } catch (error) {
        console.error('Error seeding invoices:', error);
        throw error;
    }
}

async function seedExpenses(client) {
    try {
        // Ensure uuid-ossp extension is available
        await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

        // Create the ENUM type
        const createEnum = `CREATE TYPE public.expense_type AS ENUM ('expense', 'income');`;
        // await client.query(createEnum);

        // Create the "expenses" table if it doesn't exist
        const createTable = await client.query(`
            CREATE TABLE IF NOT EXISTS public.expenses (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                category_id VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                amount FLOAT NOT NULL,
                type public.expense_type NOT NULL,
                date DATE NOT NULL
            );
        `);

        console.log('Created "expenses" table');

        return createTable;
    } catch (error) {
        console.error('Error seeding expenses:', error);
        throw error;
    }
}

async function seedCategories(client) {
    try {
        // Ensure uuid-ossp extension is available
        await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

        // Create the "expenses" table if it doesn't exist
        const createTable = await client.query(`
            CREATE TABLE IF NOT EXISTS public.categories (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );
        `);

        console.log('Created "categories" table');

        return createTable;
    } catch (error) {
        console.error('Error seeding expenses:', error);
        throw error;
    }
}

async function seedUsers(client) {
    try {
        await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

        const createTable = await client.query(`
            CREATE TABLE IF NOT EXISTS public.users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
        `);

        console.log('Created users table');
        return createTable
    } catch (error) {
        console.error('Error creating users table:', error);
        throw error;
    }
}

async function seedSessions(client) {
    try {
        // Create the "expenses" table if it doesn't exist
        const createTable = await client.query(`
            CREATE TABLE IF NOT EXISTS public.sessions (
                id text PRIMARY KEY,
                user_id text,
                created_at date
            );
        `);

        console.log('Created "sessions" table');

        return createTable;
    } catch (error) {
        console.error('Error seeding sessions:', error);
        throw error;
    }
}


async function main() {
    const client = await db.connect();
  
    await seedUsers(client);
    await seedWeeklyCosts(client);
    await seedExpenses(client);
    await seedCategories(client);
    await seedUsers(client);
    await seedSessions(client);
  
    await client.end();
}
  
main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});