import React, { Component } from 'react';
import CustomerCard from './CustomerCard';
import DealersList from './DealersList';
import AppointmentCard from '../common/AppointmentCard';
import ProgressIndicator from '../common/ProgressIndicator';
import axios from 'axios';
import AppConstants from '../AppConstants';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import queryString from 'query-string';
import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';

class CustomerLanding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerInfo: null,
            showProgress: false,
            snackBarText: '',
            showSnackBar: false
        };
    }
    componentWillMount() {
        let parsed = queryString.parse(window.location.href);
        let parsedcustomerData = {
            customerId: parsed.__personId,
            vehicleId: parsed.__vehicleId
        }
        console.log(parsedcustomerData);
        this.setState({ showProgress: true });
        axios
            // .get(AppConstants.apiPrefix + AppConstants.apiUrls.customer)
            // .then((response) => {
            //     this.setState({ customerInfo: response.data, showProgress: false });
            // })
            .post(AppConstants.apiEndpoint,
            {
                "type": "get_customer_vehicle_info",
                "vehicleId": parsedcustomerData.vehicleId,
                "customerId": parsedcustomerData.customerId
            })
            .then((response) => {
                if (response.status === 200 && response.data && response.data.dataSet) {
                    this.setState({ customerInfo: response.data.dataSet, showProgress: false });
                }
                else {
                    //throw fail save error
                    this.setState({
                        showProgress: false,
                        showSnackBar: true, snackBarText: 'Error getting data !'
                    });
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ showProgress: false, showSnackBar: true, snackBarText: 'Error contacting Server !' });
            })
    }
    render() {
        return (
            <div>
                {this.state.showProgress ? <ProgressIndicator /> : ''}
                <AppBar
                    title="Auto Renewal Customer Portal"
                    showMenuIconButton={false}
                />
                <Snackbar
                    open={this.state.showSnackBar}
                    message={this.state.snackBarText}
                    autoHideDuration={4000} />
                {this.state.customerInfo ?
                    <div>
                        <div className="cvr-CustomerCard cvr-CustomerCard--padTop">
                            <CustomerCard {...this.state.customerInfo.customer} />
                        </div>
                        {this.state.customerInfo.bookedAppointment && this.state.customerInfo.bookedAppointment.dealerId ?
                            (
                                <div>
                                    <div className="cvr-appointmentBooker cvr-appointmentBooker--pad">
                                        <Card style={{ margin: 22, backgroundColor: "#49c047" }}>
                                            <CardHeader
                                                title="Appointment Booked"
                                                subtitle="You have booked the following slot !"
                                                actAsExpander={false}
                                                showExpandableButton={false}
                                            />
                                        </Card>
                                    </div>
                                    <div className="cvr-CustomerCard">
                                        <AppointmentCard {...this.state.customerInfo.bookedAppointment} />
                                    </div>
                                </div>)
                            : (
                                <div className="cvr-CustomerCard cvr-CustomerCard--padTop">
                                    {this.state.customerInfo.dealersList ?
                                        <DealersList dealers={this.state.customerInfo.dealersList} />
                                        : ''
                                    }
                                </div>)
                        }
                    </div>
                    : ''
                }
            </div>
        )
    }
}

export default CustomerLanding;
