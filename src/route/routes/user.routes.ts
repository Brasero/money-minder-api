import {Router} from "express";
import {connectUser, createUser} from "../../controller/user.controller";

const routes = Router()

routes.post("/signin", createUser);
routes.post("/login", connectUser);

export default routes