// Encryption and decryption key. Should be 32 bytes for AES-256.
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!; // Must be 256 bits (32 characters)
const IV = new Uint8Array(16); // For AES, this is always 16 bytes

/**
 * Converts a hex string to an ArrayBuffer.
 * @param {string} hex - The hex string to convert.
 * @returns {ArrayBuffer} The resulting ArrayBuffer.
 */
function hexToArrayBuffer(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes.buffer;
}

/**
 * Converts an ArrayBuffer to a hex string.
 * @param {ArrayBuffer} buffer - The ArrayBuffer to convert.
 * @returns {string} The resulting hex string.
 */
function arrayBufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Encrypts a string using AES-256-CBC with a fixed IV for deterministic output.
 * WARNING: Using a fixed IV reduces the security of the encryption.
 * @param {string} password - The text to be encrypted.
 * @returns {Promise<string>} The encrypted text.
 */
export async function saltAndHashPassword(password: string): Promise<string> {
  const keyBuffer = hexToArrayBuffer(ENCRYPTION_KEY);
  const key = await crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'AES-CBC' },
    false,
    ['encrypt']
  );

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: 'AES-CBC', iv: IV },
    key,
    new TextEncoder().encode(password)
  );

  return arrayBufferToHex(encryptedBuffer);
}