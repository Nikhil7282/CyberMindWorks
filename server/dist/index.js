import express, { urlencoded } from "express";
import cors from "cors";
import { config } from "dotenv";
import connectToDb from "./utils/dbConfig.js";
import adminRouter from "./routes/adminRoutes.js";
config();
const app = express();
app.use(cors({
    origin: "*",
}));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/admin", adminRouter);
connectToDb()
    .then(() => {
    app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
})
    .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
});
