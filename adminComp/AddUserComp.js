import { View, Text, StyleSheet, Alert, TextInput, SafeAreaView, TouchableOpacity, Dimensions, Pressable, Platform } from "react-native";
import React, { useState } from "react";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { setUsers1 } from '../redux/users'
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";


function AddUserComp(props) {
    const token = useSelector(state => state.settoken.token)
    const dispatch = useDispatch()
    const [user, setUser] = useState({ phone: "", adress: "", username: "", password: "", id: [], admin: false })

    const addUser = async () => {
        if (user.username == "" || user.password == "" || user.phone == "" || user.adress == "") {
            Alert.alert("אנא מלא את כל השדות")
            return
        }
        const obj = { headers: { token: token.token } }
        const { data } = await axios.post(`http://141.226.241.38:3001/user`, user, obj)
        dispatch(setUsers1({ users: data }))
        props.modalFlag(false)
    }

    

    return (
        <View style={styles.container}>
            <SafeAreaView>

                <View style={styles.back}>
                    <TouchableOpacity onPress={() => props.modalFlag(false)}>
                        <IconAntDesign name="arrowleft" size={40} color={'white'} />
                    </TouchableOpacity>

                </View >
            </SafeAreaView>


            <View style={{ alignItems: "center" }}>
                <Text style={styles.txt}>
                    שם:
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setUser({ ...user, username: text })}
                    autoCapitalize='none'
                />
            </View>
            <View style={{ alignItems: "center" }}>

                <Text style={styles.txt}>
                    סיסמא:
                </Text>

                <TextInput
                    style={styles.input}
                    onChangeText={text => setUser({ ...user, password: text })}
                    autoCapitalize='none'

                />


            </View>

            <View style={{ alignItems: "center" }}>

                <Text style={styles.txt}>
                    טלפון:
                </Text>

                <TextInput
                    style={styles.input}
                    onChangeText={text => setUser({ ...user, phone: text })}
                    autoCapitalize='none'

                />


            </View>

            <View style={{ alignItems: "center" }}>

                <Text style={styles.txt}>
                    כתובת:
                </Text>

                <TextInput
                    style={styles.input}
                    onChangeText={text => setUser({ ...user, adress: text })}
                    autoCapitalize='none'

                />


            </View>
            <Pressable
                onPress={() => addUser()}
            >

                <View style={{ alignItems: "center" }}>
                    <Text style={styles.buttom}>להוסיף</Text>
                </View>
            </Pressable>

        </View>


    )
}


export default AddUserComp;


const diviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    back: {
        paddingTop: 30,
        alignItems: Platform.OS === 'ios' ? 'flex-start' : 'flex-end',
        paddingLeft: 10,
        backgroundColor: '#5f19cd',
        flexDirection: Platform.OS === 'ios' ? 'row' : 'column',
        height: 50,
        paddingTop: 10,
        width: diviceWidth,
        marginBottom: 40,
    },
    input: {
        borderWidth: 2,
        borderColor: '#5f19cd',
        borderRadius: 10,
        width: 250,
        padding: 8,
        marginTop: 10,
        marginBottom: 16,
        textAlign: 'right',
        paddingRight: 10,
        fontWeight: 'bold',
    },
    txt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5f19cd',
        paddingLeft: 10,
        textAlign: 'right',
    },
    buttom: {

        color: '#5f19cd',
        fontSize: 20,
        fontWeight: 'bold',
        borderRadius: 10,
        width: 120,
        padding: 8,
        marginTop: 10,
        borderWidth: 2,
        textAlign: 'center',


    },
})