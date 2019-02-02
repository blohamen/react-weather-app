import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import WeatherCard from './weather-card';
import weatherConstants from './weather-card/constants';

class WeatherComponent extends Component {

  state = {
    isLoading: false,
    weather: null,
    text: '',
  }

  getWeather = async (cityName) => {
    try {
      const key = '1007139b194b3475fed211c7cf8876a5';
      const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${key}`
      const weather = await fetch(weatherUrl);
      const weatherJSON = await weather.json();
      this.setState({
        weather: weatherJSON,
        isLoading: false,
      });
    } catch (e) {
      console.warn(e);
      this.setState({isLoading: false});
    }
  }

  handleTextInput = e => this.setState({text: e.target.value})

  handleSubmitForm = e => e.preventDefault()

  handleOnClickBtn = () => {
    this.setState({isLoading: true});
    this.getWeather(this.state.text)
  }
  
  renderForm = () => (
    <form className='form' onSubmit={this.handleSubmitForm}>
      <TextField 
        value={this.state.text}
        onChange={this.handleTextInput} 
        hintText='Type city...' 
        floatingLabelText="City"
        style={{
          marginBottom: 10,
        }}
      />
      <RaisedButton onClick={this.handleOnClickBtn} label='Search' />
    </form>
  )
  
  renderSpinner = () => (
    <CircularProgress />
  )
 
  render() {
    console.log(this.state.weather);
    return (
      <div 
        className='container'
        style={{
         backgroundColor: this.state.weather 
              ? weatherConstants[this.state.weather.weather[0].main].backgroundColor
              : '#D1C4E9'
         }}
      >
        {this.state.isLoading 
          ? this.renderSpinner()
          : this.renderForm()
        }
        {this.state.weather && <WeatherCard weather={this.state.weather} />}
      </div>
    );
  }
}

export default WeatherComponent;
