export async function validateUser(payload) {
    const { password } = payload;

    if ('S3nh@.S3cr3t@' === password) {
        return true;
    } else {
        return false;
    }
}