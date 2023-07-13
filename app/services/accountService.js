import { sql } from "../database/database.js";

const getAccounts = async (userID) => {
  return await sql`SELECT * FROM accounts WHERE user_id = ${userID}`;
};

const getAccount = async (userID, accountID) => {
  return await sql`SELECT * FROM accounts WHERE user_id = ${userID} AND id = ${accountID}`;
};

const addAccount = async (accountName, userID) => {
  await sql`INSERT INTO accounts (name, user_id) VALUES (${accountName}, ${userID})`;
};

const deposit = async (userID, accountID, amount) =>{
  await sql`UPDATE accounts SET balance = balance + ${amount} WHERE user_id = ${userID} AND id = ${accountID}`;

};

const withdrawal = async (userID, accountID, amount) =>{
  await sql`UPDATE accounts SET balance = balance - ${amount} WHERE user_id = ${userID} AND id = ${accountID}`;
};

export { addAccount, getAccounts, getAccount, deposit, withdrawal};
