import React  from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import {Link} from 'react-router-dom';

const res = await axios(
        {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/all',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: null
          });
          
          const usersList = res.data
          let userDataList = [];
            for (let index = 0; index < usersList.length; index++) {
                userDataList.push(usersList[index]);
            }


function View(){

    async function handleDeleteClick(e){
        const userId = e.currentTarget.id;

        console.log(userId);
        //delete request
        const respon = await axios(
            {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `http://localhost:5000/${userId}`,
                headers: { 
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: null
              });

        if(respon.data.responce){
            window.location.reload(false);
        }
        else{
            console.log(respon.data);
        }
    }


    return(
        <div className="tweet-card-grid-container">

             {userDataList.map((user)=>(
            
                <div className="items" key={user.id}>
                    <div className="inner-div" >
                        <h5>{user.name}</h5>
                        <h6>{user.email}</h6>
                        <div className="content">
                            <p>{user.tweet}</p>
                        </div>
                        <p className="time">{user.time_of_modification}</p>
                            <div className="update-delete-button">
                                <Link><MdDelete id={user.id} onClick={handleDeleteClick} /></Link>
                                <Link to={`/${user.id}`}><MdEdit  href="/edit" /></Link>
                            </div>
                    </div>
                </div>
            
        ))}
        </div>
    );
}

export default View;