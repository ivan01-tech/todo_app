/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {NavigationContainer} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
// import {StyleSheet} from 'react-native';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {loadData} from './src/utils/loadDatabase';
import UnCompleted from './src/screens/UnCompleted';
import Completed from './src/screens/Completed';
import Splash from './src/screens/Splash';
import {colors} from './src/styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export type RootListParams = {
  Home: undefined;
  Splash: undefined;
};

export type HomeStackType = {
  Completed: undefined;
  UnCompleted: undefined;
};

// const Drawer = createDrawerNavigator<RootListParams>();
const RootStack = createNativeStackNavigator<RootListParams>();
export type RootStackType = NativeStackScreenProps<RootListParams>;
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Completed"
      screenOptions={({navigation, route}) => ({
        headerStyle: {
          backgroundColor: colors.first,
        },
        // tabBarLabel(props) {

        // },
        headerTintColor: '#eee',
        tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
        headerTitleAlign: 'center',
        tabBarIcon({color, focused}) {
          let iconName = '';
          console.log('first draw : ' + route.name);
          switch (route.name) {
            case 'UnCompleted':
              iconName = 'times';
              break;
            case 'Completed':
              iconName = 'check-circle';
              break;
            default:
              iconName = 'check-circle';
              break;
          }
          return (
            <FontAwesome5
              color={focused ? colors.first : colors.forth}
              size={focused ? 30 : 20}
              name={iconName}
            />
          );
        },
      })}>
      <Tab.Screen options={{}} name="Completed" component={Completed} />
      <Tab.Screen name="UnCompleted" component={UnCompleted} />
      {/* <Tab.Screen name="Home" component={Home} /> */}
    </Tab.Navigator>
  );
}

function App(): JSX.Element {
  // to connect to the database
  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={({route, navigation}) => ({headerShown: false})}
        initialRouteName="Splash">
        <RootStack.Screen name="Home" component={BottomTabs} />
        <RootStack.Screen name="Splash" component={Splash} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     fontFamily: 'BungeeSpice-Regular',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
