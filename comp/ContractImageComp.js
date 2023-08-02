import { View, Text, StyleSheet, SafeAreaView, Platform, Button, TouchableOpacity, Modal, Dimensions } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import React, { useState, useEffect } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';



function ContractImageComp(props) {
    const user = useSelector(state => state.setUser.user)
    const [images, setImages] = useState([])
    const [modalVisible, setModalVisible] = useState(true)

    const getImages = () => {
        let arr = []
        props.data.contractImage.map((image) => {
            arr.push({ url: `http://141.226.241.38:3001/${image}` })
        })
        setImages(arr)
    }

    const closeModal = () => {
        props.modalFlag1(false)
        setModalVisible(false)
    }

    useEffect(() => {
        getImages()

    }, [props.data.contractImage])

    return (


        <View style={styles.container1}>
            {images.length > 0 ?
                <View>

                    <Modal visible={modalVisible} transparent={true}>

                        <SafeAreaView>

                            {Platform.OS === 'ios' ? 
                            <View style={styles.back}>
                                <TouchableOpacity onPress={() => closeModal()}>
                                    <IconAntDesign name="arrowleft" size={40} color={'white'} />
                                </TouchableOpacity>

                                <Text style={{ color: "white", paddingTop: 8, paddingLeft: 10, paddingRight: 10 }}>{user.user.username}</Text>

                            </View >
                             :
                                <View style={styles.back}>
                                    <Text style={{ color: "white", paddingTop: 8, paddingLeft: 10, paddingRight: 10 }}>{user.user.username}</Text>
                                    <TouchableOpacity onPress={() => closeModal()}>
                                        <IconAntDesign name="arrowleft" size={40} color={'white'} />
                                    </TouchableOpacity>

                                </View >


                            }
                        </SafeAreaView>
                        <ImageViewer imageUrls={images} />
                    </Modal>

                </View> : null}


        </View >
    )
}

export default ContractImageComp

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