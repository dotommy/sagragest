import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//Reset AutoIncrement
export async function resetUsersAutoIncrement() {
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'Users'`;
}

//Registra utente
export async function register(username, password) {
    try {

        const finduser = await prisma.users.findUnique({
            where: {
                username: username
            }
        });

        if (finduser === null) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newuser = await prisma.users.create({
                data: {
                    username: username,
                    password: hashedPassword,
                }
            });
            return newuser;
        } else {
            throw new Error('User already exists');
        }
    } catch (error) {
        throw new Error('Registration error' + error);
    }
}

//Login utente
export async function login(username, password) {
    try {
        const findUser = await prisma.users.findUnique({
            where: {
                username: username
            }
        });

        if (!findUser) {
            throw new Error('Authentication failed: user not found');
        }

        const passwordMatch = await bcrypt.compare(password, findUser.password);
        if (passwordMatch) {
            const token = jwt.sign({ userId: findUser.id, username: findUser.username, isAdmin: findUser.isAdmin }, process.env.SECRET_KEY, {
                expiresIn: '1h',
            });

            return { username: findUser.username, isAdmin: findUser.isAdmin, token: token };
        } else {
            throw new Error('Authentication failed: incorrect password');
        }
    } catch (error) {
        throw new Error('Authentication error: ' + error.message);
    }
}

//Cambio Pawword
export async function changePassword(id, oldPassword, newPassword) {
    try {
        
        const user = await prisma.users.findUnique({
            where: {
                id: id
            }
        });

        
        if (!user) {
            throw new Error('User not found');
        }

       
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            throw new Error('Incorrect old password');
        }

        
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        
        const updatedUser = await prisma.users.update({
            where: {
                id: id
            },
            data: {
                password: hashedPassword
            }
        });

        return updatedUser;
    } catch (error) {
        throw new Error('Error updating password: ' + error.message);
    }
}

//Cancella tutti gli Users
export async function deleteAllUsers() {
    try {
        const deletedUsers = await prisma.users.deleteMany();
        resetUsersAutoIncrement()
        return deletedUsers;
    } catch (error) {
        throw new Error('Error deleting users: ' + error.message);
    }
}

export async function getUsers() {
    try {
        const users = await prisma.users.findMany();
        return users;
    } catch (error) {
        throw new Error('Error retrieving users: ' + error.message);
    }
}

//Verifica JWT Token
export async function verifyToken(token) {
    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
        return true;
    } catch (error) {
        return false;
    }
}

//Verifica isAdmin = true
export async function isAdmin(id) {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: id
            }
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user.isAdmin;
    } catch (error) {
        throw new Error('Error checking admin status: ' + error.message);
    }
}

//Crea un user admin da .env file

export async function createDefaultAdminUser() {
    try {
        const existingUsers = await prisma.users.findMany();
        
        if (existingUsers.length === 0) {
            const defaultUsername = process.env.DEFAULT_ADMIN_USERNAME;
            const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD;

            const hashedPassword = await bcrypt.hash(defaultPassword, 10);

            const newUser = await prisma.users.create({
                data: {
                    username: defaultUsername,
                    password: hashedPassword,
                    isAdmin: true,
                },
            });

            console.log(`Creato Admin user: ${defaultUsername} password: ${defaultPassword}`);
        }
    } catch (error) {
        console.error('Errore creazione admin user:', error);
    }
}