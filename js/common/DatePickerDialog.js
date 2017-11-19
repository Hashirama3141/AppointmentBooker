import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import Calendar from '../../node_modules/material-ui/DatePicker/Calendar';
import Dialog from '../../node_modules/material-ui/Dialog';
import Popover from '../../node_modules/material-ui/Popover/Popover';
import PopoverAnimationVertical from '../../node_modules/material-ui/Popover/PopoverAnimationVertical';
import { dateTimeFormat } from '../../node_modules/material-ui/DatePicker/dateUtils';
import Paper from 'material-ui/Paper';


class DatePickerDialog extends Component {
    static propTypes = {
        DateTimeFormat: PropTypes.func,
        animation: PropTypes.func,
        autoOk: PropTypes.bool,
        cancelLabel: PropTypes.node,
        container: PropTypes.oneOf(['dialog', 'inline']),
        containerStyle: PropTypes.object,
        disableYearSelection: PropTypes.bool,
        firstDayOfWeek: PropTypes.number,
        hideCalendarDate: PropTypes.bool,
        initialDate: PropTypes.object,
        locale: PropTypes.string,
        maxDate: PropTypes.object,
        minDate: PropTypes.object,
        mode: PropTypes.oneOf(['portrait', 'landscape']),
        okLabel: PropTypes.node,
        onAccept: PropTypes.func,
        onDismiss: PropTypes.func,
        onShow: PropTypes.func,
        open: PropTypes.bool,
        openToYearSelection: PropTypes.bool,
        shouldDisableDate: PropTypes.func,
        style: PropTypes.object,
        utils: PropTypes.object,
    };

    static defaultProps = {
        DateTimeFormat: dateTimeFormat,
        cancelLabel: 'Cancel',
        container: 'dialog',
        locale: 'en-US',
        okLabel: 'OK',
        openToYearSelection: false,
    };

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
    };

    state = {
        open: true,
    };

    show = () => {
        if (this.props.onShow && !this.state.open) {
            this.props.onShow();
        }

        this.setState({
            open: true,
        });
    };

    dismiss = () => {
        if (this.props.onDismiss && this.state.open) {
            this.props.onDismiss();
        }

        this.setState({
            open: false,
        });
    };

    handleTouchTapDay = () => {
        if (this.props.autoOk) {
            setTimeout(this.handleTouchTapOk, 300);
        }
    };

    handleTouchTapCancel = () => {
        this.dismiss();
    };

    handleRequestClose = () => {
        this.dismiss();
    };

    handleTouchTapOk = () => {
        if (this.props.onAccept && !this.refs.calendar.isSelectedDateDisabled()) {
            this.props.onAccept(this.refs.calendar.getSelectedDate());
        }

        this.setState({
            open: false,
        });
    };

    handleWindowKeyUp = (event) => {
        switch (keycode(event)) {
            case 'enter':
                this.handleTouchTapOk();
                break;
        }
    };

    render() {
        const {
      DateTimeFormat,
            autoOk,
            cancelLabel,
            container,
            containerStyle,
            disableYearSelection,
            initialDate,
            firstDayOfWeek,
            locale,
            maxDate,
            minDate,
            mode,
            okLabel,
            onAccept, // eslint-disable-line no-unused-vars
            onDismiss, // eslint-disable-line no-unused-vars
            onShow, // eslint-disable-line no-unused-vars
            openToYearSelection,
            shouldDisableDate,
            hideCalendarDate,
            style, // eslint-disable-line no-unused-vars
            animation,
            utils
    } = this.props;

        const { open } = this.state;

        const styles = {
            dialogContent: {
                width: (!hideCalendarDate && mode === 'landscape') ? 479 : 310,
            },
            dialogBodyContent: {
                padding: 0,
                minHeight: (hideCalendarDate || mode === 'landscape') ? 331 : 434,
                minWidth: (hideCalendarDate || mode !== 'landscape') ? 310 : 479,
            },
        };

        const Container = (container === 'inline' ? Popover : Dialog);

        return (
            <div ref="root">
                <EventListener
                    target="window"
                    onKeyUp={this.handleWindowKeyUp}
                />
                <Paper style={style} zDepth={5} rounded={false}>
                    <Calendar
                        autoOk={autoOk}
                        DateTimeFormat={DateTimeFormat}
                        cancelLabel={''}
                        disableYearSelection={disableYearSelection}
                        firstDayOfWeek={firstDayOfWeek}
                        initialDate={initialDate}
                        locale={locale}
                        onTouchTapDay={this.handleTouchTapDay}
                        maxDate={maxDate}
                        minDate={minDate}
                        mode={mode}
                        open={open}
                        ref="calendar"
                        onTouchTapCancel={this.handleTouchTapCancel}
                        onTouchTapOk={this.handleTouchTapOk}
                        okLabel={okLabel}
                        openToYearSelection={openToYearSelection}
                        shouldDisableDate={shouldDisableDate}
                        hideCalendarDate={hideCalendarDate}
                        utils={utils}
                    />
                </Paper>
            </div>
        );
    }
}

export default DatePickerDialog;