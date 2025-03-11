import express from "express";
import { router } from "./router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(3000, () => {
  console.error("Server started!");
})

router(app);
