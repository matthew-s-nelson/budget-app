require('dotenv/config');
const { db } = require('@vercel/postgres');
const {
    weekly_costs,
    users,
} = require('../src/app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "users" table if it doesn't exist
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4*() PRIMARY KEY,
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
                    INSERT INTO user (id, name, email, password)
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

        // Insert data into the "weekly_costs" table
        const insertedWeeklyCosts = await Promise.all(
            weekly_costs.map(
                (invoice) => client.sql`
                INSERT INTO invoices (groceries, rent, gas, entertainment, date)
                VALUES (${weekly_costs.groceries}, ${weekly_costs.rent}, ${weekly_costs.gas}, ${weekly_costs.entertainment}, ${weekly_costs.date})
                ON CONFLICT (id) DO NOTHING;
            `,
            ),
        );

        console.log(`Seeded ${insertedWeeklyCosts.length} weekly_costs`);

        return {
            createTable,
            weekly_costs: insertedWeeklyCosts,
        }
    } catch (error) {
        console.error('Error seeding invoices:', error);
        throw error;
    }
}