import { StyleSheet, Text, View, Button, Image, TextInput, Pressable, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser1 } from '../redux/user';
import { settoken1 } from '../redux/token'
import { setAssets1 } from '../redux/assets'
import { setfilterAssets1 } from '../redux/filterAssets'
import AsyncStorage from "@react-native-async-storage/async-storage";



function LoginComp({ navigation }) {
    const filterAssets2 = useSelector(state => state.setfilterAssets.filterAssets)
    const assets = useSelector(state => state.setassets.assets)
    const token2 = useSelector(state => state.settoken.token)
    const user2 = useSelector(state => state.setUser.user)


    const user1 = useSelector(state => state.setUser.user)
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()

    const [user, setUser] = useState([])
    const [userLogin, setUsername] = useState({ username1: "", userpass1: "" })
    const [token, setToken] = useState({})

    const checkLogin = async () => {

        const token = await AsyncStorage.getItem('token')
        const obj = { headers: { token: token } }
        const { data: checkToken } = await axios.get('http://141.226.241.38:3001/checkToken', obj);
        console.log(checkToken);
        if (checkToken === 'ok') {
            const user = await AsyncStorage.getItem('user')
            const userid = JSON.parse(user)

            const obj = { headers: { token: token } }
            const { data } = await axios.get('http://141.226.241.38:3001/user', obj)
            const finduser = data.find(item => item._id === userid._id)
            console.log(finduser);

            if (token !== null && user !== null) {
                const token1 = { token: token, userlogin: finduser}
                renderNav(token1)
            }
        }

    }

    const renderNav = (token1) => {
        getAssets(token1)
        dispatch(settoken1({ token: token1.token }))

        dispatch(setUser1({ user: token1.userlogin }))
        localData(token1)


        if (token1.userlogin.admin) {
            navigation.navigate('navbar',)
            return
        }
        navigation.navigate('Assets',)
    }

    const login = async () => {
        const { data: token } = await axios.post('http://141.226.241.38:3001/login', userLogin);
        setToken(token)
        if (token.token !== undefined) {
            renderNav(token)
        }
        else {
            setShow(show => true)
        }
    }


    const getAssets = async (token1) => {
        const obj = { headers: { token: token1.token } }
        const { data } = await axios.get('http://141.226.241.38:3001/assets', obj)
        if (assets.length > 0) {
            token1.userlogin.id.forEach((id, index) => {
                const filterAsset1 = data.find(item => item._id === id)
                dispatch(setfilterAssets1(filterAsset1))

            });
        } else {
            dispatch(setAssets1(data))
            token1.userlogin.id.forEach((id, index) => {
                const filterAsset1 = data.find(item => item._id === id)
                dispatch(setfilterAssets1(filterAsset1))

            });
        }


    }

    const localData = async (token) => {
        try {
            await AsyncStorage.setItem('token', token.token)
            await AsyncStorage.setItem('user', JSON.stringify(token.userlogin))
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {

        checkLogin()
    }, [])

    return (

        <View style={styles.container}>
            <View style={{ maxHeight: 100 }}>

                <Image style={styles.image} source={{ uri: `http://141.226.241.38:3001/30.3.2023-amar 3-04.png` }} />
            </View>

            <View style={{ padding: 100, alignItems: "center" }}>

                <Text>שם משתמש</Text>
                <TextInput
                    style={styles.input}
                    placeholder='שם משתמש'
                    onChangeText={text => setUsername({ ...userLogin, username1: text })}
                    autoCapitalize='none'

                />
                <Text>סיסמא</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder='   סיסמא'
                    onChangeText={text => setUsername({ ...userLogin, userpass1: text })}


                />
                <View>
                    <Text style={{ color: "red", }}>{show ? "שם משתמש או סיסמא שגוים" : null}   </Text>
                </View>


                <View style={styles.pressItem}>
                    <Pressable
                        android_ripple={{ color: '#5f19cd' }}
                        onPress={() => login()}
                    >

                        <Text style={{ color: '#5f19cd' }}>התחברות</Text>

                    </Pressable>
                </View>
            </View>

        </View>
    )
}


export default LoginComp

const diviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({



    input: {
        borderWidth: 2,
        borderColor: '#5f19cd',
        borderRadius: 10,
        width: 250,
        padding: 8,
        marginTop: 10,
        marginBottom: 16,
        textAlign: 'right'
    },
    container: {
        paddingTop: diviceWidth < 393 ? 120 : 180,
        alignItems: 'center',
    },
    pressItem: {
        borderWidth: 2,
        borderColor: '#5f19cd',
        borderRadius: 10,
        width: 100,
        alignItems: 'center',
        padding: 4,
        marginTop: 10,
    },
    image: {
        width: 200,
        height: 200,

    }
})
