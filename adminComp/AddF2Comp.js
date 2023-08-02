
import { View, Text, StyleSheet, Platform, TextInput, Button, TouchableOpacity, SafeAreaView, Modal, Dimensions, Alert } from "react-native";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { updateAsset1 } from '../redux/assets'
import { addEX21 } from '../redux/assets'

function AddF2Comp(props) {
    const assets = useSelector(state => state.setassets.assets)

    const user = useSelector(state => state.setUser.user)
    const [asset, setAsset] = useState({ rent: 0, funding: 0, adress: "", size: 0, furniture: [], expenses: [], image: [], rentF: "", contractImage: [], expenses2: [] })
    const dispatch = useDispatch()
    const [asset1, setAsset1] = useState({ _id: props.data._id, rent: props.data.rent, funding: props.data.funding, adress: props.data.adress, size: props.data.size, furniture: props.data.furniture, expenses: props.data.expenses, image: props.data.image, rentF: props.data.rentF, contractImage: props.data.contractImage, expenses2: props.data.expenses2 })
    const [newEx, setNewEx] = useState({ name: '', price: 0, })
    const [newexpenses, setNewexpenses] = useState([])
    const token = useSelector(state => state.settoken.token)
    const date = new Date()
    const [a, setA] = useState(date.getMonth())

    const getDate = async () => {
        const month = String(date.getMonth() + 1).padStart(2)
        const asset2 = assets.find(a => a._id == props.data._id)
        const index = asset2.expenses2.length - 1
        if (asset2.expenses2[index].months == month) {
            if (newEx.name == '' || newEx.price == 0) {
                Alert.alert('נא למלא את כל השדות')
            } else {
                const data = { ...asset2 }
                const newexpenses = [...asset2.expenses2]
                newexpenses[index] = {
                    ...newexpenses[index],
                    exp: [...newexpenses[index].exp, newEx],
                };
                data.expenses2 = newexpenses
                console.log(newexpenses[index])
                dispatch(addEX21({ id: data._id, newEx: newEx }))
                const obj = { headers: { token: token.token } }
                setNewEx({ name: '', price: 0, })
                await axios.put(`http://141.226.241.38:3001/assets/${asset1._id}`, data, obj)
                alert('הוצאה נוספה')
            }
        } else {
            Alert.alert('  חודש לא תואם')
        }

    }


    useEffect(() => {
        setNewexpenses(asset1.expenses2)
    }, [asset])

    return (


        <View style={styles.container}>

            <SafeAreaView>

                {Platform.OS === 'ios' ? <View style={styles.back}>
                    <TouchableOpacity onPress={() => props.modalFlag1(false)}>
                        <IconAntDesign name="arrowleft" size={40} color={'white'} />
                    </TouchableOpacity>

                    <Text style={{ color: "white", paddingTop: 8, paddingLeft: 10, paddingRight: 10 }}>{user.user.username}</Text>

                </View > : <View style={styles.back}>
                    <Text style={{ color: "white", paddingTop: 8, paddingLeft: 10, paddingRight: 10 }}>{user.user.username}</Text>
                    <TouchableOpacity onPress={() => props.modalFlag1(false)}>
                        <IconAntDesign name="arrowleft" size={40} color={'white'} />
                    </TouchableOpacity>

                </View >


                }
            </SafeAreaView>

            <View style={styles.container1}>
                <TextInput
                    style={styles.input}
                    placeholder=' הוצאה '
                    onChangeText={text => setNewEx({ ...newEx, name: text })}
                    autoCapitalize='none'

                />
                <TextInput
                    style={styles.input}
                    placeholder=' מחיר '
                    onChangeText={text => setNewEx({ ...newEx, price: +text })}
                    autoCapitalize='none'

                />
            </View>

            <Button
                title=" הוסף הוצאה נלוות"
                onPress={getDate}
            />
        </View>



    );
}

export default AddF2Comp;

const diviceWidth = Dimensions.get('window').width
const diviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    back: {
        alignItems: 'flex-start',
        paddingLeft: 10,
        backgroundColor: '#5f19cd',
        flexDirection: 'row',
        height: 50,
        paddingTop: 10,
        width: '100%',
        justifyContent: 'space-between',
        paddingRight: 10,

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
    container1: {
        alignItems: 'center',
        marginTop: diviceHeight / 4,
    }

})