import React, { Component } from 'react';
import axios from 'axios';
import AppConstants from '../AppConstants';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

export default class UpcomingRenewals extends Component {

  state = {
    open: false,
    notificationMode: '',
    customers: this.props.customers,
    selectedCustomer: null
  };
  boundHandleCellClick = this.handleCellClick.bind(this);

  handleClose = () => {
    this.setState({ open: false });
  };
  handleCellClick(rowIndex, colId) {
    this.setState({ selectedCustomer: this.state.customers[rowIndex-1] }, () => {
      if (this.state.selectedCustomer.commAccept == 1 && colId === 6) {
        this.sendNotification(this.state.selectedCustomer, 'mail');
      }
      else if (this.state.selectedCustomer.commAccept == 1 && colId === 7) {
        this.sendNotification(this.state.selectedCustomer, 'sms');
      }
    });
  }
  sendNotification(selectedCustomer, notificationMode) {
    return axios
      .post(AppConstants.apiEndpoint,
      {
        "type": "renewal_mail_intimation",
        "regId": selectedCustomer.registrationId,
        "notificationMode": notificationMode
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            open: true, notificationMode: notificationMode
          });

        }
        else {
          //faliure popup
        }
      })
      .catch(error => {
        //faliure popup
        console.log(`error:${error}`)
      });
  };

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />];

    return (
      <div>
        <strong className="cvr-UpcomingRenewalText">Upcoming Renewals</strong>
        <br />
        <div className="cvr-UpcominRenewalsTable">
          <Table onCellClick={this.boundHandleCellClick}>
           
            <TableBody displayRowCheckbox={false}>
              <TableRow className="cvr-TableHeader">
                <TableRowColumn ><p className="cvr-textAlignCenter">S.No.</p></TableRowColumn>
                  <TableRowColumn ><p className="cvr-textAlignCenter">Name</p></TableRowColumn>
                  <TableRowColumn ><p className="cvr-textAlignCenter">VIN</p></TableRowColumn>
                  <TableRowColumn ><p className="cvr-textAlignCenter">Make</p></TableRowColumn>
                  <TableRowColumn ><p className="cvr-textAlignCenter">Renewal Last Date</p></TableRowColumn>
                  <TableRowColumn ><p className="cvr-textAlignCenter">Communication</p></TableRowColumn>
                  <TableRowColumn ><p className="cvr-textAlignCenter"></p></TableRowColumn>
                  <TableRowColumn ><p className="cvr-textAlignCenter"></p></TableRowColumn>
                </TableRow>
               {this.state.customers.map((customer, index) => (
                <TableRow key={index}>
                  <TableRowColumn ><p className="cvr-textAlignCenter">{index+1}</p></TableRowColumn>
                  <TableRowColumn ><p className="cvr-textAlignCenter">{customer.customerName}</p></TableRowColumn>
                  <TableRowColumn ><p className="cvr-textAlignCenter">{customer.vin}</p></TableRowColumn>
                  <TableRowColumn ><p className="cvr-textAlignCenter">{customer.vehicleMake}</p></TableRowColumn>
                  <TableRowColumn ><p className="cvr-textAlignCenter">{customer.dueDate}</p></TableRowColumn>
                  <TableRowColumn ><p className="cvr-textAlignCenter">{customer.commAccept === 1 ? <div>&#x2714;</div> : <div>&#x2716;</div>}</p></TableRowColumn>
                  <TableRowColumn style={{paddingLeft:66}}>
                    <div >
                      <RaisedButton  label="EMAIL" primary={true} disabled={customer.commAccept !== 1}/>
                    </div>
                  </TableRowColumn>
                  <TableRowColumn style={{paddingLeft:0}}>
                    <div >
                      <RaisedButton  label="SMS" primary={true} disabled={customer.commAccept !== 1}/>
                    </div>
                  </TableRowColumn>
                </TableRow> 
              ))}
            </TableBody>
          </Table>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <div>
              {
                (this.state.notificationMode === 'sms')
                  ? <div>You have Successfully Notified to the Customer on {this.state.selectedCustomer ? this.state.selectedCustomer.customerNumber : ''} by SMS.</div>
                  : <div>You have Successfully Notified to the Customer on {this.state.selectedCustomer ? this.state.selectedCustomer.customerEmail : ''} by EMAIL. </div>
              }
            </div>
          </Dialog>
        </div>
      </div>
    )
  }
}