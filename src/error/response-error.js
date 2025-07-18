/**
 * Membuat kelas ResponseError yang di extends berdasarkan fungsi bawaan dari Error javascript
 * Response error memiliki dua callback yaiut, status dan message.
 */
class ResponseError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

export { ResponseError };
