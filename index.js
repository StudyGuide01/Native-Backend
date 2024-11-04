import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectedDB from './utills/db.js';
const app = express();
const PORT= 5001;

app.use(express.json());
app.use(bodyParser.json());


//cort options
app.use(cors());

//routes
import UserRouter from './routes/user.router.js';

app.get('/',(req,res)=>{
    res.json({status:true});
});

connectedDB();



app.use('/user',UserRouter);
app.listen(PORT,()=>{
    console.log('Server is running on port : 5001');
})