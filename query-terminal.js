// Some constants for clarity
const ESC = `\x1B`;
const DCS = `${ESC}P`;
const ST = `${ESC}\\`;
const ONE = `1`.charCodeAt(0);
const EQUALS = `=`.charCodeAt(0);

/**
 * Returns the DCS query string (XTGETTCAP). Only supports a single query.
 *
 * > Request Termcap/Terminfo String (XTGETTCAP)
 *
 * @param query {string} - The query to make.
 * @returns The encoded DCS query string
 * @see <https://invisible-island.net/xterm/ctlseqs/ctlseqs.html>
 */
function dcsQuery(query) {
	const hex = Buffer.from(query, 'utf8').toString('hex');
	return `${DCS}+q${hex}${ST}`;
}

/**
 * Returns the DCS answer (to the {@link dcsQuery}). (The part after the `=`.)
 *
 * > DCS 1 + r Pt ST for valid requests, adding to Pt an = , and
 * > the value of the corresponding string that xterm would send,
 * > or
 * > DCS 0 + r ST for invalid requests.
 *
 * @param response {Buffer} - The encoded DCS response.
 * @returns The answer for valid requests and `undefined` for invalid requests
 * @see <https://invisible-island.net/xterm/ctlseqs/ctlseqs.html>
 */
function dcsAnswer(response) {
	const success = response[2];
	if (success !== ONE) {
		return undefined; // Invalid request
	}

	const index = response.lastIndexOf(EQUALS);
	if (index < 0) {
		return undefined; // No `=` found, so invalid format
	}

	const answer = response.subarray(index + 1, -1);
	// Answer is an ASCII (UTF-8) string of Hex characters
	return Buffer.from(answer.toString(), 'hex').toString();
}

/**
 * Query the terminal for Termcap/Terminfo capabilities (XTGETTCAP).
 *
 * @param query {string} - The requested capability.
 * @returns The answer for valid requests and `undefined` for invalid requests
 */
export async function queryTerminal(query) {
	return new Promise(function (resolve, reject) {
		try {
			// Configure stdin to watch for the response
			/** @type {import('node:stream').Readable} */
			const stdin = process.stdin;
			stdin.setRawMode(true);
			stdin.resume(); // Listen
			stdin.on('data', (data) => {
				stdin.pause(); // Stop listening
				resolve(dcsAnswer(data));
			});

			// XTGETTCAP means writing the DCS query to the terminal
			process.stdout.write(dcsQuery(query));

		} catch (error) {
			reject(error);
		}
	});
}
