import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});