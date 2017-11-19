import React, { Component } from 'react';
import axios from 'axios';
import AppConstants from '../AppConstants';
import DealerCard from '../Dealer/DealerCard';
import AppointmentBooker from './AppointmentBooker';
import queryString from 'query-string';
import ProgressIndicator from '../common/ProgressIndicator';
import Snackbar from 'material-ui/Snackbar';
import AppBar from 'material-ui/AppBar';

class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dealerInfo: null,
            showProgress: false,
            snackBarText: '',
            showSnackBar: false,
            isFreezed: false
        };
    }
    parsedcustomerData = {};
    boundBookAppointment = this.bookAppointment.bind(this);
    bookAppointment(slot) {
        this.setState({ showProgress: true });
        axios
            .post(AppConstants.apiEndpoint,
            {
                "type": "renewal_registration",
                "vehicleId": this.parsedcustomerData.vehicleId,
                "customerId": this.parsedcustomerData.customerId,
                "dealerId": this.state.dealerInfo.dealerRefId,
                "slotId": slot.slotId,
                "selectedDate": slot.slotDate
            })
            .then((response) => {
                if (response.status === 200 && response.data && response.data.dataSet) {
                    this.setState({
                        showProgress: false,
                        showSnackBar: true, snackBarText: 'Appointment Booked !',
                        isFreezed: true
                    });
                }
                else {
                    //throw fail save error
                    this.setState({
                        showProgress: false,
                        showSnackBar: true, snackBarText: 'Booking Failed !'
                    });
                }
            })
            .catch(error => {
                console.log(`error:${error}`);
                this.setState({
                    showProgress: false,
                    showSnackBar: true, snackBarText: 'Error contacting Server !'
                });
            })
        // .post(AppConstants.apiPrefix + AppConstants.apiUrls.dealer, {
        //     customerId: this.props.customer.customerId,
        //     slotId: slot.slotId
        // });
    }
    componentWillMount() {
        let parsed = queryString.parse(window.location.href);
        this.parsedcustomerData = {
            customerId: parsed.__personId,
            vehicleId: parsed.__vehicleId
        }
        console.log(this.parsedcustomerData);
        this.setState({ showProgress: true });
        axios
            .post(AppConstants.apiEndpoint,
            {
                "type": "customer_selected_dealer",
                "vehicleId": this.parsedcustomerData.vehicleId,
                "customerId": this.parsedcustomerData.customerId,
                "dealerId": this.props.dealerId
            })
            .then((response) => {
                if (response.status === 200 && response.data && response.data.dataSet) {
                    this.setState({
                        dealerInfo: response.data.dataSet, showProgress: false
                    });
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
        // .get(AppConstants.apiPrefix + AppConstants.apiUrls.dealer)
        // .then((response) => {
        //     this.setState({ dealerInfo: response.data, showProgress: false });
        // })
        // .catch(error => console.log(`error:${error}`))
    }
    render() {
        return (
            <div>
                <AppBar
                    title="Auto Renewal Customer Portal"
                    showMenuIconButton={false}
                />
                <Snackbar
                    open={this.state.showSnackBar}
                    message={this.state.snackBarText}
                    autoHideDuration={4000} />
                {this.state.showProgress ? <ProgressIndicator /> : ''}
                {this.state.dealerInfo ?
                    <div>
                        <div className="cvr-CustomerCard cvr-CustomerCard--padTop">
                            <DealerCard {...this.state.dealerInfo} />
                        </div>
                        <div className="cvr-CustomerCard cvr-CustomerCard--padTop">
                            <AppointmentBooker isFreezed={this.state.isFreezed} bookAppointment={this.boundBookAppointment} customer={this.state.dealerInfo.customer} slots={this.state.dealerInfo.slots} />
                        </div>
                    </div>
                    : ''
                }
            </div>
        )
    }
}

export default Appointment;