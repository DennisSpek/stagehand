import crypto from 'crypto';

// Encryption and decryption key. Should be 32 bytes for AES-256.
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const IV = Buffer.alloc(16, 0); // For AES, this is always 16

/**
 * Encrypts a string using AES-256-CBC with a fixed IV for deterministic output.
 * WARNING: Using a fixed IV reduces the security of the encryption.
 * @param {string} text - The text to be encrypted.
 * @returns {string} The encrypted text.
 */
export async function saltAndHashPassword(password: string): Promise<string> {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), IV);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}