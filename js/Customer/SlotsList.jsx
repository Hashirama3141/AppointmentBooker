import React from 'react';
import Slots from './Slots';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    height: 150,
    width: 225,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};
const slotBtnstyle = {
    height: 150,
    width: 225,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    backgroundColor: 'lightgray'
};
const raisedBtnStyle = {
    width: 225,
    height: 150
}

const SlotsList = (props) => {
    return (
        <div>
            <Card>
                <CardHeader
                    title="Slots"
                    subtitle="Select a slot to book an appointment"
                    actAsExpander={false}
                    showExpandableButton={false}
                />
                <CardText expandable={false}>
                    <div className="slotsList__Wrapper">
                        {
                            (props.slots && props.slots.length > 0) ?
                                props.slots.map(slot => {
                                    const btn = slot.isAvailable ?
                                        <Paper key={slot.slotId} zDepth={5} rounded={false} style={style}>
                                            {(props.selectedSlot && props.selectedSlot.slotId === slot.slotId) ?
                                                <RaisedButton backgroundColor="#49c047" style={raisedBtnStyle} className="cvr-btns"
                                                    onTouchTap={props.handleTimeSlotSelection.bind(null, slot)}
                                                    label={`${slot.slotStartTime} - ${slot.slotEndTime}`} />
                                                :
                                                <RaisedButton style={raisedBtnStyle} primary={true} className="cvr-btns"
                                                    onTouchTap={props.handleTimeSlotSelection.bind(null, slot)}
                                                    label={`${slot.slotStartTime} - ${slot.slotEndTime}`} />
                                            }
                                        </Paper>
                                        :
                                        <Paper key={slot.slotId} style={style} zDepth={5} rounded={false} style={slotBtnstyle}>
                                            <RaisedButton style={raisedBtnStyle} disabled={true} className="cvr-btns" label={`${slot.slotStartTime} - ${slot.slotEndTime}`} />
                                        </Paper>
                                    return btn;
                                })
                                :
                                'Please select a date !'
                        }
                    </div>
                </CardText>
            </Card>
        </div>
    );
}

export default SlotsList;
