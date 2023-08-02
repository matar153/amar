import { View, Text, StyleSheet, FlatList, Platform, SafeAreaView, ScrollView, RefreshControl, Dimensions, Pressable, Modal, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import UserUpadteComp from "./UserUpdateComp";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import AddUserComp from "./AddUserComp";
import axios from "axios";
import { setUsers1 } from "../redux/users";

function UserComp({ navigation }) {
    const user1 = useSelector(state => state.setUser.user)
    const token = useSelector(state => state.settoken.token)
    const dispatch = useDispatch()
    const users = useSelector(state => state.setusers.users)
    const [modalFlag, setModalFlag] = useState(false)
    const [modalAddUser, setModaelAddUser] = useState(false)
    const [user, setUser] = useState({})
    const [refreshing, setRefreshing] = useState(false);
    let index = users.length - 1

    const onRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 2000);
    }

    const logOut = async () => {

        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('user')
        navigation.navigate('Login')
    }

    const getNewUser = async () => {
        const obj = { headers: { token: token.token } }
        const { data } = await axios.get('http://1141.226.241.38:3001/user', obj)
        // dispatch(setUsers1({ users: data[index+1] }))
    }

    const CheckLogOut = async () => {
        Alert.alert(
            'אתה רוצה להתנתק?',
            'תמיד תוכל להתחבר שוב', // <- this part is optional, you can pass an empty string
            [

                { text: 'כן', onPress: () => logOut() },
                { text: 'לא', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );

    }

    useEffect(() => {
        console.log(users)
    }, [])

    return (

        < View style={styles.container} >

            {Platform.OS === 'ios' ?
                <View style={styles.back}>

                    <Pressable
                        onPress={CheckLogOut}
                    >
                        <View style={{ width: 70, height: 50 }}>

                            <Text style={{ color: "white", paddingTop: 8, }}>התנתקות</Text>
                        </View>
                    </Pressable>
                    <Text style={{ color: "white", paddingTop: 8, paddingRight: 10 }}>{user1.user.username}</Text>


                </View > :
                <View style={styles.back}>

                    <Text style={{ color: "white", paddingTop: 8, paddingRight: 10 }}>{user1.user.username}</Text>
                    <Pressable
                        onPress={CheckLogOut}
                    >
                        <View style={{ width: 70, height: 50 }}>

                            <Text style={{ color: "white", paddingTop: 8, }}>התנתקות</Text>
                        </View>
                    </Pressable>


                </View >
            }



            <Pressable
                onPress={() => setModaelAddUser(!modalAddUser)}
            >
                <View style={{ marginTop: 35, marginBottom: 35, borderWidth: 2, padding: 8, borderRadius: 10, borderColor: "#5f19cd" }}>

                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>להוסיף משתמש</Text>

                </View>
                <Modal visible={modalAddUser} animationType="slide">
                    <AddUserComp modalFlag={(data) => setModaelAddUser(data)} />
                </Modal>
            </Pressable>

            <FlatList
                contentContainerStyle={{ paddingBottom: 200 }}
                data={users.filter(item => item.admin === false)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => setUser(item) & setModalFlag(!modalFlag)}
                    >

                        <View style={styles.userBox}>
                            <Text style={styles.txt}>שם: {item.username}</Text>
                            <Text style={styles.txt}>סיסמא: {item.password}</Text>
                            <Text style={styles.txt}>טלפון: {item.phone}</Text>
                            <Text style={styles.txt}>כתובת: {item.adress}</Text>
                        </View>

                    </Pressable>
                )}

            />
            <Modal visible={modalFlag} animationType="slide">
                <UserUpadteComp data={user} modalFlag={(data) => setModalFlag(data)} />
            </Modal>




        </View >

    )
}

export default UserComp;


const diviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        alignItems: "center",


    },
    userBox: {
        borderWidth: 2,
        borderColor: '#5f19cd',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,


    },
    txt: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 1,
        textAlign: 'right',
    },
    back: {
        alignItems: 'flex-start',
        paddingLeft: 10,
        backgroundColor: '#5f19cd',
        flexDirection: 'row',
        height: 50,
        paddingTop: 10,
        marginTop: diviceWidth < 393 ? 35 : 50,
        width: '100%',
        justifyContent: 'space-between',

    },
})