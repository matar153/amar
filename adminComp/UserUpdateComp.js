import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity, Dimensions, Pressable, Platform, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
const { updateUser1, DeleteUser1 } = require('../redux/users')
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";


function UserUpdateComp(props) {
    const dispatch = useDispatch()
    const users = useSelector(state => state.setusers.users)
    const token = useSelector(state => state.settoken.token)


    const [user, setUser] = useState({ phone: props.data.phone, adress: props.data.adress, username: props.data.username, password: props.data.password, id: [], admin: props.data.admin, _id: props.data._id })

    const updateUser = async () => {
        dispatch(updateUser1({ users: user, id: props.data._id }))
        const obj = { headers: { token: token.token } }
        await axios.put(`http://141.226.241.38:3001/user/${props.data._id}`, user, obj)
        props.modalFlag(false)

    }

    const DeleteUser= async () => {
        dispatch(DeleteUser1({  id: props.data._id }))

        const obj = { headers: { token: token.token } }
        await axios.delete(`http://141.226.241.38:3001/user/${props.data._id}`, obj)
        props.modalFlag(false)

    }

    const CheckdeleteUser = async () => {
        Alert.alert(
            '  האם אתה בטוח שברצונך למחוק את המשתמש?',
            '   כל המידע של המשתמש ימחק', // <- this part is optional, you can pass an empty string
            [

                { text: 'כן', onPress: () => DeleteUser() },
                { text: 'לא', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    useEffect(() => {
    }, [user])

    return (
        <View style={styles.container}>
            <SafeAreaView>

                <View style={styles.back}>
                    <TouchableOpacity onPress={() => props.modalFlag(false)}>
                        <IconAntDesign name="arrowleft" size={40} color={'white'} />
                    </TouchableOpacity>

                </View >
            </SafeAreaView>

            <View style={{ marginTop: 80 }}>
                <Text style={styles.txt1}>עריכת משתמש:</Text>
            </View>

            <View style={{ marginTop: 30, }}>

                <View style={{ alignItems: "center" }}>
                    <Text style={styles.txt}>
                        שם:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={props.data.username}
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
                        placeholder={props.data.password}
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
                        placeholder={props.data.phone}
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
                        placeholder={props.data.adress}
                        onChangeText={text => setUser({ ...user, adress: text })}
                        autoCapitalize='none'

                    />


                </View>
                <View style={{ flexDirection: "row", }}>
                    <View style={{ marginRight: 6 }}>

                        <Pressable
                            onPress={() => updateUser()}
                        >

                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.buttom}>עדכן</Text>
                            </View>
                        </Pressable>
                    </View>

                    <Pressable
                        onPress={() => CheckdeleteUser()}
                    >

                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.buttom}>מחק</Text>
                        </View>
                    </Pressable>
                </View>

            </View>

        </View>
    )

}

export default UserUpdateComp;

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

    },
    txt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5f19cd',
        paddingLeft: 10,
        textAlign: 'right',
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
    txt1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        paddingLeft: 10,
        textAlign: 'right',
    },
})