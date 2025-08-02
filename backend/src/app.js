import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app = express()

const allowedOrigins = process.env.CORS_ORIGIN.split(",");

app.use(cors({
    // origin:'http://127.0.0.1:3000',
    origin:'https://prbooks.netlify.app/',
    credentials: true
}))
// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     credentials: true
// }))

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())

app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Something went wrong",
    });
});


export default app;
