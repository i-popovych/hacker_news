import express from 'express';
import mongoose from "mongoose";
import allowCrossDomain from "./settings/allowCrossDomain.js";
import profileRouter from "./Profile/ProfileRouter.js"
import authRouter from "./Auth/AuthRouter.js";
import config from "config";


const PORT = config.get('PORT');
const DB_URL = 'mongodb+srv://ipopovych:33o7fB6ctlGEJ6Yw@hacker-news.tv7vkty.mongodb.net/?retryWrites=true&w=majority'
const app = express();

app.use(allowCrossDomain);
app.use(express.json());
app.use('/api', authRouter);
app.use('/api', profileRouter);

async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => console.log('server is working on port: ' + PORT));
    } catch (e) {
        console.log("server isn't working");
        console.log(e);
    }
}

startApp();


