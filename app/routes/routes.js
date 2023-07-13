import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import * as authenticationController from "./controllers/authenticationController.js";
import * as mainController from "./controllers/mainController.js";
import * as accountsController from "./controllers/accountsController.js";
const router = new Router();

router.get("/", mainController.showMain);

router.get("/auth/register", authenticationController.showRegistrationForm);
router.post("/auth/register", authenticationController.postRegistrationForm);

router.get("/auth/login", authenticationController.showLoginForm);
router.post("/auth/login", authenticationController.postLoginForm);

router.get("/accounts", accountsController.showAccounts);
router.post("/accounts", accountsController.accountCreateForm);

router.get("/accounts/:id", accountsController.showAccount);
export { router };
