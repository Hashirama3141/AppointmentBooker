import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
        this.saveData = this.saveData.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }
    saveData(event) {
        event.preventDefault();
        window.alert(this.state.name);
    }
    handleTextChange(event) {
        this.setState({ name: event.target.value });
    }
    render() {
        return (
            <form onSubmit={this.saveData}>
                <div>
                    <span>name</span>
                    <input type="text" onChange={this.handleTextChange} value={this.state.name} />
                </div>
                <RaisedButton type="submit" primary={true} label="Submit" />
            </form>
        )
    }
}

export default Form;

