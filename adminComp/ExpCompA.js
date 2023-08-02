import { View, Text, StyleSheet, FlatList, Alert, TextInput, TouchableOpacity, Dimensions, Pressable, Platform, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import React, { useState, useEffect } from 'react';
import { deleteEX1 } from '../redux/assets';
import axios from "axios";
import { updateAsset1 } from '../redux/assets'



function ExpCompA(props) {
    const user = useSelector(state => state.setUser.user)
    const dispatch = useDispatch()
    const [asset1, setAsset1] = useState({})
    const token = useSelector(state => state.settoken.token)
    const [ex, setEx] = useState('')
    const assets = useSelector(state => state.setassets.assets)

    const getasset = async () => {
        const filterasset = assets.filter(item => item._id === props.data._id)
        setAsset1(filterasset[0])
    }

    const deleteEX = async (index) => {
        dispatch(deleteEX1({ assets: asset1, index: index }))
        const newAsset = { ...assets.find(item => item._id === props.data._id), furniture: assets.find(item => item._id === props.data._id).furniture.filter((i) => i !== index) }
        const obj = { headers: { token: token.token } }
        await axios.put(`http://141.226.241.38:3001/assets/${asset1._id}`, newAsset, obj)
        console.log(index);
        console.log(newAsset.furniture);
    }

    const addEX = async () => {
        if (ex === '') {
            Alert.alert('הכנס ריהוט')
        } else {
            setEx('')
            const newAsset = { ...assets.find(item => item._id === props.data._id), furniture: [...assets.find(item => item._id === props.data._id).furniture, ex] }
            console.log(newAsset.furniture);
            dispatch(updateAsset1({ assets: newAsset }))
            const obj = { headers: { token: token.token } }
            await axios.put(`http://141.226.241.38:3001/assets/${asset1._id}`, newAsset, obj)

        }
    }

    useEffect(() => {
        getasset()
    }, [])

    return (


        <View style={styles.container1}>
            <SafeAreaView>

                {Platform.OS === 'ios' ? <View style={styles.back}>
                    <TouchableOpacity onPress={() => props.modalFlag(false)}>
                        <IconAntDesign name="arrowleft" size={40} color={'white'} />
                    </TouchableOpacity>

                    <Text style={{ color: "white", paddingTop: 8, paddingLeft: 10, paddingRight: 10 }}>{user.user.username}</Text>

                </View > : <View style={styles.back}>
                    <Text style={{ color: "white", paddingTop: 8, paddingLeft: 10, paddingRight: 10 }}>{user.user.username}</Text>
                    <TouchableOpacity onPress={() => props.modalFlag(false)}>
                        <IconAntDesign name="arrowleft" size={40} color={'white'} />
                    </TouchableOpacity>

                </View >


                }
            </SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.txt}>הרהיטים שנמצאים בבית</Text>

                <View style={styles.addEX}>

                    <Text style={styles.txt}>להוסיף ריהוט</Text>
                    {Platform.OS === 'ios' ?
                        <View style={{ flexDirection: "row" }}>
                            <Pressable
                                onPress={() => addEX()}
                            >
                                <Text style={styles.txt}>הוסף</Text>
                            </Pressable>
                            <TextInput
                                style={styles.input}
                                onChangeText={text => setEx(text)}
                                autoCapitalize='none'
                                value={ex}
                            />
                        </View> :
                        <View style={{ flexDirection: "row" }}>

                            <TextInput
                                style={styles.input}
                                onChangeText={text => setEx(text)}
                                autoCapitalize='none'
                                value={ex}
                            />
                            <Pressable
                                onPress={() => addEX()}
                            >
                                <Text style={styles.txt}>הוסף</Text>
                            </Pressable>
                        </View>
                    }


                </View>

                {Platform.OS === 'ios' ?
                    <FlatList
                        data={assets.find(item => item._id === props.data._id).furniture}
                        renderItem={({ item, index }) => {
                            let counter = 1
                            return (
                                <View style={{ alignItems: 'center', paddingTop: 10, flexDirection: "row" }}>


                                    <Pressable
                                        onPress={() => deleteEX(item)}
                                    >
                                        <View style={styles.delete}>

                                            <Text>להסיר</Text>

                                        </View>
                                    </Pressable>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{index + 1}. {item}</Text>
                                </View>

                            )
                        }}
                        keyExtractor={(item, index) => index}

                    /> :
                    <FlatList
                        data={assets.find(item => item._id === props.data._id).furniture}
                        renderItem={({ item, index }) => {
                            let counter = 1
                            return (
                                <View style={{ alignItems: 'center', paddingTop: 10, flexDirection: "row" }}>


                                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 10 }}>{index + 1}. {item}</Text>
                                    <Pressable
                                        onPress={() => deleteEX(item)}
                                    >
                                        <View style={styles.delete}>

                                            <Text>להסיר</Text>

                                        </View>
                                    </Pressable>
                                </View>

                            )
                        }}
                        keyExtractor={(item, index) => index}

                    />
                }

            </View>

        </View >
    )
}

export default ExpCompA

const diviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "center",
    },

    txt: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 20,


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
    container1: {
        flex: 1,
        backgroundColor: '#fff',
    },
    delete: {
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#5f19cd',
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
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
    addEX: {
        alignItems: 'center',
        marginTop: -20
    }

})