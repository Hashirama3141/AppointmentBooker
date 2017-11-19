import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import AppConstants from '../AppConstants';
import queryString from 'query-string';
import AppBar from 'material-ui/AppBar';
import ProgressIndicator from '../common/ProgressIndicator';
import Snackbar from 'material-ui/Snackbar';
import Drawer from 'material-ui/Drawer';
import { Link } from 'react-router-dom';


class Settings extends Component {
    state = {
        slotDuration: null,
        slotData: [],
        startTime: null,
        endTime: null,
        isModified: false,
        dealerId: null,
        showProgress: false,
        snackBarText: '',
        showSnackBar: false
    };
    styles = {
        chip: {
            margin: 4
        },
        wrapper: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        deleteIconStyle: {
            position: 'absolute',
            right: 2,
            width: 100
        }
    }
    parsedDealerData = {}
    componentWillMount() {
        // axios
        //     .post(AppConstants.apiPrefixNew, { type: "customer_selected_dealer", subtype: "f", refId: this.props.dealer.dealerId })
        //     //.post(AppConstants.apiPrefix + AppConstants.apiUrls.customer + this.props.customer.customerId)
        //     .then((response) => {
        //         this.setState({ slotData: response.data });
        //     });
        let parsed = queryString.parse(window.location.href);
        this.parsedDealerData = {
            dealerId: parsed.__personId
        }
        console.log(this.parsedDealerData);
        let response = {
            data: {
                dealerId: 100,
                slotInfo: {
                    slotDuration: 30,
                    startTime: "7:00",
                    endTime: "8:3",
                    slots: [{
                        startTime: "09:00",
                        endTime: "09:00",
                    }, {
                        startTime: "5:00",
                        endTime: "7:00",
                    }]
                }
            }
        }
        this.setState({
            slotDuration: response.data.slotInfo.slotDuration,
            startTime: this.getDateTimeFromTimeString(response.data.slotInfo.startTime),
            endTime: this.getDateTimeFromTimeString(response.data.slotInfo.endTime),
            slotData: response.data.slotInfo.slots.map(this.getChipFormattedData),
            dealerId: this.state.dealerId
        });

    }
    boundHandleSlotDurationChange = this.handleSlotDurationChange.bind(this);
    boundPopulateSlotData = this.populateSlotData.bind(this);
    boundHandleStartTimeChange = this.handleStartTimeChange.bind(this);
    boundHandleEndTimeChange = this.handleEndTimeChange.bind(this);
    boundHandleSubmit = this.handleSubmit.bind(this);
    getDateTimeFromTimeString(timeString) {
        let splitTime = timeString.split(':');
        let date = new Date();
        date.setHours(splitTime[0]);
        date.setMinutes(splitTime[1]);
        date.setMilliseconds(0);
        return date;
    }
    getTimeStringFromDateTime(dateTime) {
        return `${dateTime.getHours()}:${dateTime.getMinutes()}`;
    }
    handleRequestDelete = (key) => {
        this.slotData = this.state.slotData;
        const slotToDelete = this.slotData.map((slot) => slot.key).indexOf(key);
        this.slotData.splice(slotToDelete, 1);
        this.setState({
            slotData: this.slotData,
            isModified: true,
            open: false
        });
    };
    renderChip(data) {
        return (
            <Chip
                key={data.key}
                onRequestDelete={() => this.handleRequestDelete(data.key)}
                deleteIconStyle={this.styles.deleteIconStyle}
                style={this.styles.chip}>
                {data.label}
            </Chip>
        );
    }
    addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }
    getMinutesBetweenDates(date1, date2) {
        if (date1 < date2) return;
        date1.setMilliseconds(0);
        date2.setMilliseconds(0);
        var diffMs = (date1 - date2); // milliseconds
        var diffDays = Math.floor(diffMs / 86400000); // days
        var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        return (diffMins + diffHrs * 60);
    }
    handleSlotDurationChange(event, index, slotDuration) {
        this.setState({ slotDuration }, this.populateSlotData);
    }
    populateSlotData() {
        if (this.state.startTime && this.state.endTime && this.state.slotDuration) {
            let slotsCount;
            let totalSlotDurationInMinutes = this.getMinutesBetweenDates(this.state.endTime, this.state.startTime);
            if (totalSlotDurationInMinutes) {
                slotsCount = Math.floor(totalSlotDurationInMinutes / this.state.slotDuration);
                let slotsData = [];
                let startTime = this.state.startTime;
                let endTime;
                for (let i = 0; i < slotsCount; i++) {
                    endTime = this.addMinutes(startTime, this.state.slotDuration);
                    slotsData.push({
                        startTime: startTime,
                        endTime: endTime,
                        label: `${startTime.getHours()}:${startTime.getMinutes()} - ${endTime.getHours()}:${endTime.getMinutes()}`,
                        key: i
                    });
                    startTime = endTime;
                    //todo handle edge cases
                }
                this.setState({
                    slotData: slotsData,
                    isModified: true
                });
            }
            else {
                //throw validation error
            }
        }
    }
    getSlotFormattedData = (slot, index) => (
        {
            startTime: this.getTimeStringFromDateTime(slot.startTime),
            endTime: this.getTimeStringFromDateTime(slot.endTime)
        }
    )
    getChipFormattedData = (slot, index) => {
        return {
            startTime: this.getDateTimeFromTimeString(slot.startTime),
            endTime: this.getDateTimeFromTimeString(slot.endTime),
            label: `${slot.startTime} - ${slot.endTime}`,
            key: index
        }
    }
    handleToggle = () => this.setState({ open: !this.state.open });
    handleSubmit(event) {
        let slotsData = [];
        slotsData = this.state.slotData.map(this.getSlotFormattedData);
        if (slotsData.length > 0) {
            this.setState({ showProgress: true });
            //window.setTimeout(() => this.setState({ isSubmitted: true, showProgress: false, showSnackBar: true, snackBarText: 'Save Failed !'  }), 2500);

            axios
                .post(AppConstants.apiEndpoint,
                {
                    type: "store_dealer_slots",
                    dealerId: this.parsedDealerData.dealerId,
                    slots: {
                        slotDuration: this.state.slotDuration,
                        startTime: this.getTimeStringFromDateTime(this.state.startTime),
                        endTime: this.getTimeStringFromDateTime(this.state.endTime),
                        slots: slotsData
                    }
                })
                // window.alert(JSON.stringify(
                //     {
                //         dealerId: this.props.dealer.dealerId,
                //         slots: {
                //             slotDuration: this.state.slotDuration,
                //             startTime: this.getTimeStringFromDateTime(this.state.startTime),
                //             endTime: this.getTimeStringFromDateTime(this.state.endTime),
                //             slots: slotsData
                //         }
                //     }))
                .then(response => {
                    if (response.status === 200 && response.data && response.data.dataSet) {
                        this.setState({
                            isSubmitted: true, showProgress: false,
                            showSnackBar: true, snackBarText: 'Settings saved !'
                        });
                    }
                    else {
                        //throw fail save error
                        this.setState({
                            isSubmitted: true, showProgress: false,
                            showSnackBar: true, snackBarText: 'Save Failed !'
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ showProgress: false, showSnackBar: true, snackBarText: 'Save Failed !' });
                })
        }
    }
    handleStartTimeChange(event, startTime) {
        this.setState({ startTime }, this.populateSlotData);
    }
    handleEndTimeChange(event, endTime) {
        this.setState({ endTime }, this.populateSlotData);
    }
    render() {
        this.styles = {
            chip: {
                margin: 4,
            }
        }
        const { slotDuration } = this.state;
        return (
            <div>
                <AppBar
                    onLeftIconButtonTouchTap={this.handleToggle}
                    title="Auto Renewal Dealer Portal"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <Drawer open={this.state.open} docked={false}>
                    <MenuItem><Link to='/dealer'>Home</Link></MenuItem>
                </Drawer>
                <Snackbar
                    open={this.state.showSnackBar}
                    message={this.state.snackBarText}
                    autoHideDuration={4000} />
                {this.state.showProgress ? <ProgressIndicator /> : ''}
                <div className="cvr-CustomerCard cvr-CustomerCard--padTop">
                    {this.state.isSubmitted ? '' : ''}
                    <Card>
                        <CardHeader
                            title="Appointments"
                            subtitle="Subtitle"
                            actAsExpander={false}
                            showExpandableButton={false}
                        />
                        <CardText expandable={false}>
                            <div className="cvr-appointmentBooker">
                                <div className="cvr-appointmentBooker--alignOne">
                                    <TimePicker
                                        hintText="Enter Start Time:"
                                        minutesStep={10} onChange={this.boundHandleStartTimeChange}
                                        value={this.state.startTime}
                                    />
                                </div>
                                <div className="cvr-appointmentBooker--alignTwo">
                                    <TimePicker
                                        hintText="Enter End Time:" onChange={this.boundHandleEndTimeChange}
                                        minutesStep={10}
                                        value={this.state.endTime}
                                    />
                                </div>
                                <div className="cvr-appointmentBooker--alignThree">
                                    {<SelectField
                                        value={this.state.slotDuration}
                                        floatingLabelText="Slot Duration"
                                        onChange={this.boundHandleSlotDurationChange}>
                                        {[30, 40, 60].map((item) => {
                                            return (<MenuItem key={item} value={item} primaryText={`${item} minutes`} />)
                                        }
                                        )}
                                    </SelectField>
                                    }
                                </div>
                            </div>
                            <div className="cvr-appointmentBooker">
                                <div>
                                    {this.state.slotData.map(this.renderChip, this)}
                                </div>
                            </div>
                        </CardText>
                    </Card >
                    <div className="cvr-appointmentBooker">
                        <div className="cvr-submitBtn">
                            {
                                (this.state.startTime && this.state.endTime && this.state.slotDuration &&
                                    this.state.isModified && (this.state.slotData && this.state.slotData.length > 0)) ?
                                    <RaisedButton label="Save"
                                        onTouchTap={this.boundHandleSubmit} primary={true} />
                                    :
                                    <RaisedButton label="Save" disabled={true} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;