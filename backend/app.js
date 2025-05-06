import express from 'express';
import { db } from './db/db.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

db.query('SELECT NOW()')
  .then(() => console.log("✅ Database connection OK"))
  .catch(err => console.error("❌ Database connection failed:", err));

app.get('/data', async (req,res)=>{
    try {
        const data  = await db.query('SELECT * FROM testAdmin');
        return res.status(200).json(data.rows);
    } catch (error) {
        console.log("Error in GET /data: ",error);
        res.status(500).json({error: "Internal Server Error"});
    }
})

app.post('/add', async (req,res)=>{
    const {username,userpassword,email,mobileNo} = req.body;
    try {
        const query = 'INSERT INTO testAdmin (username, userpassword, email, mobileNo) VALUES ($1, $2, $3, $4)';
        const values = [username, userpassword, email, mobileNo];
        const result = await db.query(query, values);
        console.log("Data inserted successfully");
        return res.status(201).json({message: "Data inserted successfully"});

    } catch (error) {
        console.log("Error in POST /add: ",error);
        res.status(500).json({error: "Internal Server Error"});
    }
})

export default app;