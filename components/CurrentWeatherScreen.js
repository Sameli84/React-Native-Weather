import React, { useState } from "react";
import { Button, View, ToastAndroid } from "react-native";
import WeatherInfo from "./WeatherInfo";
import Header from './Header';

const showToastWithGravity = (toast) => {
    ToastAndroid.showWithGravity(
      toast,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

const CurreWeatherScreen = ({ navigation }) => {
    const [weatherData, setWeatherData] = useState({
        city: 'Tampere',
        description: 51,
        temperature: -6,
        windSpeed: 4
    })

    const getWeatherData = () => {
        try {
            fetch('https://api.open-meteo.com/v1/forecast?latitude=61.5066666&longitude=23.7966666&current_weather=true')
            .then((response) => response.json())
            .then(data => {
                const weatherObj = {
                    weather: data.current_weather.weathercode,
                    temp: data.current_weather.temperature,
                    wind: (data.current_weather.windspeed / 3.6).toFixed(1)
                }
                setWeatherData({
                    city: 'Tampere',
                    description: weatherObj.weather,
                    temperature: weatherObj.temp,
                    windSpeed: weatherObj.wind
                })
            })
        } catch (error) {
            showToastWithGravity(error)
        }

    }

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <Header style={{ flex: 1 }} cityName={weatherData.city}></Header>
            <View style={{ flex: 5 }}>
                <WeatherInfo temperature={weatherData.temperature} wind={weatherData.windSpeed} description={weatherData.description} />
            </View>
            <Button style={{ flex: 2 }} title="Update" onPress={() => getWeatherData()} />
        </View>
    );
}

export default CurreWeatherScreen;