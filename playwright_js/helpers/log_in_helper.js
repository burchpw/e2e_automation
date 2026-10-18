import path from 'path';
import dotenv from 'dotenv';
import Codec from '../lib/codec.js';

export class LogInHelper {
    constructor() {
        // env file located at playwrite_js/.env
        dotenv.config({ path: path.resolve(import.meta.dirname, '..', '.env') });
        const encryptedFilePath = path.resolve(import.meta.dirname, '..', 'encrypted_data', 'credentials.json');
        this.codec = new Codec(process.env.CREDENTIAL_KEY, encryptedFilePath);
        this.data = null; 
    }

    async init() {

    if (!process.env.CREDENTIAL_KEY) {
        throw new Error("CRITICAL: CREDENTIAL_KEY environment variable is not defined!");
    }

    if (!this.data) {
      this.data = await this.codec.decryptData();
    }
    return this;
    }

    userName() {
        return this.data.user_name;
    }

    password() {
         return this.data.password;
    }
} 