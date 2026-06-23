import express from "express";


const app = express();


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/test', (req, res) => {
    res.status(200).json({success: true, message: 'Test rout hitted'})
})

export default app
