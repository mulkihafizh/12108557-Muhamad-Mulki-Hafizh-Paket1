import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./model/index.js";
import "dotenv/config";
import router from "./route/index.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// db.sequelize.sync();

app.use("/api", router);

app.listen(5000, () => {
  console.log("running");
});
