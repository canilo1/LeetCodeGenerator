import express from "express";
import cors from "cors";
import backroute from "./backroute.js";

const app = express();

app.use(cors({
    origin: "http://localhost:3001"
}));

app.use((req, res, next) => {
    console.log("Request:", req.method, req.url);
    next();
});

app.use(express.json());

app.use("/backroute", backroute);

app.listen(3000, () => {
    console.log("Backend running on port 3000");
});