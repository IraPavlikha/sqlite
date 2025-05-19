import * as SQLite from 'expo-sqlite';

export const openDatabase = async () => {
    return await SQLite.openDatabaseAsync('mydatabase.db');
}

export const createTable = async () => {
    const database = await openDatabase();
    try {
        await database.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL,
                phone TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE
            );
        `);
        console.log('Table created');
    } catch (e) {
        console.error('Error creating table:', e);
    }
}

export const insertUser = async (user) => {
    const database = await openDatabase();
    if (!user.firstName || !user.email) {
        return;
    }
    try {
        const result = await database.runAsync(
            'INSERT INTO users (firstName, lastName, phone, email) VALUES (?, ?, ?, ?)',
            user.firstName, user.lastName, user.phone, user.email
        );
        return result.lastInsertRowId;
    } catch (e) {
        console.error('Error inserting user:', e);
        throw e;
    }
}

export const fetchUsers = async () => {
    const database = await openDatabase();
    try {
        return await database.getAllAsync('SELECT * FROM users');
    } catch (e) {
        console.log('Error fetching users:', e);
        throw e;
    }
}

export const fetchUserById = async (id) => {
    const database = await openDatabase();
    try {
        const result = await database.getFirstAsync('SELECT * FROM users WHERE id = ?', id);
        return result;
    } catch (e) {
        console.error('Error fetching user:', e);
        throw e;
    }
}

export const updateUser = async (id, user) => {
    const database = await openDatabase();
    if (!id || !user.firstName || !user.email) {
        return;
    }
    try {
        await database.runAsync(
            'UPDATE users SET firstName = ?, lastName = ?, phone = ?, email = ? WHERE id = ?',
            user.firstName, user.lastName, user.phone, user.email, id
        );
    } catch (e) {
        console.error('Error updating user: ', e);
        throw e;
    }
}

export const deleteUser = async (id) => {
    const database = await openDatabase();
    try {
        if (!id) {
            throw new Error(`This id not exists: ${id}`);
        }
        await database.runAsync('DELETE FROM users WHERE id = ?', id);
    } catch (e) {
        console.error('Error deleting user: ', e);
        throw e;
    }
}