import React, { Component } from 'react';
import axios from 'axios';
import AppConstants from '../AppConstants';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

export default class BookedRenew extends Component {

    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <strong className="cvr-UpcomingRenewalText" >Scheduled Renewal</strong>
                <div className="cvr-ScheduleRenewalsTable">
                <Table>
                    <TableHeader displaySelectAll={false} >
                        <TableRow>                           
                            <TableHeaderColumn >#</TableHeaderColumn>
                            <TableHeaderColumn >ID</TableHeaderColumn>
                            <TableHeaderColumn >VIN</TableHeaderColumn>
                            <TableHeaderColumn >Name</TableHeaderColumn>
                            <TableHeaderColumn >Make</TableHeaderColumn>
                            <TableHeaderColumn >Appointment Date </TableHeaderColumn>
                            <TableHeaderColumn >Time</TableHeaderColumn>
                            
                            
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} style={{margin:12}}>
                        {this.props.customerSlot.map((customer, index) => (

                            <TableRow key={index}>
                                 <TableRowColumn>{index+1}</TableRowColumn>
                                <TableRowColumn>{customer.customerId}</TableRowColumn>
                                <TableRowColumn>{customer.vin}</TableRowColumn>
                                <TableRowColumn>{customer.customerName}</TableRowColumn>
                                <TableRowColumn>{customer.vehicleMake}</TableRowColumn>
                                <TableRowColumn>{customer.appointment.appointmentDate}</TableRowColumn>
                                <TableRowColumn>{customer.appointment.startTime} to {customer.appointment.endTime}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </div>
            </div>
        )
    }
}