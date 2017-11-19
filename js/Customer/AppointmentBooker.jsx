import React, { Component } from 'react';
import DatePicker from '../Common/DatePicker';
import SlotsList from './SlotsList';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

const customDialogContent = {
    position: "absolute",
    zIndex: 0
}
class AppointmentBooker extends Component {
    state = {
        selectedSlots: this.getSlotsBydate(new Date()),
        selectedSlot: this.getSelectedSlot(),
        dateSelected: null
    }
    boundDisableInvalidDates = this.disableInvalidDates.bind(this);
    boundHandleSelectedDate = this.handleSelectedDate.bind(this);
    boundHandleTimeSlotSelection = this.handleTimeSlotSelection.bind(this);
    boundBookAppointmentAction = this.bookAppointmentAction.bind(this);
    //todo//boundGetSelectedSlot = this.getSelectedSlot.bind(this);
    getSelectedSlots() {
        let selectedSlot = this.getSelectedSlot();
        let selectedDate = selectedSlot ?
            selectedSlot.slotDate
            :
            this.getTimeTruncatedDate(new Date());
        return this.getSlotsBydate(this.getTimeTruncatedDate(new Date(selectedDate)));
    }
    getSelectedSlot() {
        // if (this.props.customer && this.props.customer.bookedSlotId) {
        //     let selectedSlot = this.props.slots.find(slot => {
        //         return (slot.slotId === this.props.customer.bookedSlotId);
        //     });
        //     return selectedSlot;
        // }
        return null;
    }
    getInitialAvailableSlot(slot) {
        let slotIndex = slot.slotTime.find(slot => slot.isAvailable);
        slotIndex > 0 ? slot[slotIndex] : undefined;
    }
    getSlotsBydate(date) {
        let slots = this.props.slots.filter(slot => {
            let slotDateOnly = this.getTimeTruncatedDate(slot.slotDate);
            return (date.getTime() === slotDateOnly.getTime());
        });
        return slots;
    }
    handleSelectedDate(event, date) {
        if (!this.props.isFreezed) {
            let slots = this.getSlotsBydate(date);
            if (slots.length >= 0) {
                this.setState({
                    selectedSlots: slots,
                    selectedSlot: null
                });
            }
        }
    }
    handleTimeSlotSelection(selectedSlot, event) {
        if (!this.props.isFreezed) {
            this.setState({
                selectedSlot: selectedSlot,
            });
        }
    }
    bookAppointmentAction(event) {
        this.props.bookAppointment(this.state.selectedSlot);
    }
    getTimeTruncatedDate(dateString) {
        let slotDateOnly = new Date(dateString);
        slotDateOnly.setHours(0, 0, 0, 0);
        return slotDateOnly;
    }
    disableInvalidDates(date) {
        return this.props.slots.filter(slot => {
            let slotDateOnly = this.getTimeTruncatedDate(slot.slotDate);
            return ((date.getTime() === slotDateOnly.getTime()) && (slot.isAvailable));
        }).length <= 0;
    }
    render() {
        return (
            <div>
                {this.state.showSnackBar}
                {(this.props.isFreezed) ?
                    <div className="cvr-appointmentBooker cvr-appointmentBooker--pad">
                        <Card style={{ margin: 22, backgroundColor: "#49c047" }}>
                            <CardHeader
                                title="Appointment Booked"
                                subtitle="You have booked the following slot !"
                                actAsExpander={false}
                                showExpandableButton={false}
                            />
                            <CardActions>
                                <Link to={'/'}>
                                    <FlatButton label="Go Back" />
                                </Link>
                            </CardActions>
                        </Card>
                    </div>
                    : ''
                }
                <div className="cvr-appointmentBooker">
                    <div className="cvr-datePickerWrapper">
                        <DatePicker
                            shouldDisableDate={this.boundDisableInvalidDates}
                            dialogContainerStyle={customDialogContent}
                            container="inline"
                            mode="landscape"
                            value={this.state.dateSelected}
                            autoOk={true}
                            onChange={this.boundHandleSelectedDate} />
                    </div>
                    <div className="cvr-slotSelectorWrapper">
                        <SlotsList handleTimeSlotSelection={this.boundHandleTimeSlotSelection}
                            selectedSlot={this.state.selectedSlot}
                            slots={this.state.selectedSlots} />
                    </div>
                    <div className="cvr-submitBtn">
                        {
                            (this.state.selectedSlot && !this.props.isFreezed) ?
                                <RaisedButton label="Book Appointment"
                                    onTouchTap={this.boundBookAppointmentAction} primary={true} />
                                :
                                <RaisedButton label="Book Appointment" disabled={true} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default AppointmentBooker;
