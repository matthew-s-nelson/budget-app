import bcrypt from 'bcrypt';

export async function comparePasswords(inputPassword, storedPassword) {
    const matches = await bcrypt.compare(inputPassword, storedPassword);
    return matches;
}