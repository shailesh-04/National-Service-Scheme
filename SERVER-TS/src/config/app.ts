import express from "express";
import { config } from "dotenv";
import db from "./db";
import { colorError } from "@color";

class App {
    public app: express.Application;
    constructor() {
        this.app = express();
        config();
        this.initializeDatabase();
    }
    private async initializeDatabase() {
        await db.init();
    }
}
export default new App().app; 