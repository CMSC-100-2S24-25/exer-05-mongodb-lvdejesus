import express from "express";
import mongoose from "mongoose";
import { router } from "./router.js";

await mongoose.connect("mongodb://127.0.0.1:27017/StudentDatabase", {
  useNewUrlParser: true, useUnifiedTopology: true
}).catch(() => {
  console.error("Connecting to database failed!");
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(3000, () => {
  console.error("Server started!");
})

router(app);
