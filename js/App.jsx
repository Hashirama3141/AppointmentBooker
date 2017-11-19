import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ClientApp from './ClientApp';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();



const App = () => (
    <MuiThemeProvider>
        <Layout />
    </MuiThemeProvider>
);

const Layout = () => (
    <div>
        <ClientApp />
    </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
