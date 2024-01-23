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
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import UnCompleted from './src/screens/UnCompleted';
import Completed from './src/screens/Completed';
import Splash from './src/screens/Splash';
import {colors} from './src/styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NewTask from './src/screens/NewTask';
import {Todo} from './src/types/table.typing';
import UpdateTodo from './src/screens/UpdateTodo';
import Camera from './src/screens/Camera';

export type RootListParams = {
  Home: undefined;
  Splash: undefined;
  NewTask: undefined;
  UpdateTodo: Todo;
  Camera: undefined;
};

export type HomeStackType = {
  Completed: undefined;
  UnCompleted: undefined;
};

// const Drawer = createDrawerNavigator<RootListParams>();
const RootStack = createNativeStackNavigator<RootListParams>();
export type RootStackType = NativeStackScreenProps<RootListParams>;
export type UpdateTaskType = NativeStackScreenProps<
  RootListParams,
  'UpdateTodo'
>;
const Tab = createBottomTabNavigator<HomeStackType>();
export type BottomType = BottomTabNavigationProp<HomeStackType>;

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="UnCompleted"
      screenOptions={({navigation, route}) => ({
        headerStyle: {
          backgroundColor: colors.first,
        },

        headerTintColor: '#eee',
        tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
        headerTitleAlign: 'center',
        tabBarIcon({color, focused}) {
          let iconName = '';
          switch (route.name) {
            case 'UnCompleted':
              iconName = 'clipboard-list';
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
              size={focused ? 20 : 15}
              name={iconName}
            />
          );
        },
      })}>
      <Tab.Screen
        name="UnCompleted"
        options={{tabBarLabel: 'To Do'}}
        component={UnCompleted}
      />
      <Tab.Screen name="Completed" component={Completed} />
    </Tab.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={({route, navigation}) => ({})}
        initialRouteName="Splash">
        <RootStack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={BottomTabs}
        />
        <RootStack.Screen
          options={{
            headerShown: false,
          }}
          name="Splash"
          component={Splash}
        />
        <RootStack.Screen name="NewTask" component={NewTask} />
        <RootStack.Screen name="UpdateTodo" component={UpdateTodo} />
        <RootStack.Screen name="Camera" component={Camera} />
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
