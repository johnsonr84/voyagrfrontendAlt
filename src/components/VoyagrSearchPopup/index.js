import React from 'react'
//import { Image, Popup } from 'semantic-ui-react';
import { Col, Row, Card, Button } from 'reactstrap'
export default function VoyagrSearchPopup({uidID, userName, profileImage }) {
    return (
        <Card>
            <Row>
                <Col>
                <img src={profileImage}  style={{maxWidth:50}}/>
                </Col>
                <Col>
                <div style={{fontSize:7, fontStyle:"italic", fontWeight:"bold"}} >{userName}</div> 
                <div style={{fontSize:7}} >{uidID}</div>
                <Button style={{fontSize:7}}>Add Friend</Button>
                </Col>
               
               
            </Row>
            {/* <a href="#" data-toggle="popover" title={userName} data-content={uidID}>{uidID}{<img src={profileImage}  style={{maxWidth:80}} />}</a> */}
           
             
                {/* <Popup 
                    content={uidID}
                    key={userName}
                    header={userName}
                    trigger={<Image src={profileImage}  />}
                /> */}
            
        </Card>
    )
}
