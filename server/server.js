import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';


const app = express()

await connectCloudinary()

const allowedOrigins = [
  'https://quick-ai-ashy-alpha.vercel.app', // your frontend
  'http://localhost:5173' // local dev
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests like Postman
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // needed if you use cookies/auth
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use(clerkMiddleware())

app.get('/', (req, res)=> res.send('Server is live!'))

app.use(requireAuth())

app.use('/api/ai', aiRouter)
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log('Server is running on PORT', PORT);
    
})