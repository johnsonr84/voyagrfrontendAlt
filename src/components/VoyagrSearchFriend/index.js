import React, { useState, useEffect } from "react";
import VoyagrSearchPopup from "../VoyagrSearchPopup";
// import "./style.css";
// import { useAuth } from "../../Contexts/AuthContext"
import { API } from "../../utils/API";
// import { Col } from '../Grid';
// import Container from "../Container";
import SearchForm from "../SearchForm";
import { useAuth } from "../../Contexts/AuthContext";

import "./style.css";

function VoyagrSearchFriend() {
  const { updatePhotoURL, currentUser } = useAuth();
  const { uid, displayName, photoURL } = currentUser;

  const [listOfUsers, setListOfUsers] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [currentUserFriends, setCurrentUserFriends] = useState([]);
  const [listOfFriends, setListOfFriends] = useState([]);
  const [UserFriends, setUserFriends] = useState([]);


  const defaultUserImage = "https://i.imgur.com/ScCwMk8.png";

  const nameFilterRegExp = new RegExp(nameFilter, "i");

  useEffect(() => {
    API.getUserByName(nameFilter)
      .then((res) => setListOfUsers(res.data))
      .catch(console.log("Did not Get the data"));
  }, []);

//   useEffect(() => {
//     API.getUserByParam(currentUser.uid)
//       .then((res) => setCurrentUserFriends(res.data))
//       .catch(console.log("Did not Get the data"));
//   }, []);

//   useEffect(() => {
//     API.getUserByParam(currentUser.uid)
//       .then((res) => setListOfFriends(res.data))
//       .catch(console.log("Did not Get the data"));
//   }, []);

//   useEffect(() => {
//     API.getUserByParam(currentUserFriends.friendUid)
//       .then((res) => setUserFriends(res.data))
//       .catch(console.log("Did not Get the data"));
//   }, []);

//   console.log(currentUserFriends[0])
// console.log(UserFriends)

  return (
    <div className="friendSearch">
      <div className="form-group">
        <label htmlFor="search" className="searchLabel">
          Search Friends
        </label>
        <SearchForm setNameFilter={setNameFilter} />
      </div>
      <div style={{ display: nameFilter ? "block" : "none" }}>
        {listOfUsers
          .filter((name) => nameFilterRegExp.test(name.userName))
          .map((friend) => (
            <VoyagrSearchPopup
              uidID={friend.uid}
              userName={friend.uid == currentUser.uid ? "You" : friend.userName}
              profileImage={
                friend.uid == currentUser.uid
                  ? photoURL
                  : friend.profileImage.length > 0
                  ? friend.profileImage
                  : defaultUserImage
              }
              showHide={friend.uid == currentUser.uid ? "hidden" : "show"}
            />
          ))}
      </div>
      
      {/* <div >
        {listOfFriends
          .filter((name) => nameFilterRegExp.test(name.friendUid))
          .map((friend) => (
            <VoyagrSearchPopup
              uidID={friend.friendUid}
              userName={friend.friendUid == currentUser.uid ? "You" : friend.userName}
              profileImage={
                friend.friendUid == currentUser.friendUid
                  ? photoURL
                  : friend.profileImage.length > 0
                  ? friend.profileImage
                  : defaultUserImage
              }
              showHide={friend.uid == currentUser.uid ? "hidden" : "show"}
            />
          ))}
      </div> */}

    </div>
  );
}

export default VoyagrSearchFriend;
