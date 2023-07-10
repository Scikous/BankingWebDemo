import * as accountService from "../../services/accountService.js";

const showAccounts = async ({ render, params, response, state }) => {
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

export { accountCreateForm, showAccounts };
