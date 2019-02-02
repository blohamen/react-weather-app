import React from 'react';
import ReactDOM from 'react-dom';
import WeatherComponent from './WeatherComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const App = () => (
    <MuiThemeProvider>
        <WeatherComponent/>
    </MuiThemeProvider>
)

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
