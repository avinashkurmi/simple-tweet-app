import React from "react";
import axios from 'axios';
import qs from 'qs';
import WarningBar from "./WarningBar";



const Create = ()=>{

    const [name_,setName] = React.useState("");
    const [email_,setEmail] = React.useState("");
    const [age_,setAge] = React.useState("");
    const [tweet_,setTweet] = React.useState("");

    const [warningConst, setWarningConst] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [warningTypeClass, setWarningTypeClass] = React.useState("danger");



const handleSubmit = async (e)=>{
    e.preventDefault();

    setWarningConst(false);
    setErrorMessage("");
    setWarningTypeClass("danger");
    const userData = qs.stringify({
        name: name_,
        email : email_,
        age: age_,
        tweet: tweet_
    });

    console.log("from handle");
    try{
        const res = await axios(
            {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:5000/',
                headers: { 
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                data : userData
              });


        if(res.data.responce){
            setWarningConst(true);
            setErrorMessage("tweet send!");
            setWarningTypeClass("success");
            setName("");
            setAge("");
            setEmail("");
            setTweet("");
        }
        else if(!res.data.responce){

            setWarningConst(true);
            setErrorMessage(res.data.comment);
            
        }
    }
    catch(er){
        console.log(er.message);
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

export default Create;