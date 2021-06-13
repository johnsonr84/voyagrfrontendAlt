import React from "react";
import "./style.css";
import Card from "../FormCard";

import { useAuth, AuthProvider } from "../../Contexts/AuthContext"

const UserInfo = () => {

  const { signup, currentUser } = useAuth()
  // const { uid, displayName } = currentUser;
  // const userID = uid;

  return (
    <div>
      <Card style={{ marginTop: 100 }}>
        <h2>User Information</h2>
        {JSON.stringify(currentUser)}
        {/* {displayName} */}
      </Card>
    </div >
  );
}

export default UserInfo;
