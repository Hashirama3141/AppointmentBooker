import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const AppointmentCard = (props) => (
    <Card initiallyExpanded={true}>
        <CardHeader
            title="Appointment Details"
            subtitle="Please ensure that you are on time to ensure minimal disruption!"
            actAsExpander={true}
            showExpandableButton={true}
        />
        <CardActions>
            <Table selectable={true}>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>Dealer Name</TableHeaderColumn>
                        <TableHeaderColumn>Appointment Date</TableHeaderColumn>
                        <TableHeaderColumn>Appointment Start Time:</TableHeaderColumn>
                        <TableHeaderColumn>Appointment End Time:</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    <TableRow>
                        <TableRowColumn>{`${props.dealerName}`}</TableRowColumn>
                        <TableRowColumn>{`${props.slotDate}`}</TableRowColumn>
                        <TableRowColumn>{`${props.slotStartTime}`}</TableRowColumn>
                        <TableRowColumn>{`${props.slotEndTime}`}</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        </CardActions>
        <CardText expandable={true}>
            <CardHeader
                title={'Dealer Information :'}
                subtitle={`${props.dealerName} , ${props.dealerAddress.street} , ${props.dealerAddress.city} , ${props.dealerAddress.state} , ${props.dealerAddress.zip} , USA`}
                actAsExpander={true}
                showExpandableButton={true}
            />
        </CardText>
    </Card>
);

export default AppointmentCard;