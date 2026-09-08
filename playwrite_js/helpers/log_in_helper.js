import path from 'path';
import dotenv from 'dotenv';

// playwrite_js/.env
dotenv.config({ path: path.resolve(import.meta.dirname, '..', '.env') });

import Codec from '../lib/codec.js';

const codec = new Codec(process.env.CREDENTIAL_KEY, path.resolve(import.meta.dirname,'..','encrypted_data/credentials.json'));
const data = await codec.decryptData();

export function user_name() {
    return data.user_name;
};

export function password() {
    return data.password;
};