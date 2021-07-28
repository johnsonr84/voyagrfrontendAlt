import React, { useState, useEffect } from "react";
//import { Image, Popup } from 'semantic-ui-react';
import { Col, Row, Button } from "reactstrap";
import Container from "../Container";
import { Link } from "react-router-dom";

export default function VoyagrSearchPopup({
  uidID,
  userName,
  profileImage,
  showHide,
}) {
  // const { currentUser } = useAuth();
  // const [nameFilter, setNameFilter] = useState("");

  // const updateFriendRequestToPending = async () => {
  //     const friendUid =
  //     console.log("profilePhoto: " + profileImage);

  //     await API.updateFriendRequestToPending({ uid: uid,  pendingFriendUid: friendUid });
  //   };

  return (
    <Container style={{ marginBottom: 15 }}>
      {/* <Card style={{ marginBottom: 10 }}> */}
      <Row className={showHide}>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Link to={{ pathname: "/" + uidID }}>
            <img
              src={profileImage}
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
          </Link>
          <div
            style={{
              marginTop: 5,
              fontSize: 10,
              fontStyle: "italic",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {userName}
          </div>
        </Col>
        <Col style={{ display: "flex", alignItems: "center", paddingLeft: 0 }}>
          {/* <div style={{ fontSize: 7 }}>{uidID}</div> */}
          <Button style={{ fontSize: 7 }}>Add Friend</Button>
        </Col>
      </Row>
      {/* <a href="#" data-toggle="popover" title={userName} data-content={uidID}>{uidID}{<img src={profileImage}  style={{maxWidth:80}} />}</a> */}
      {/* <Popup 
                    content={uidID}
                    key={userName}
                    header={userName}
                    trigger={<Image src={profileImage}  />}
                /> */}
      {/* </Card> */}
    </Container>
  );
}
