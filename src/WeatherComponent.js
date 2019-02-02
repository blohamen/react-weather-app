import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import './App.css';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import WeatherCard from './weather-card';
import weatherConstants from './weather-card/constants';

class WeatherComponent extends Component {

  state = {
    isLoading: false,
    weather: null,
    text: '',
    error: false,
  }

  getWeather = async (cityName) => {
    const key = '1007139b194b3475fed211c7cf8876a5'; // api key openweathermap
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${key}`
    const weather = await fetch(weatherUrl);
    const weatherJSON = await weather.json();
    if (weather.status === 200) {
      
      this.setState({
        weather: weatherJSON,
        isLoading: false,
      });
    } else {
      this.setState({
        isLoading: false,
        error: weatherJSON,
      })
    }
    
  }

  handleTextInput = e => this.setState({text: e.target.value})

  handleSubmitForm = e => e.preventDefault()

  handleOnClickBtn = () => {
    this.setState({isLoading: true});
    this.getWeather(this.state.text)
  }

  resetError = () => this.setState({error: false})
  
  renderForm = () => (
    <form className='form flex' onSubmit={this.handleSubmitForm}>
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

  renderErrorPopup = () => {
    const action = [
      <FlatButton
        label='OK'
        primary
        onClick={this.resetError}
      />
    ];

     return (
      <Dialog
        actions={action}
        open={!!this.state.error}
        modal
        onRequestClose={this.resetError}
        contentStyle={{
          width: '50%',
          maxWidth: '100%',
        }}
      >
        {this.state.error.message}
      </Dialog>
    )
}
 
  render() {
    return (
      <div 
        className='container flex'
        style={{
         backgroundColor: (this.state.weather && !this.state.error)
              ? weatherConstants[this.state.weather.weather[0].main].backgroundColor
              : '#D1C4E9'
         }}
      >
        {this.state.isLoading 
          ? this.renderSpinner()
          : this.renderForm()
        }
        {this.state.weather && <WeatherCard weather={this.state.weather} />}
        {this.renderErrorPopup()}
      </div>
    );
  }
}

export default WeatherComponent;
