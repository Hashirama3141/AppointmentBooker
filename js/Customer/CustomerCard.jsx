import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

const CustomerCard = (props) => (
    <Card>
        <CardHeader
            title={props.customerName}
            subtitle={props.vehicleMake}
            actAsExpander={false}
            showExpandableButton={false}
        />
        <CardText expandable={false}>
            <div>VIN :{props.vin}</div>
            <div>Renewal Due Date : {props.renewalDate}</div>
        </CardText>
    </Card>
);

export default CustomerCard;