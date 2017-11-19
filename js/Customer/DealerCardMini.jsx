import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Slots from './Slots';
import { Link } from 'react-router-dom'


const style = {
    height: 250,
    width: 440,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};
const slotBtnstyle = {
    margin: 5,
    textAlign: 'center',
    display: 'inline-block',
};

const DealerCardMini = (props) => (
    <div className="cvr-miniCard__Wrapper">
        <Link to={`/appointment/${props.dealerId}`}>
            <Paper style={style} zDepth={5} rounded={false}>
                <div className="cvr-miniCard__Outline">
                    <div className="cvr-miniCard__dealerInfo">
                        <Card>
                            <CardHeader
                                title={props.dealerName}
                                subtitle={`Address : ${props.dealerAddress.street} , ${props.dealerAddress.city} , ${props.dealerAddress.state} ,
                             ${props.dealerAddress.zip} , USA`}
                                actAsExpander={false}
                                showExpandableButton={false}
                            />
                            <CardText style={{ height: 92 }} expandable={false}>
                                <Slots slots={props.slots} />
                            </CardText>
                        </Card>
                    </div>

                    <div className="cvr-miniCard__buttonCard">
                        <RaisedButton label="Book Appointment" primary={true} />
                    </div>
                </div>
            </Paper>
        </Link>

    </div>
);

export default DealerCardMini;
