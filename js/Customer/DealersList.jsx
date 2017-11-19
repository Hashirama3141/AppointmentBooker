import React from 'react';
import DealerCardMini from './DealerCardMini';
import { Card, CardHeader, CardText } from 'material-ui/Card';

const DealersList = (props) => (
    <div>
        <Card>
            <CardHeader
                title="Dealers"
                subtitle="Select a dealer to book appointment"
                actAsExpander={false}
                showExpandableButton={false}
            />
            <CardText expandable={false}>
                {
                    props.dealers
                        .filter((dealer) => (dealer.slots && dealer.slots.length > 0))
                        .map(dealer => {
                            return (
                                <DealerCardMini key={dealer.dealerId} {...dealer} />
                            )
                        })
                }
            </CardText>
        </Card>
    </div>
);

export default DealersList;
