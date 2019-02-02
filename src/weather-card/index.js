import React from 'react';
import './style.css';
import FontIcon from 'material-ui/FontIcon';
import weatherTypeConstants from './constants';

const renderSection = (title, value) => (
    <div style={{
        flexDirection: 'column',
        display: 'inherit',
        alignItems: 'center',
    }}>
        <span style={{
            fontFamily: 'Roboto',
            opacity: 0.5,
            fontSize: 20,
        }}>{title}</span>
        <span style={{
            fontFamily: 'Roboto',
            fontSize: 25,
        }}>{value}</span>
    </div>
)


export default function WeatherCard({weather}) {
    const {name, main: {humidity, temp}, sys: {country}} = weather;
    const weatherType = weather.weather[0].main;
    return (
        <div className='weathercard-container'>
            <div style={{
                display: 'inline-block',
                maxWidth: '100%',
                width: 160,
            }}>
                <FontIcon
                    {...weatherTypeConstants[weatherType]}
                 />
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: 240,
                maxWidth: '100%',
                alignItems: 'center',
                justifyContent: 'space-around',
                borderRight: '1px #BDBDBD solid'
            }}>
                {renderSection('Temperature', `${temp > 0 ? '+' : ''}${temp}`)} 
                {renderSection('Humidity', `${humidity}%`)}
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: 160,
                maxWidth: '100%',
                alignItems: 'center',
                justifyContent: 'space-around',
                paddingLeft: 10,
            }}>
                {renderSection('City', `${name},${country}`)}
                {renderSection('Weather type', weatherType)}
            </div>
        </div>
    )
} 