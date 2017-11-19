import React, { Component } from 'react';
import axios from 'axios';
import AppConstants from '../AppConstants';
import DealerCard from './DealerCard';
import UpcomingRenewals from './UpcomingRenewals';
import BookedRenew from './BookedRenew';
import queryString from 'query-string';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ProgressIndicator from '../common/ProgressIndicator';
import Snackbar from 'material-ui/Snackbar';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';


class DealerLanding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dealerInfo: null, showProgress: false,
            snackBarText: '',
            showSnackBar: false,
            open: false
        };
    }
    parsedDealerData = {};

    componentWillMount() {
        let parsed = queryString.parse(window.location.href);
        this.parsedDealerData = {
            dealerId: parsed.__personId
        }

        console.log( this.parsedDealerData);

        console.log(this.parsedDealerData);
        this.setState({ showProgress: true });

        axios
            // .get(AppConstants.apiPrefix + AppConstants.apiUrls.dealerInfo + this.props.dealer.dealerId)
            // .then((response) => {
            //     this.setState({ dealerInfo: response.data });
            // });
            .post(AppConstants.apiEndpoint,
            {
                "type": "dealer_renewels_info",
                "dealerId": this.parsedDealerData.dealerId
            })
            .then((response) => {
                if (response.status === 200 && response.data && response.data.dataSet
                    && ((Object.prototype.toString.call(response.data.dataSet) !== "[object Array]") || response.data.dataSet.length > 0)) {
                    this.setState({ dealerInfo: response.data.dataSet, showProgress: false });
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
        handleToggle = () => this.setState({ open: !this.state.open });
    render() {
        return (
            <div>
                 <AppBar
                    onLeftIconButtonTouchTap={this.handleToggle}
                    title="Auto Renewal Dealer Portal"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <Drawer open={this.state.open} docked={false}>
                    <MenuItem><Link to='/dealer/settings'>Settings</Link></MenuItem>
                </Drawer>
                {this.state.showProgress ? <ProgressIndicator /> : ''}
                <Snackbar
                    open={this.state.showSnackBar}
                    message={this.state.snackBarText}
                    autoHideDuration={4000} />
                {this.state.dealerInfo && this.state.dealerInfo.dealer ?
                    <div>
                        <div className="cvr-CustomerCard cvr-CustomerCard--padTop">
                            {this.state.dealerInfo.dealer ?
                                <DealerCard {...this.state.dealerInfo.dealer} />
                                : ''
                            }
                        </div>
                        <div className="cvr-CustomerCard cvr-CustomerCard--padTop">
                            {this.state.dealerInfo.dealer.upcomingRenewals ?
                                <UpcomingRenewals customers={this.state.dealerInfo.dealer.upcomingRenewals} />
                                : ''
                            }
                        </div>
                        <div className="cvr-CustomerCard cvr-CustomerCard--padTop">
                            {this.state.dealerInfo.dealer.upcomingRenewals ?
                                <BookedRenew customerSlot={this.state.dealerInfo.dealer.registeredRenewals} />
                                : ''
                            }
                        </div>
                    </div>
                    : ''
                }
            </div>

        )
    }
}

export default DealerLanding;