import React, { useEffect} from "react";
import WarningBar from "./WarningBar";
import axios from "axios";
import { useParams } from "react-router-dom";
import qs from 'qs';


function Edit(){
    const [name_,setName] = React.useState("");
    const [email_,setEmail] = React.useState("");
    const [age_,setAge] = React.useState("");
    const [tweet_,setTweet] = React.useState("");


    const [warningConst, setWarningConst] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [warningTypeClass, setWarningTypeClass] = React.useState("");

    async function getData(userId){
        const respon = await axios(
            {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:5000/${userId}`,
                headers: { 
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: null
              });

            if(respon.data.responce){

                const name = respon.data.com.name;
                const age = respon.data.com.age;
                const email = respon.data.com.email;
                const tweet = respon.data.com.tweet;
    
                setName(name);
                setAge(age);
                setEmail(email);
                setTweet(tweet);
            }
            else{
                console.log(respon.data);
            }
    }


    const {id} = useParams();
    
    
    useEffect(()=>{
        getData(id);
        
        // GetUserData();
        // console.log(name_);
    },[]);
   
    
   
    async function handleSubmit(e){
        e.preventDefault();
        const userData = qs.stringify({
            name: name_,
            email : email_,
            age: age_,
            tweet: tweet_
        });

        const respon = await axios(
            {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `http://localhost:5000/${id}`,
                headers: { 
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: userData
              });
    
            if(respon.data.responce){
                setWarningConst(true);
                setWarningTypeClass("success");
                setErrorMessage("tweet updated");
                setTimeout(function() {
                    setWarningConst(false);
                }, 2000);
                
            }
            else{
                console.log(respon.data);
            }
            
    }

    

    return(
        <>
        <WarningBar return={warningConst} content={errorMessage} warningType={warningTypeClass}/>
            <div className="from">
            <form>
                <div className="form-group">
                    <h6>Name</h6>
                    <input className="form-control" placeholder="Enter yor name"
                        value={name_}
                        onChange={(e) => {
                            setName(e.target.value);
                        } } />
                </div>
                <div className="form-group">
                    <h6>Email</h6>
                    <input type="email" className="form-control" placeholder="enteryouremail@email.com"
                        value={email_}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        } } />
                </div>
                <div className="form-group">
                    <h6>Age</h6>
                    <input type="int" className="form-control" placeholder="Enter your age"
                        value={age_}
                        onChange={(e) => {
                            setAge(e.target.value);
                        } } />
                </div>
                <div className="form-group">
                    <h6>Tweet</h6>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="4"
                        value={tweet_}
                        onChange={(e) => {
                            setTweet(e.target.value);
                        } }
                    ></textarea>
                </div>
                <div className="submit-button">
                    <button type="submit" onClick={handleSubmit} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div></>
    );
}

export default Edit;