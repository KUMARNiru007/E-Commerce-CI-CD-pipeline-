import express from 'express'
import dotenv from 'dotenv'
import db from "./utils/db.connect.js"
import cookieParser from 'cookie-parser'
import userRoutes from './routes/auth.routes.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


app.get('/' , (req,res) => {
    res.send("Hello world")
})

app.use("/api/v1/auth" , userRoutes);

app.listen( port , () => {
    console.log(`Port listening on ${port}`)
})

db()
