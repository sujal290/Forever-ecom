import express from 'express'
import cors from 'cors'
// import 'dotenv/config' 
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import dotenv from 'dotenv';
import orderRouter from './routes/orderRoute.js'
import cartRouter from './routes/cartRoute.js'
dotenv.config();



//App config
const app = express()
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();

// middlewares 
app.use(express.json())
app.use(cors())


// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/', (req, res) => {
    res.send("API working")
})
app.listen(port, ()=> console.log('Server started on port: ' + port));

// export default app;



// // 👇 Export as Vercel-compatible handler
// import { createServer } from 'http';
// import { parse } from 'url';

// const server = createServer((req, res) => {
//     const parsedUrl = parse(req.url, true);
//     app(req, res, parsedUrl);  // let Express handle the request
// });

// export default server;