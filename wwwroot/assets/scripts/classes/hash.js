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
 * @returns a promise with a hashed password or an errormessage
 * @author Julian
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest information about the digest function
 * @see https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/ information about a salt
 */
export async function passwordHash(password, salt) {
	if (password == null || salt == null) {
		return;
	}
	const encoded = encodePassword(`${salt}${password}`);
	try {
		let hashBuffer = await subtleCrypto.digest("SHA-512", encoded);
		return passwordDigestToHex(hashBuffer);
	} catch (err) {
		throw err;
	}
}
/**
 * This function takes data in a ArrayBuffer and formats it to a string which can be stored in a database
 *
 * @param {ArrayBuffer} digestBuffer
 * @returns A string containing hexadecimal numbers
 * @author Julian
 */
function passwordDigestToHex(digestBuffer) {
	// get hash values in an array
	const hashArray = Array.from(new Uint8Array(digestBuffer));
	return hashArray.map((hash) => hash.toString(16).padStart(2, "0")).join("");
}
