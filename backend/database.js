import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

export const db = new pg.Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_hOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
  });

export async function connectDatabase(db){
    try{
            await db.connect();
            console.log("Database connected");
            return true;
        }
       catch(err){
            console.log("Database did not connected! server stoped");
            return false;
       }
     }   
     

export function disconnectdatabase(db){
    db.end((error) => {
        if (error) {
          console.error('Error closing MySQL connection:', error);
          return;
        }
        console.log('MySQL connection closed.');
      });
}

export async function insert(db,listData){
    try{
        await db.query(`INSERT INTO ${process.env.DATABASE_TABLE_NAME} (name, email, age, time_of_modification, tweet) VALUES ($1, $2, $3, $4, $5)`,listData);
        return {com :"data inserted",responce :true};
    }
    catch(err){
        return {com :err.message,responce :false}
    }
    }
 

export async function getAllUser(db){
    try{
        const users = await db.query(`SELECT * from ${process.env.DATABASE_TABLE_NAME}`);
        let usersData = [];
        users.rows.forEach(row => {
            usersData.push(row);
        });
        console.log(typeof(usersData));
        return {com :usersData,responce :true};
    }
    catch(err){
        return {com :err.message,responce :false}
    }
}


export async function getUser(db,userId){
    try{
        const user = await db.query(`select * from ${process.env.DATABASE_TABLE_NAME} where id = ${userId}`);
        return { com: user.rows[0] , responce: true };
    }
    catch(err){
        return {com :err.message,responce :false};
    }
}


export async function deleteUser(db,userId){
    try{
        const user = await db.query(`DELETE FROM ${process.env.DATABASE_TABLE_NAME} where id = ${userId}`);
        console.log(user);
        return {com: "data deleted" , responce: true };
    }
    catch(err){
        return {com :err.message,responce :false};
    }
}

export async function updateUser(db,userData,userId){
    try{
        // console.log(u);
        let userPreviuousData;
        try{
        userPreviuousData = await db.query(`select * from ${process.env.DATABASE_TABLE_NAME} where id = ${userId}`);
        }
        catch(err){
            console.log(err.message);
        }

        
        const userExactPreviuousData = userPreviuousData.rows[0] //getting the user data at index 0
        // console.log(userExactPreviuousData? true: false);
        if(userExactPreviuousData){

            let nameByUser;
            let ageByUser;
            let emailByUser;
            let tweetByUser;

            // storing all the user data from the url if not available using the prevoius data and inserting it into the same
            userData.name? nameByUser=userData.name :nameByUser=userExactPreviuousData.name;
            userData.age? ageByUser=userData.age :ageByUser=userExactPreviuousData.age;
            userData.email? emailByUser=userData.email :emailByUser=userExactPreviuousData.email;
            userData.tweet? tweetByUser=userData.tweet :tweetByUser=userExactPreviuousData.tweet;

            // getting current date
            const d = new Date();
            const date = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`;

            //update the user data

            const user = await db.query(`UPDATE ${process.env.DATABASE_TABLE_NAME}
                    SET name = '${nameByUser}', 
                    age = ${ageByUser},
                    email = '${emailByUser}',
                    time_of_modification = '${date}', 
                    tweet = '${tweetByUser}'
                    WHERE id = ${userId}`);

                return {com: `user ${user.command}` , responce: true };
        }
        else{
            return {com :"user not found in databese",responce :false};
        }
    }
    catch(err){
        return {com :err.message,responce :false};
    }
}

