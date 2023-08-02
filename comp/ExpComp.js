import { View, Text, StyleSheet, FlatList, SafeAreaView, Platform, TouchableOpacity, Dimensions } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import React, { useState, useEffect } from 'react';



function ExpComp(props) {
    const user = useSelector(state => state.setUser.user)


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

                <FlatList
                    data={props.data.furniture}
                    renderItem={({ item, index }) => {
                        let counter = 1
                        return (
                            <View style={{ alignItems: 'center', paddingTop: 5 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{index + 1}. {item}</Text>
                            </View>

                        )
                    }}
                    keyExtractor={(item, index) => index}

                />
            </View>

        </View >
    )
}

export default ExpComp

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


})