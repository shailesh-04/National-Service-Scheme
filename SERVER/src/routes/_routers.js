import { Router } from "express";
import {catchErr} from "#color";

import user from  "./users.route.js";
import event from "./events.route.js";
import emages from "./emages.route.js";
import storage from "./storage.route.js";
import registratios from "./registration.route.js";
import nss_store from "./nss_store.route.js";
const router = Router();
try {
    router.use("/user",user);
    router.use("/event",event);
    router.use("/images",emages);
    router.use("/storage",storage);
    router.use("/event-registration",registratios);
    router.use("/nss_store",nss_store);

} catch (error) {
    catchErr(error,"_routes");
}
export default router;