import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

const DealerCard = (props) => (
    <Card>
        <CardHeader
            title={props.dealerName}
            subtitle={`Address : ${props.dealerAddress.street} , ${props.dealerAddress.city} , ${props.dealerAddress.state} , ${props.dealerAddress.zip} , USA .`}
            actAsExpander={false}
            showExpandableButton={false}
        />
        <CardText expandable={false}>
            {'sjdn'}
        </CardText>
    </Card>
);

export default DealerCard;