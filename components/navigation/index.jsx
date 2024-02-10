import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../../screen/WelcomeScreen';
import ActivationScreen from '../../screen/ActivationScreen';
import ReactivationScreen from '../../screen/ReactivationScreen';
import Home from '../../screen/Home';
import HelpAndSupport from '../../screen/HelpAndSupport';
import Settings from '../../screen/Settings';
import tw from 'twrnc';
import Password from '../../screen/Password';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeImage from "../../assets/images/home.png"
import SettingsImage from "../../assets/images/settings.png"
import SupportImage from "../../assets/images/support.png"
import SecondSettingsImage from "../../assets/images/secondSettings.png"
import SecondSupportImage from "../../assets/images/secondSupport.png"
import SecondHomeImage from "../../assets/images/secondHome.png"
import FAQ from '../../screen/FAQ';
import EToken from '../../screen/EToken';
import LinkApp from '../../screen/LinkApp';
import TransactionPin from '../../screen/TransactionPin';
import EnterToken from '../../screen/EnterToken';
import TokenGenerate from '../../screen/TokenGenerate';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AppNavigation = () => {
    return (

        <NavigationContainer>
            <Stack.Navigator initialRouteName="TokenGenerate" screenOptions={{ headerShown: false }} >
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Activation" component={ActivationScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Reactivation" component={ReactivationScreen} options={{ headerShown: false }} />
                <Stack.Screen name="TokenGenerate" component={TokenGenerate} options={{ headerShown: false }} />
                <Stack.Screen name="Link-App" component={LinkApp} options={{
                    headerShown: true,
                    title: 'Link your Beels e-token',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                    },
                    headerShadowVisible: false,
                }} />
                 <Stack.Screen name="EnterToken" component={EnterToken} options={{
                    headerShown: true,
                    title: 'Enter E-Token',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                    },
                    headerShadowVisible: false,
                }} />
                <Stack.Screen name="TransactionPin" component={TransactionPin} options={{
                    headerShown: true,
                    title: 'Enter your Pin',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                    },
                    headerShadowVisible: false,
                }} />
                <Stack.Screen name="E-Token" component={EToken} options={{
                    headerShown: true,
                    title: 'Activate your e-token',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                    },
                    headerShadowVisible: false,
                }} />
                <Stack.Screen name="FAQ" component={FAQ} options={{ headerShown: false }} />
                <Stack.Screen name="Password" component={Password} options={{ headerShown: false }} />
                <Stack.Screen name="Bottom" component={Bottom} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export function Bottom() {
    return (
        <>
            <Tab.Navigator initialRouteName="Home" screenOptions={{
                tabBarStyle: { backgroundColor: 'transparent', elevation: 0, borderTopWidth: 0, position: 'absolute', height: 70 },

            }}>

                <Tab.Screen name="HelpAndSupport"
                    component={HelpAndSupport}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color }) => (
                            <View style={[styles.container, { backgroundColor: focused ? '#082C25' : 'transparent' }]}>
                                <Image source={focused ? SupportImage : SecondSupportImage} />
                                <Text style={[styles.firstText, { color: focused ? '#B6F485' : '#B2BEBB' }]}>Support</Text>
                            </View>
                        ),
                        tabBarLabel: ''
                    }}
                />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color }) => (
                            <View style={[styles.container, { backgroundColor: focused ? '#082C25' : 'transparent' }]}>
                                <Image source={focused ? HomeImage : SecondHomeImage} />
                                <Text style={[styles.firstText, { color: focused ? '#B6F485' : '#B2BEBB' }]}>Home</Text>
                            </View>
                        ),
                        tabBarLabel: '',
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color }) => (
                            <View style={[styles.container, { backgroundColor: focused ? '#082C25' : 'transparent' }]}>
                                <Image source={focused ? SettingsImage : SecondSettingsImage} />
                                <Text style={[styles.firstText, { color: focused ? '#B6F485' : '#B2BEBB' }]}>Setting</Text>
                            </View>
                        ),
                        tabBarLabel: ''
                    }}
                />
            </Tab.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#082C25',
        borderRadius: 28,
        height: 45,
        paddingHorizontal: 15
    },
    firstText: {
        fontSize: 10,
        fontWeight: "600",
        fontStyle: "normal",
        textAlign: 'center',
    }
})

export default AppNavigation