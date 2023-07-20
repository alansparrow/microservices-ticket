import  { scrypt, randomBytes } from 'crypto';

// Take a callback based function and turn it into a promise
import { promisify } from 'util';

const scryptAsync = promisify(scrypt); 
const SECRET = 'hex';

export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString(SECRET);
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;

        return `${buf.toString(SECRET)}.${salt}`;
    }

    static async compare(storedPassword: string, password: string) {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;

        return buf.toString(SECRET) === hashedPassword;
    }
}