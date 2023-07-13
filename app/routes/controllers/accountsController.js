import * as accountService from "../../services/accountService.js";

const showAccounts = async ({ render, response, state }) => {
  if (!await state.session.get("authenticated")) {
    response.status = 401;
    response.body = "Unauthorized";
    return;
  }
  const userID = (await state.session.get("user")).id;

  let accounts = await accountService.getAccounts(userID);

  if (accounts.length === 0) {
    accounts = [];
  }
  render("accounts.eta", { accounts: accounts });
};

const showAccount = async ({ render, params, response, state }) => {
  const userID = (await state.session.get("user")).id;
  const accountID = params.id;

  const account = await accountService.getAccount(userID, accountID);

  if (account.length === 0) {
    response.status = 401;
    return;
  }

  const accountDetails = account[0];

  render("account.eta", { name: accountDetails.name, id: accountDetails.id, balance: accountDetails.balance });
};

const accountCreateForm = async ({ response, request, state }) => {
  if (!await state.session.get("authenticated")) {
    response.status = 401;
    response.body = "Unauthorized";
    return;
  }
  const userID = (await state.session.get("user")).id;
  const body = request.body();
  const params = await body.value;

  const accountName = params.get("name");

  accountService.addAccount(accountName, userID);

  response.redirect("/accounts");
};

const accountDeposit = async ({state, request, response, params}) =>{
  const userID = (await state.session.get("user")).id;
  const accountID = params.id;
  const account = await accountService.getAccount(userID, accountID);

  if (account.length === 0) {
    response.status = 401;
    return;
  }
  else{
    const body = request.body();
    const formParams = await body.value;
    const amount = Number(formParams.get("amount"));
    accountService.deposit(userID, accountID, amount);
    response.redirect("/accounts");
  }
};

const accountWithdrawal = async ({state, request, response, params}) =>{
  const userID = (await state.session.get("user")).id;
  const accountID = params.id;
  const account = await accountService.getAccount(userID, accountID);

  if (account.length === 0) {
    response.status = 401;
    return;
  }
  else{
    const body = request.body();
    const formParams = await body.value;
    const amount = Number(formParams.get("amount"));
    accountService.withdrawal(userID, accountID, amount);
    response.redirect("/accounts");
  }
};



export { accountCreateForm, accountDeposit, accountWithdrawal, showAccounts, showAccount };
