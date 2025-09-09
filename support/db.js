import pgPromise from "pg-promise";

const pgp = pgPromise();
const db = pgp('postgresql://dba:dba@paybank-db:5432/UserDB');

export async function obterCodigo2FA() {
    const query = `
        SELECT code FROM public."TwoFactorCode"
        WHERE code IS NOT NULL
        ORDER BY id DESC
        LIMIT 1;
    `

    const result = await db.oneOrNone(query)
        .then(data => {
            return data.code;
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}