import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    height: 230,
    width: 415,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};
const slotBtnstyle = {
    margin: 5,
    textAlign: 'center',
    display: 'inline-block',
};
const customSlotBtnstyle = {
    margin: 5,
    textAlign: 'center',
    display: 'inline-block',
    visibility:'hidden'
};
const Slots = (props) => (
    <div>
        {props.slots.length === 0 ?
            <div>
                {[1, 2, 3, 4].map((slot, index) => (
                    <RaisedButton key={slot} primary={true} label={'sdfsdfdd'} style={customSlotBtnstyle} />
                ))}
            </div>
            : ''
        }
        {
            props.slots
                .map((slot, index) => {
                    if (index < 4) {
                        const btn = slot.availableSlots > 0 ?
                            <RaisedButton key={slot.slotId} label={`${slot.slotDate} (${slot.availableSlots})`} primary={true} style={slotBtnstyle} />
                            :
                            <RaisedButton key={slot.slotId} label={slot.slotDate} disabled={true} style={slotBtnstyle} />

                        return btn;
                    }
                })
        }
    </div>
);

export default Slots;
