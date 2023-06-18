import cors from "cors";
import { Express } from "express";
import userRoutes from "./routes/user.routes";
import defaultRoutes from "./routes/default.routes";
import express from "express";

class ServerExpress {
  app: Express;
  user: string;
  default: string;
  constructor() {
    this.app = express();
    this.user = "/user";
    this.default = "/";
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.static("./public"));
    this.app.use(express.urlencoded({ limit: "50mb", extended: true }));
  }

  routes() {
    this.app.use(this.user, userRoutes);
    this.app.use(this.default, defaultRoutes);
  }

  get listen() {
    return this.app;
  }
}

export default ServerExpress;
