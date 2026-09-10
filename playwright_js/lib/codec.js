import crypto from 'crypto';
import fs from 'fs';
import pipeline from 'node:stream/promises';

// Usage Exameple:
// const codec = new Codec('your_secure_32_byte_key_in_hex', 'encrypted_data/credentials.json');
// await codec.encryptFile();
// const data = await codec.decryptData();
// console.log(data.user_name);
// await codec.decryptToFile();
export class Codec {
    static IV_LENGTH = 12;
    static AUTH_TAG_LENGTH = 16;
    static ALGORITHM = 'aes-256-gcm';

    #key;

    constructor(key, filePath) {
        if (key) {
            // Ensure the key is a 32-byte (64 character hex string) Buffer
            this.#key = Buffer.from(key, 'hex');
            if (this.#key.length !== 32) {
                throw new Error("Invalid key length. Must be a 32-byte hex string.");
            }
        } else {
            // Generate a random 32-byte AES-256 key
            const generatedKey = crypto.randomBytes(32).toString('hex');
            this.#key = Buffer.from(generatedKey, 'hex');
            console.log(`Generated Key: ${generatedKey}`);
        }
        // expect file path without .enc
        this.filePath = filePath;
    }

    async encryptFile() {
        const iv = crypto.randomBytes(Codec.IV_LENGTH);
        const cipher = crypto.createCipheriv(Codec.ALGORITHM, this.#key, iv);

        const readStream = fs.createReadStream(this.filePath);
        const writeStream = fs.createWriteStream(this.filePath + '.enc'); // writing to a safe .enc file
        
        // Write the IV at the very beginning of the stream
        writeStream.write(iv);

        try {
             // pipeline automatically handles stream cleanup and awaits completion
            await pipeline(readStream, cipher, writeStream);
        
            // Get the auth tag AFTER the pipeline finishes
            const authTag = cipher.getAuthTag();
        
            // Append the 16-byte authTag right after the 12-byte IV 
            // by writing to the exact end of the file in the safe .enc file
            await fs.promises.appendFile(this.filePath + '.enc', authTag);
        
            // Clean up the original unencrypted file
            await fs.promises.unlink(this.filePath);
            
        } catch (err) {
            console.error('Encryption failed:', err);
        }
    }


    async decryptData() {
        const encryptedPath = this.filePath + '.enc';
        const fileBuffer = await fs.promises.readFile(encryptedPath);

        const ivLength = Codec.IV_LENGTH;
        const tagLength = Codec.AUTH_TAG_LENGTH;    
        // Slice based on the actual file layout: [ IV ] [ Encrypted Data ] [ Auth Tag ]
        const iv = fileBuffer.subarray(0, ivLength);
        const authTag = fileBuffer.subarray(fileBuffer.length - tagLength);
        const encryptedData = fileBuffer.subarray(ivLength, fileBuffer.length - tagLength); 
        // Decrypt
        const decipher = crypto.createDecipheriv(Codec.ALGORITHM, this.#key, iv);
        decipher.setAuthTag(authTag);

        // Use null/undefined for input encoding when passing a raw Buffer slice
        let decrypted = decipher.update(encryptedData, null, 'utf8');
        decrypted += decipher.final('utf8');    
        // Return as JSON
        try {
            return JSON.parse(decrypted);
        } catch { 
            throw new Error("Decryption failed or data is corrupted");}
    }

    async decryptToFile() {
        const encryptedPath = this.filePath + '.enc';
        const ivLength = Codec.IV_LENGTH;
        const tagLength = Codec.AUTH_TAG_LENGTH;

        // Get total file size to locate the trailing auth tag
        const stats = await fs.promises.stat(encryptedPath);
        const fileSize = stats.size;
        
        if (fileSize < ivLength + tagLength) {
            throw new Error("Encrypted file is truncated or corrupted");
        }

        // Read the IV from the very beginning (first 12 bytes)
        const ivBuffer = Buffer.alloc(ivLength);
        const fdIv = await fs.promises.open(encryptedPath, 'r');
        await fdIv.read(ivBuffer, 0, ivLength, 0);
        await fdIv.close();

        // Read the Auth Tag from the very end (last 16 bytes)
        const tagBuffer = Buffer.alloc(tagLength);
        const fdTag = await fs.promises.open(encryptedPath, 'r');
        await fdTag.read(tagBuffer, 0, tagLength, fileSize - tagLength);
        await fdTag.close();

        // Set up streams for the encrypted payload in the middle
        // Start after IV, stop right before Auth Tag
        const readStream = fs.createReadStream(encryptedPath, {
            start: ivLength,
            end: fileSize - tagLength - 1 
        });
        const writeStream = fs.createWriteStream(this.filePath);

        // Initialize decipher
        const decipher = crypto.createDecipheriv(Codec.ALGORITHM, this.#key, ivBuffer);
        decipher.setAuthTag(tagBuffer);

        try {
        // Stream the decryption payload to the target file
        await pipeline(readStream, decipher, writeStream);

        // Clean up the encrypted file only after a successful execution
         await fs.promises.unlink(encryptedPath);

        } catch (err) {
            // force: true ignores the error if the file doesn't exist or can't be deleted
            await fs.promises.rm(this.filePath, { force: true });
    
            throw new Error(`Decryption failed: ${err.message}`, { cause: err });
        }
    }
}