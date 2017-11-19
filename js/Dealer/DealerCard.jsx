import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

const DealerCard = (props) => (
    <Card>
        <CardHeader
            title={props.dealerName}
            subtitle={props.dealerEmail}
            actAsExpander={false}
            showExpandableButton={false}
        />
        <CardText expandable={false}>
            {`Address : ${props.dealerAddress.street} , ${props.dealerAddress.city} , ${props.dealerAddress.state} , ${props.dealerAddress.zip} , USA .`}        
        </CardText>
    </Card>
);

export default DealerCard;