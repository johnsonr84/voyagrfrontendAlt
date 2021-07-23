import React, { useState, useEffect } from "react";
import VoyagrSearchPopup from "../VoyagrSearchPopup";
// import "./style.css";
// import { useAuth } from "../../Contexts/AuthContext"
import { API } from "../../utils/API";
// import { Col } from '../Grid';
// import Container from "../Container";
import SearchForm from "../SearchForm";
import "./style.css";

function VoyagrSearchFriend() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [friendSearch, setFriendSearch] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  // const handleOnChange = (evt) => {
  //   setFriendSearch(evt.target.value);
  // };
  // console.log(friendSearch);

  const nameFilterRegExp = new RegExp(nameFilter, "i");

  useEffect(() => {
    API.getUserByName(nameFilter)
      .then(
        (res) => setListOfUsers(res.data)
        // console.log("friendSearch: " + friendSearch)
      )
      .catch(console.log("Did not Get the data"));
  }, []);
  console.log("listOfUsers: " + listOfUsers.userName);

  return (
    <div className="messageSender">
      <div className="form-group">
        <label htmlFor="search" className="searchLabel">
          Search For Friend
        </label>
        <SearchForm setNameFilter={setNameFilter} />
        {/* <input
          type="text"
          className="form-control"
          onChange={handleOnChange}
          name="friendSearch"
          id=""
          aria-describedby="helpId"
          placeholder="Search For Friend Here"
        /> */}
      </div>

      {listOfUsers
        .filter((name) => nameFilterRegExp.test(name.userName))
        .map((friend) => (
          <VoyagrSearchPopup
            uidID={friend.uid}
            userName={friend.userName}
            profileImage={friend.profileImage}
          />
        ))}
    </div>
  );
}

export default VoyagrSearchFriend;
