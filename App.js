import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import CurreWeatherScreen from "./components/CurrentWeatherScreen";
import WeatherForecastScreen from "./components/WeatherForecastScreen";
import SettingScreen from "./components/SettingScreen";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Current weather" component={CurreWeatherScreen} />
        <Drawer.Screen name="Forecast" component={WeatherForecastScreen} />
        <Drawer.Screen name="Settings" component={SettingScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App