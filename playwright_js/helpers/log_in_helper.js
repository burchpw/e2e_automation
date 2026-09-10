import path from 'path';
import dotenv from 'dotenv';
import Codec from '../lib/codec.js';

export class LogInHelper {
    constructor() {
        // env file located at playwrite_js/.env
        dotenv.config({ path: path.resolve(import.meta.dirname, '..', '.env') });
        this.codec = new Codec(process.env.CREDENTIAL_KEY, path.resolve(import.meta.dirname,'..','encrypted_data/credentials.json'));
        this.data = null; 
    }

    async init() {
    if (!this.data) {
      this.data = await this.codec.decryptData();
    }
    return this;
    }

    user_name() {
        return this.data.user_name;
    }

    password() {
         return this.data.password;
    }
} 