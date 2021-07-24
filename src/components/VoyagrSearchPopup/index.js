import React from "react";
//import { Image, Popup } from 'semantic-ui-react';
import { Col, Row, Card, Button } from "reactstrap";
import Container from "../Container";

export default function VoyagrSearchPopup({ uidID, userName, profileImage }) {
  return (
    <Container style={{ marginBottom: 15 }}>
      {/* <Card style={{ marginBottom: 10 }}> */}
      <Row>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={profileImage}
            style={{ maxWidth: 50, borderRadius: "50%" }}
          />
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
