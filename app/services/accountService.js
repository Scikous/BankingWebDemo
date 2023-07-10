import { sql } from "../database/database.js";

const getAccounts = async (userID) => {
  return await sql`SELECT * FROM accounts WHERE user_id = ${userID}`;
};

const addAccount = async (accountName, userID) => {
  await sql`INSERT INTO accounts (name, user_id) VALUES (${accountName}, ${userID})`;
};

export { addAccount, getAccounts };
