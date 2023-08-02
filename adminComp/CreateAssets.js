
import { View, Text, StyleSheet, Pressable, TextInput, Platform, FlatList, ScrollView, SafeAreaView, Modal, Dimensions, Alert } from "react-native";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAsset1 } from '../redux/assets'
import axios from 'axios';

function CreateAssets({ navigation }) {
    const date = new Date()
    const month = String(date.getMonth() + 1).padStart(2)

    const user = useSelector(state => state.setUser.user)
    const [asset, setAsset] = useState({ rent: 0, funding: 0, adress: "", size: 0, furniture: [], expenses: [{ exp: [], months: +month }], image: [], rentF: "", contractImage: [], expenses2: [] })
    const dispatch = useDispatch()
    const token = useSelector(state => state.settoken.token)


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

    const addAsset = async () => {
        const obj = { headers: { token: token.token } }
        await axios.post(`http://141.226.241.38:3001/assets`, asset, obj)
        dispatch(addAsset1(asset))
        navigation.navigate('נכסים')
    }

    useEffect(() => {
    }, [asset])

    return (


        <View style={styles.container}>
            <SafeAreaView>
                {Platform.OS === 'ios' ?
                 <View style={styles.back}>

                 <Pressable
                     onPress={CheckLogOut}
                 >
                     <View style={{ width: 70, height: 50 }}>

                         <Text style={{ color: "white", paddingTop: 8, }}>התנתקות</Text>
                     </View>
                 </Pressable>

                 <Text style={{ color: "white", paddingTop: 8, paddingRight: 10 }}>{user.user.username}</Text>
             </View > :
             <View style={styles.back}>

                 <Text style={{ color: "white", paddingTop: 8, paddingRight: 10 }}>{user.user.username}</Text>
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

            <View style={{ alignItems: 'center', paddingTop: 100 }}>

                <View style={{ alignItems: "center" }}>
                    <Text style={styles.txt}>
                        כתובת:
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setAsset({ ...asset, adress: text })}
                        autoCapitalize='none'
                    />
                </View>

                <View style={{ alignItems: "center" }}>
                    <Text style={styles.txt}>
                        שכירות:
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setAsset({ ...asset, rent: +text })}
                        autoCapitalize='none'
                        keyboardType='numeric'
                    />
                </View>

                <View style={{ alignItems: "center" }}>
                    <Text style={styles.txt}>
                        גודל:
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setAsset({ ...asset, size: +text })}
                        autoCapitalize='none'
                        keyboardType='numeric'

                    />
                </View>

                <View style={{ alignItems: "center" }}>
                    <Text style={styles.txt}>
                        סיום חוזה:
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setAsset({ ...asset, rentF: text })}
                        autoCapitalize='none'
                    />
                </View>


            </View>

            <View style={{ marginRight: 6 }}>

                <Pressable
                    onPress={() => addAsset()}
                >
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.buttom}>להוסיף</Text>
                    </View>
                </Pressable>

            </View>


        </View>



    );
}

export default CreateAssets;

const diviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,

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

})