import { View, Text, StyleSheet, TextInput, Button, SafeAreaView, Platform, RefreshControl, Dimensions, Pressable, Modal, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import UserUpadteComp from "./UserUpdateComp";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import AddUserComp from "./AddUserComp";
import axios from "axios";
import { setUsers1 } from "../redux/users";
import { updateAsset1 } from '../redux/assets'
import { deleteAsset12 } from '../redux/assets'
import SelectDropdown from 'react-native-select-dropdown'
import user from "../redux/user";

function UpAsset(props, { navigation }) {
    const users = useSelector(state => state.setusers.users)
    const user1 = useSelector(state => state.setUser.user)
    const token = useSelector(state => state.settoken.token)
    const dispatch = useDispatch()
    const { updateUser1, DeleteUser1 } = require('../redux/users')
    const assets = useSelector(state => state.setassets.assets)

    const [asset, setAsset] = useState({ _id: props.data._id, rent: props.data.rent, funding: props.data.funding, adress: props.data.adress, size: props.data.size, furniture: props.data.furniture, expenses: props.data.expenses, image: props.data.image, rentF: props.data.rentF, contractImage: props.data.contractImage, expenses2: props.data.expenses2 })
    const [updatesuer2, setupdatesuer2] = useState({})
    
    const [updateUser2, setupdateUser2] = useState({})

    const updateasset = async () => {
        dispatch(updateAsset1({ assets: asset }))
        const obj = { headers: { token: token.token } }
        await axios.put(`http://141.226.241.38:3001/assets/${asset._id}`, asset, obj)
        props.modalFlag(false)
    }

    const updateUser = async (user) => {
        const obj = { headers: { token: token.token } }
        await axios.put(`http://141.226.241.38:3001/user/${user._id}`, user, obj)
    }

    const updateOwner = (e) => {
        const check = users.find(item => item.id.includes(asset._id))
        if (check === undefined) {
            const user = users.find(item => item._id === e)
            const user1 ={_id:user._id,admin:user.admin,adress:user.adress,id:user.id,password:user.password,phone:user.phone,username:user.username}
            user1.id = [...user.id, asset._id]
            dispatch(updateUser1({ users: user1, id: user._id }))
            updateUser(user1)
            console.log(user1)
        } else {
            Alert.alert(
                '  הנכס כבר נמצא בבעלות משתמש אחר',
            )
        }


    }

    const Checkaddwoner = async (e) => {
        Alert.alert(
            '  האם אתה בטוח שברצונך להוסיף נכנס  ?',
            '     ניתן להיסר בכל שלב  ', // <- this part is optional, you can pass an empty string
            [

                { text: 'כן', onPress: () => updateOwner(e) },
                { text: 'לא', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    const deleteId1 = async () => {
        const user = users.find(item => item.id.includes(asset._id))
        if (user !== undefined) {
            const user1 ={_id:user._id,admin:user.admin,adress:user.adress,id:user.id,password:user.password,phone:user.phone,username:user.username}
            user1.id = user.id.filter(item => item !== asset._id)
            dispatch(updateUser1({ users: user1, id: user._id }))
            updateUser(user1)
        }

    }

    const deleteId = async () => {
        Alert.alert(
            '  האם אתה בטוח שברצונך להסיר נכנס  ?',
            '       ניתן להוסיף שוב', // <- this part is optional, you can pass an empty string
            [

                { text: 'כן', onPress: () => deleteId1() },
                { text: 'לא', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );


    }

    const deleteAsset1 = async () => {
        dispatch(deleteAsset12({ id: asset._id }))
        const obj = { headers: { token: token.token } }
        await axios.delete(`http://141.226.241.38:3001/assets/${asset._id}`, obj)
        props.modalFlag(false)

    }

    const deleteAsset = async () => {
        Alert.alert(
            '  האם אתה בטוח שברצונך למחוק נכנס  ?',
            '       ניתן ליצור נכנס חדש', // <- this part is optional, you can pass an empty string
            [

                { text: 'כן', onPress: () => deleteAsset1() },
                { text: 'לא', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    const updateassets = (e) => {
        const newasset = { ...assets.find(item => item._id === props.data._id), adress: e }
    }

    useEffect(() => {
    }, [asset])

    return (

        < View style={styles.container} >

            <SafeAreaView>

                {Platform.OS === 'ios' ? <View style={styles.back}>
                    <TouchableOpacity onPress={() => props.modalFlag(false)}>
                        <IconAntDesign name="arrowleft" size={40} color={'white'} />
                    </TouchableOpacity>

                    <Text style={{ color: "white", paddingTop: 8, paddingLeft: 10, paddingRight: 10 }}>{user1.user.username}</Text>

                </View > : <View style={styles.back}>
                    <Text style={{ color: "white", paddingTop: 8, paddingLeft: 10, paddingRight: 10 }}>{user1.user.username}</Text>
                    <TouchableOpacity onPress={() => props.modalFlag(false)}>
                        <IconAntDesign name="arrowleft" size={40} color={'white'} />
                    </TouchableOpacity>

                </View >


                }
            </SafeAreaView>

            <View style={{ paddingTop: 40, alignItems: "center" }}>
                <Text style={styles.txt}>כתובת</Text>
                <TextInput
                    style={styles.input}

                    onChangeText={(e) => setAsset({ ...asset, adress: e })}

                />
            </View>

            <View style={{ paddingTop: 20, alignItems: "center" }}>
                <Text style={styles.txt}>שכירות</Text>
                <TextInput
                    style={styles.input}

                    onChangeText={(e) => setAsset({ ...asset, rent: +e })}
                    keyboardType="numeric"
                />
            </View>

            <View style={{ paddingTop: 20, alignItems: "center" }}>
                <Text style={styles.txt}>גודל</Text>
                <TextInput
                    style={styles.input}

                    onChangeText={(e) => setAsset({ ...asset, size: +e })}
                    keyboardType="numeric"
                />
            </View>

            <View style={{ paddingTop: 20, alignItems: "center" }}>
                <Text style={styles.txt}>תאריך חוזה</Text>
                <TextInput
                    style={styles.input}

                    onChangeText={(e) => setAsset({ ...asset, rentF: e })}

                />
            </View>

            <View style={{ paddingTop: 20, alignItems: "center" }}>
                <Text style={styles.txt}> להגידר בעל נכס</Text>
                <View style={{ paddingTop: 8, flexDirection: "row" }}>
                   
                    <SelectDropdown
                        buttonStyle={{ width: 100, height: 40, backgroundColor: 'white', borderRadius: 10, marginBottom: 10, borderWidth: 2, borderColor: "#5f19cd" }}
                        buttonTextStyle={{ color: 'black', fontSize: 18 }}
                        rowStyle={{ backgroundColor: 'white', borderColor: '#5f19cd', borderWidth: 2, }}
                        defaultButtonText={users[0].username}
                        data={users}
                        onSelect={(selectedItem, index) => {
                            Checkaddwoner(selectedItem._id)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem.username
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item.username
                        }}

                    />
                        <Pressable 
                        onPress={() => deleteId()}
                        >
                    <View style={styles.buttom1}>
                        <Text>הסר נכס</Text>

                    </View>
                        </Pressable>
                     {/* <Button
                        title="הסר נכס"
                        onPress={() => deleteId()}
                    /> */}
                </View>
            </View>

            <View style={{ flexDirection: "row", }}>
                <View style={{ marginRight: 6 }}>

                    <Pressable
                        onPress={() => updateasset()}
                    >

                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.buttom}>עדכן</Text>
                        </View>
                    </Pressable>
                </View>

                <View style={{ marginRight: 6 }}>

                    <Pressable
                        onPress={() => deleteAsset()}
                    >

                        <View style={styles.buttom}>
                            <Text style={{color:"red", alignSelf:"center",}}>למחוק </Text>
                        </View>
                    </Pressable>
                </View>
            </View>



        </View >

    )
}

export default UpAsset;


const diviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        alignItems: "center",


    },
    back: {
        paddingTop: 30,
        alignItems: 'flex-start',
        paddingLeft: 10,
        backgroundColor: '#5f19cd',
        flexDirection: 'row',
        height: 50,
        paddingTop: 10,
        width: diviceWidth,
        justifyContent: 'space-between',
    },
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
    buttom1: {

        color: '#5f19cd',
        fontWeight: 'bold',
        borderRadius: 10,
        width: 100,
        borderWidth: 2,
        textAlign: 'center',
        borderColor: '#5f19cd',
        padding: 8,
        marginLeft: 10,
        alignItems: "center",
        
        



    },
})


