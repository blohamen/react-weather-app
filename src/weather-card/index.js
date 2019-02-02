import React from 'react';
import './style.css';
import FontIcon from 'material-ui/FontIcon';
import weatherTypeConstants from './constants';

const renderSection = (title, value) => (
    <div className='weathercard-section-container flex'>
        <span className='weathercard-section-title'>{title}</span>
        <span className='weathercard-section-value'>{value}</span>
    </div>
)


export default function WeatherCard({weather}) {
    const {name, main: {humidity, temp}, sys: {country}} = weather;
    const weatherType = weather.weather[0].main;
    return (
        <div className='weathercard-container flex'>
            <div className='weathercard-icon-container'>
                <FontIcon
                    {...weatherTypeConstants[weatherType]}
                 />
            </div>

            <div 
                className='weathercard-infoblock flex'
                style={{ width: 240 }}
            >
                {renderSection('Temperature', `${temp > 0 ? '+' : ''}${temp}`)} 
                {renderSection('Humidity', `${humidity}%`)}
            </div>

            <div 
                className='weathercard-infoblock flex'
                style={{
                    width: 160,
                    paddingLeft: 10,
                    borderRight: 0,
                }}
            >
                {renderSection('City', `${name},${country}`)}
                {renderSection('Weather type', weatherType)}
            </div>
        </div>
    )
} 