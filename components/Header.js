import { Text, View, StyleSheet } from 'react-native'

const Header = ({ cityName }) => {
    return (
        <View style={styles.headerViewStyle}>
            <Text style={styles.cityNameTextStyle}>{cityName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cityNameTextStyle: {
        fontSize: 40, "@media (min-width: 10)": {
            fontSize: 40,
        }, color: 'black', alignSelf: 'center', marginTop: '30%'
    },
    headerViewStyle: {
        backgroundColor: 'lightblue'
    }
});

export default Header;