//get subtleCrypto object
const subtleCrypto = window.crypto.subtle;
/**
 * this function encodes a string into an utf-8 encoded Uint8Array
 * @param {string} password a password given by the user
 * @returns utf-8 encoded Uint8Array
 * @author Julian
 */
function encodePassword(password) {
	const encoder = new TextEncoder();
	return encoder.encode(password);
}
/**
 *This function creates a hash for password in combination with a salt
 *
 * @param {string} password a password given by the user
 * @param {string} salt a randomly generated string to make every hash function unique to prevent rainbow tables and make it harder for hackers to crack multiple passwords at once
 * @returns A promise with arrayBuffer type, in this arrayBuffer the binary data of the hash is stored
 * @author Julian
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest information about the digest function
 * @see https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/ information about a salt
 */
export function passwordDigest(password, salt) {
	const encoded = encodePassword(`${salt}${password}`);
	return subtleCrypto.digest("SHA-512", encoded);
}
/**
 * This function takes data in a ArrayBuffer and formats it to a string which can be stored in a database
 *
 * @param {ArrayBuffer} digestBuffer
 * @returns A string containing hexadecimal numbers
 * @author Julian
 */
export function passwordDigestToHex(digestBuffer) {
	// get hash values in an array
	const hashArray = Array.from(new Uint8Array(digestBuffer));
	return hashArray.map((hash) => hash.toString(16).padStart(2, "0")).join("");
}
