import { View, Text, Button, FlatList, SafeAreaView, ToastAndroid } from "react-native";
import { useState, useEffect } from "react";
import WeatherListItem from "./WeatherListItem";
import * as Location from "expo-location";
import moment from "moment";

const showToastWithGravity = (toast) => {
  ToastAndroid.showWithGravity(
    toast,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
};

const WeatherForecastScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
  });

  let itemList = [];

  const weather = [
    { time: 2, weathercode: 3, temperature: 4, windspeed: 8 },
    { time: 2, weathercode: 3, temperature: 4, windspeed: 8 },
  ];

  const [weatherForecast, setWeatherForecast] = useState({ weather });

  useEffect(() => {
    fetchWeatherForecast();
  }, []);

  const fetchWeatherForecast = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    try {
      fetch(
        `https://geocode.maps.co/reverse?lat=${location.coords.latitude}&lon=${location.coords.longitude}`
      )
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    } catch (error) {
      showToastWithGravity(error)
    }
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&hourly=temperature_2m,weathercode,windspeed_10m&windspeed_unit=ms`
      );
      const jsonWeatherObject = await response.json();
      setWeatherForecast(() => {
        for (
          let index = 0;
          index < jsonWeatherObject.hourly.temperature_2m.length;
          index++
        ) {
          itemList.push({
            time: jsonWeatherObject.hourly.time[index],
            weathercode: jsonWeatherObject.hourly.weathercode[index],
            temperature: jsonWeatherObject.hourly.temperature_2m[index],
            windspeed: jsonWeatherObject.hourly.windspeed_10m[index],
          });
        }
        return itemList;
      });
    } catch (error) {
      showToastWithGravity(error)
    }
  };

  return (
    <View>
      <Text>
        Sijaintisi:{" "}
        {isLoading ? "Haetaan..." : JSON.stringify(data.address.country)}{" "}
        {isLoading ? "" : JSON.stringify(data.address.city)}{" "}
        {isLoading ? "" : JSON.stringify(data.address.suburb)}
      </Text>
      <FlatList
        data={weatherForecast}
        renderItem={({ item }) => {
          if (moment(item.time) > moment.now()) {
            return (
              <WeatherListItem
                time={moment(item.time).format("ddd, ll, HH:mm")}
                description={item.weathercode}
                temperature={item.temperature}
                windspeed={item.windspeed}
              ></WeatherListItem>
            );
          } else {
            return <Text style={{ height: 1 }}></Text>;
          }
        }}
      />
    </View>
  );
};

export default WeatherForecastScreen;
