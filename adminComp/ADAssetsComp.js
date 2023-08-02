import { View, Text, StyleSheet, FlatList, Image, Platform, Modal, Dimensions, Pressable, Alert, SafeAreaView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import React, { useState, useEffect } from 'react';
import { setUsers1, deleteImage1 } from '../redux/users'
import UpdateAssetComp from './UpdateAssetComp'

function ADAssetsComp({ navigation }) {
    const assets = useSelector(state => state.setassets.assets)
    const user = useSelector(state => state.setUser.user)
    const [flag1, setFlag1] = useState(false)
    const users = useSelector(state => state.setusers.users)
    const token = useSelector(state => state.settoken.token)
    const dispatch = useDispatch()
    const [assetOwner, setAssetOwner] = useState([])
    const [item, setItem] = useState({})
    const [refreshing, setRefreshing] = useState(false);



    const logOut = async () => {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('user')
        navigation.navigate('Login')
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

    const assetUpdate = (item) => {
        setItem(item)
        setFlag1(true)
    }


    // filter the users by asset
    const filter = (id1) => {
        if (users.length > 1) {
            const filter = users.find(item => item.id.find(i => i === id1) === id1)
            if (filter) {

                return filter.username
            }
        }
        return 'לא  הוגדר'

    }

    const getAllUsers = async () => {
        const obj = { headers: { token: token.token } }
        const { data } = await axios.get('http://141.226.241.38:3001/user', obj)
        data.forEach(el => {
            dispatch(setUsers1({ users: el }))
        });
    }




    useEffect(() => {
        getAllUsers()
    }, [])

    return (


        <View style={styles.container}>

            <SafeAreaView>
                {Platform.OS === 'ios' ? <View style={styles.back}>
                <Pressable
                        onPress={CheckLogOut}
                    >
                        <View style={{ width: 70, height: 50 }}>
                            <Text style={{ color: "white", paddingTop: 8, }}>התנתקות</Text>
                        </View>
                    </Pressable>

                    <Text style={{ color: "white", paddingTop: 8, paddingLeft: 10, paddingRight: 10 }}>{user.user.username}</Text>



                </View > : <View style={styles.back}>
                    <Text style={{ color: "white", paddingTop: 8, paddingLeft: 10, paddingRight: 10 }}>{user.user.username}</Text>
                    <Pressable
                        onPress={CheckLogOut}
                    >
                        <View style={{ width: 70, height: 50 }}>
                            <Text style={{ color: "white", paddingTop: 8, }}>התנתקות</Text>
                        </View>
                    </Pressable>




                </View >


                }
            </SafeAreaView>



            <Text style={styles.txt5}>בחר נכס:</Text>



            <FlatList
                contentContainerStyle={{ paddingBottom: 140 }}
                data={assets}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) =>
                (
                    <Pressable
                        onPress={() => assetUpdate(item)}
                    >


                        <View style={styles.container1}>

                            {Platform.OS === 'ios' ?
                                <View style={styles.container2}>
                                    <View style={{ flexDirection: "column" }}>

                                        <Text style={styles.txt1}>{item.adress}</Text>
                                        <Text style={styles.txt3}>בעל הנכנס: {filter(item._id)}</Text>
                                        <Text style={styles.txt3}>חוזה עד: {item.rentF ? item.rentF : `לא הוגדר`} </Text>
                                    </View>
                                    <Image style={styles.image} source={item.image[0] ? { uri: `http://141.226.241.38:3001/${item.image[0]}` } : null} />


                                </View> :
                                <View style={styles.container2}>
                                    <Image style={styles.image} source={item.image[0] ? { uri: `http://141.226.241.38:3001/${item.image[0]}` } : null} />
                                    <View style={{ flexDirection: "column" }}>

                                        <Text style={styles.txt1}>{item.adress}</Text>
                                        <Text style={styles.txt3}>בעל הנכנס: {filter(item._id)}</Text>
                                        <Text style={styles.txt3}>חוזה עד: {item.rentF ? item.rentF : `לא הוגדר`} </Text>
                                    </View>


                                </View>
                            }


                        </View>
                    </Pressable>



                )
                }
            />

            <Modal visible={flag1} animationType="slide">
                <UpdateAssetComp data={item} modalflag1={(data) => setFlag1(data)} />
            </Modal>

        </View >
    )
}

export default ADAssetsComp

const diviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: 30,

    },


    container1: {
        flexDirection: 'row',
        backgroundColor: 'radial-gradient(circle, rgba(178,224,230,1) 0%, rgba(165,231,230,0.938813025210084) 53%, rgba(255,255,255,1) 100%);',
        marginBottom: 20,
        borderTopRightRadius: 20,
        borderBottomStartRadius: 20,


    },
    image: {
        width: 150,
        height: 150,
        borderWidth: 1.5,
        borderColor: '#5f19cd',
        borderRadius: 10,

    },
    txt1: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingRight: 15,
        paddingBottom: 10,
        textAlign: 'center'

    },
    container2: {
        flexDirection: 'row',
        width: 330,
        height: 200,
        justifyContent: Platform.OS === 'ios' ? "flex-end" : "flex-start",
        paddingLeft: Platform.OS === 'ios' ? null : 10,
        alignItems: 'center',
        paddingRight: 10,
        
    },
    txt2: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingBottom: 20,
        paddingRight: 15,
        marginTop: 20,
        textAlign: 'right'
    },
    txt3: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingRight: 10,
        paddingBottom: 5,
        paddingRight: 15,
        textAlign: 'right'
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
    txt5: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 20,
        paddingRight: 15,
        marginTop: 20,
        textAlign: 'right'
    },

})