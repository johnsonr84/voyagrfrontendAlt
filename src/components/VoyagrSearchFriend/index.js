import React, {useState, useEffect} from 'react'
import VoyagrSearchPopup from '../VoyagrSearchPopup';
// import "./style.css";
// import { useAuth } from "../../Contexts/AuthContext"
import { API } from "../../utils/API"
// import { Col } from '../Grid';
// import Container from "../Container";






function VoyagrSearchFriend() {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [friendSearch,  setFriendSearch] = useState("");
    

    const handleOnChange = (evt) => {
        setFriendSearch(evt.target.value)
  
    }
    console.log(friendSearch)
    useEffect(() => {
        API.getUserByName(friendSearch)
        .then((res) => setListOfUsers(res.data),
        console.log(friendSearch)
        )
        .catch(console.log("Did not Get the data") )
        
        
       }, [friendSearch])
    console.log(listOfUsers)
    
      
    return (
      <div className="messageSender">
        <div className="form-group">
          <label htmlFor="search">Search For Friend</label>
          <input type="text"
            className="form-control" onChange={handleOnChange} name="friendSearch" id="" aria-describedby="helpId" placeholder="Search For Friend Here"/>
          
        </div>
        
        {
           listOfUsers
         .map(friend => 
            <VoyagrSearchPopup uidID={friend.uid}
            userName={friend.userName}
            profileImage={friend.profileImage}
            />)  
        }
        
        
        
        </div>
    );
  }
  
  export default VoyagrSearchFriend;