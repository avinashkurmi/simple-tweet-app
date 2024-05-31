import express from 'express';
import bodyParser from 'body-parser';
// import pg from "pg";
import {db, connectDatabase, deleteUser, updateUser, getUser, disconnectdatabase, insert, getAllUser} from "./database.js";
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// connect Database
const isDataBaseConnected = await connectDatabase(db);
if(isDataBaseConnected){
    app.listen(port, () => {
        console.log(`API is running at http://localhost:${port}`);
    });
}


app.get("/", async (req,res)=>{
    res.send("Avinash");
});


// create new user
app.post("/",async (req,res)=>{

    function validateEmail(email) {
        var re =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    

    const d = new Date();
    const date = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`;


    const {name,email,age,tweet} = req.body;

    const userData = [name,email,age,date,tweet];


    // checking the eamil
   if(!validateEmail(email)){
    res.json({responce : false, comment: "invalid email id"});
   }
   //checking the age
   else if(age<18){
    res.json({responce : false, comment: "age should be 18+"});
   }
   else{

    const responceFromInsertion = await insert(db,userData);

    if(responceFromInsertion.responce){
        console.log(responceFromInsertion.com);
        // res.sendStatus(200);
        res.json({responce : true, comment: responceFromInsertion.com });

    }else if(!responceFromInsertion.responce){

        if(responceFromInsertion.com==='duplicate key value violates unique constraint "users_email_key"'){
            res.json({responce : false, comment: `user have tweeted with this email id! you another one`});
        }
        console.log(responceFromInsertion.com);
        // res.sendStatus(406);
        res.json({responce : false, comment: `Database error: ${responceFromInsertion.com}`});
    }
    }
    
});

// get all the user data
app.get("/all",async (req,res)=>{
    const users = await getAllUser(db);
    if(users.responce){
        res.send(users.com);
    }
    else{
        res.send(users.com);
    }
});


app.get("/:id",async (req,res)=>{
    console.log(req.params);
    const user = await getUser(db,req.params.id);
    if(user.responce){
        res.send(user);
    }
    else{
        res.send(user);
    }
});


// delete a particular user
app.delete("/:id", async(req,res)=>{

    const user = await deleteUser(db,req.params.id);
    if(user.responce){
        res.send(user);

    }
    else{
        res.send(user);
    }
});


// update a user
app.patch("/:id", async(req,res)=>{

    const userData = req.body;
    const userId = req.params.id;


    
    const updateResult = await updateUser(db,userData,userId);

  
    if(updateResult.responce){

        res.send(updateResult);
    }
    else{
        res.send(updateResult);
    }
});