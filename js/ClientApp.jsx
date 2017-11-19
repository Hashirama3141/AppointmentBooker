import React, { Component } from 'react';
import { HashRouter, BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import DealerLanding from './Dealer/DealerLanding';
import Settings from './Dealer/Settings';
import CustomerLanding from './Customer/CustomerLanding';
import Appointment from './Customer/Appointment';
import Cancel from './Common/CancelAppointment';
import FourOhFour from './FourOhFour';

const dealerLoginData = {
    dealerId: 100,
    dealerName: "Pride Honda",
    dealerAddress: {
        street: "1601 Golf Terrace Dr",
        city: "Tallahassee",
        state: "Florida",
        zip: "32301",
        country: "USA"
    },
}

const Dealer = () => (
    <Switch>
        <Route exact path='/dealer' component={() => <DealerLanding dealer={dealerLoginData} />} />
        <Route path='/dealer/settings' component={() => <Settings dealer={dealerLoginData} />} />
        <Redirect to={{ state: { error: true } }} />
    </Switch>
);

const customerLoginData = {
    customerId: '',
    customerName: "John Smith",
    vin: "09218302948302948039",
    make: "BMW",
    renewalDueDate: "2017-07-14T18:22:40.418Z"
}

const Customer = () => (
    <Switch>
        <Route exact path='/' component={() => <CustomerLanding customer={customerLoginData} />} />
        <Route path='/appointment/:dealerId'
            component={(props) => <Appointment customer={customerLoginData} dealerId={props.match.params.dealerId} />} />
        <Redirect to={{ state: { error: true } }} />
    </Switch>
);

class GlobalRouteSwitch extends Component {
    // componentWillUpdate(nextProps){

    // }
    render() {
        const { location } = this.props;
        const isError = !!(location.state && location.state.error);
        return (
            isError ?
                <Route component={FourOhFour} />
                : <Switch location={this.props.location}>
                    <Route path="/dealer" component={Dealer} />
                    <Route path="/cancel" component={Cancel} />
                    <Route path="/" component={Customer} />
                </Switch>
        )
    }
}

const ClientApp = () => (
    <HashRouter>
        <Route component={GlobalRouteSwitch} />
    </HashRouter>
);

export default ClientApp;

