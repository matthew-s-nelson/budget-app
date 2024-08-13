import bcrypt from 'bcrypt';

export async function comparePasswords(inputPassword, storedPassword) {
    const matches = await bcrypt.compare(inputPassword, storedPassword);
    return matches;
}

export async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}