import React, { Component } from 'react';
import axios from 'axios';
import AppConstants from '../AppConstants';
import AppointmentCard from '../common/AppointmentCard';
import queryString from 'query-string';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import ProgressIndicator from '../common/ProgressIndicator';


class CancelAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showResend: false,
            cancelledAppointment: null,
            showProgress: false
        };
    }
    parsedAppointmentData = {};
    boundCancelAppointment = this.cancelAppointment;

    cancelAppointment() {
        this.setState({ showProgress: true });
        axios
            .post(AppConstants.apiEndpoint,
            {
                "type": "register_renewal_cancellation",
                "appointmentId": this.parsedAppointmentData.appointmentId
            })
            .then((response) => {
                let cancelledAppointment = response.data.dataSet;
                if (cancelledAppointment) {
                    this.setState({
                        cancelledAppointment: response.data.dataSet,
                        showResend: (cancelledAppointment === null),
                        showProgress: false
                    });
                }
                else {
                    this.setState({
                        showResend: true,
                        showProgress: false
                    })
                }
            })
            .catch(error => {
                this.setState({
                    showResend: true,
                    showProgress: false
                });
                console.log(`error:${error}`);
            })
        // window.setTimeout(() => this.setState({ showProgress: false }), 2000);
        // this.setState({
        //     cancelledAppointment: {
        //         dealerId: 100,
        //         dealerName: "Pride Honda",
        //         dealerAddress: {
        //             street: "1601 Golf Terrace Dr",
        //             city: "Tallahassee",
        //             state: "Florida",
        //             zip: "32301",
        //             country: "USA"
        //         },
        //         slotId: 123,
        //         slotDate: "2017-07-14",
        //         slotStartTime: "09:00",
        //         slotEndTime: "09:30"

        //     },
        //     showResend: false
        // });
    }

    componentWillMount() {
        let parsed = queryString.parse(window.location.href);
        this.parsedAppointmentData = {
            appointmentId: parsed.__appointmentId
        }
        console.log(this.parsedAppointmentData);
        if (this.parsedAppointmentData.appointmentId) {
            this.cancelAppointment();
        }
        //
        else {
            this.setState({ showResend: true });
        }
    }
    render() {
        return (
            <div>
                {this.state.showProgress ? <ProgressIndicator /> : ''}
                <AppBar
                    title="Auto Renewal Customer Portal"
                    showMenuIconButton={false}
                />
                <div className="cvr-CustomerCard cvr-CustomerCard--padTop">
                    {(this.state.showResend || !this.state.cancelledAppointment) && (!this.state.showProgress) ?
                        <div>
                            <div className="cvr-appointmentBooker cvr-appointmentBooker--pad">
                                <Card style={{ margin: 22, backgroundColor: "#d4002a" }}>
                                    <CardHeader
                                        title=" Unexpected Error"
                                        subtitle="If this issue persists please try after some time"
                                        actAsExpander={false}
                                        showExpandableButton={false}
                                    />
                                    <CardActions>
                                        <FlatButton label="Try Again" onTouchTap={this.boundCancelAppointment} />
                                    </CardActions>
                                </Card>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="cvr-appointmentBooker cvr-appointmentBooker--pad">
                                {this.state.cancelledAppointment ?
                                    <Card style={{ margin: 22, backgroundColor: "#49c047" }}>
                                        <CardHeader
                                            title="Appointment Cancelled"
                                            subtitle="You have Cancelled the following slot !"
                                            actAsExpander={false}
                                            showExpandableButton={false}
                                        />
                                    </Card>
                                    : ''}
                            </div>
                            <div className="cvr-CustomerCard">
                                {this.state.cancelledAppointment ?
                                    <AppointmentCard {...this.state.cancelledAppointment} />
                                    : ''}
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default CancelAppointment;