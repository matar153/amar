import { View, Text, StyleSheet, Pressable, TextInput, TouchableOpacity, Platform, FlatList, ScrollView, SafeAreaView, Modal, Dimensions, Alert } from "react-native";
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { SliderBox } from "react-native-image-slider-box";
import SelectDropdown from 'react-native-select-dropdown'
import ExpCompA from './ExpCompA'
import ContractImageComp from './ContractImage'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateAsset1 } from '../redux/assets'
import { deleteImage1, deleteContract1 } from '../redux/assets'
import UpAsset from "./UpAsset";
import AddFComp from "./AddFComp";
import AddF2Comp from "./AddF2Comp";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';

function UpdateAssetComp(props) {
  const dispatch = useDispatch()
  
  const [images, setImages] = useState([])
  const [expenses, setExpenses] = useState({})
  const [expenses1, setExpenses1] = useState({})
  const [mulExp1, setMulExp1] = useState(0)
  const [mulExp3, setMulExp3] = useState(0)
  const user = useSelector(state => state.setUser.user)
  const [flag, setFlag] = useState(false)
  const [flag1, setFlag1] = useState(false)
  const [modalflag, setModalFlag] = useState(false)
  const [modalflag1, setModalFlag1] = useState(false)
  const [modalflag2, setModalFlag2] = useState(false)
  const [addFFlag, setAddFFlag] = useState(false)
  const [createFFlag, setCreateFFlag] = useState(false)
  const assets = useSelector(state => state.setassets.assets)
  const [asset1, setAsset1] = useState({ _id: props.data._id, rent: props.data.rent, funding: props.data.funding, adress: props.data.adress, size: props.data.size, furniture: props.data.furniture, expenses: props.data.expenses, image: props.data.image, rentF: props.data.rentF, contractImage: props.data.contractImage, expenses2: props.data.expenses2 })
  const token = useSelector(state => state.settoken.token)
  const [newexpenses, setNewexpenses] = useState({})
  const [newexpenses2, setNewexpenses2] = useState({})
  const date = new Date()
  const month1 = String(date.getMonth() + 1).padStart(2)
  const [newexpenses1, setNewexpenses1] = useState({ exp: [], months: +month1 })

  const index = props.data.expenses.length
  const index2 = props.data.expenses.length
  const index11 = props.data.expenses2.length
  const getimages = () => {
    const images = []
    assets.find(item => item._id === props.data._id).image.map((image) => {
      images.push(`http://141.226.241.38:3001/${image}`)
      setImages(images)
    })
  }

  const cheackF2 = () => {
    if (props.data.expenses2[index11 - 1].months === expenses.months) {
      setCreateFFlag(!createFFlag)
    } else {
      alert('אתה יכול להוסיף רק לחודש הנוכחי')
    }
  }

  const createF2 = async () => {
    const newexpenses1 = { exp: [], months: +month1 }
    const updateAsset = { ...asset1, expenses2: [...asset1.expenses2, newexpenses1] }
    dispatch(updateAsset1({ assets: updateAsset }))
    const obj = { headers: { token: token.token } }
    await axios.put(`http://141.226.241.38:3001/assets/${asset1._id}`, updateAsset, obj)
    props.modalflag1(false)
  }

  const deleteEX2 = async (item) => {
    const month = String(date.getMonth() + 1).padStart(2)
    const asset22 = assets.find(item => item._id === props.data._id)
    if (asset22.expenses2[index11 - 1].months == month) {
      const newexpenses1 = asset22.expenses2[index11 - 1].exp.filter((exp) => exp !== item)
      // setNewexpenses([...newexpenses[index-1],newexpenses[index-1].exp=newexpenses1]) 
      const newData = [...newexpenses2];
      const lastObjectIndex = newData.length - 1;
      newData[lastObjectIndex] = {
        ...newData[lastObjectIndex],
        exp: newexpenses1,
      };
    const updateAsset = { ...asset22, expenses2: newData }
      setAsset1(updateAsset)
      console.log(updateAsset.expenses2[index-1])
      dispatch(updateAsset1({ assets: updateAsset }))
      const obj = { headers: { token: token.token } }
      await axios.put(`http://141.226.241.38:3001/assets/${asset22._id}`, updateAsset, obj)
    }
    else {
      alert('you can only delete the current month expenses')
    }


  }


  const addExDate = async () => {
    if (index - 1 === -1) {
      const newexpenses1 = { exp: [], months: +month1 }
      const updateAsset = { ...asset1, expenses: [...asset1.expenses, newexpenses1] }
      dispatch(updateAsset1({ assets: updateAsset }))
      const obj = { headers: { token: token.token } }
      await axios.put(`http://141.226.241.38:3001/assets/${asset1._id}`, updateAsset, obj)
      props.modalflag1(false)
      return
    }
    if (asset1.expenses[index - 1].months == month1) {
      return
    } else {
      let newexpenses1 = asset1.expenses[index - 1]
      newexpenses1 = { ...newexpenses1, months: +month1 }
      Alert.alert('נוספו הוצאות לחודש הנוכחי')
      setAsset1({ ...asset1, expenses: [...asset1.expenses, newexpenses1] })
      // const updateAsset = { ...asset1, expenses: [...asset1.expenses, newexpenses1] }
      const updateAsset = { ...asset1, expenses: [...asset1.expenses, newexpenses1] }
      dispatch(updateAsset1({ assets: updateAsset }))
      const obj = { headers: { token: token.token } }
      await axios.put(`http://141.226.241.38:3001/assets/${asset1._id}`, updateAsset, obj)
      props.modalflag1(false)
      return
    }
  }

  const deleteEX = async (item) => {
    const month = String(date.getMonth() + 1).padStart(2)
    const asset22 = assets.find(item => item._id === props.data._id)
    if (asset22.expenses[index - 1].months == month) {
      const newexpenses1 = asset22.expenses[index - 1].exp.filter((exp) => exp !== item)
      // setNewexpenses([...newexpenses[index-1],newexpenses[index-1].exp=newexpenses1]) 
      const newData = [...newexpenses];
      const lastObjectIndex = newData.length - 1;
      newData[lastObjectIndex] = {
        ...newData[lastObjectIndex],
        exp: newexpenses1,
      };
    const updateAsset = { ...asset22, expenses: newData }
      setAsset1(updateAsset)
      console.log(updateAsset.expenses[index-1])
      dispatch(updateAsset1({ assets: updateAsset }))
      const obj = { headers: { token: token.token } }
      await axios.put(`http://141.226.241.38:3001/assets/${asset22._id}`, updateAsset, obj)
    }
    else {
      alert('you can only delete the current month expenses')
    }

  }

  const findExpMonth = () => {
    if (props.data.expenses2 === undefined) {
      return
    }
    const findExpMonth = props.data.expenses2.find((months) => {

      return months.months === expenses.months

    })
    if (findExpMonth) {
      if (findExpMonth.exp.length === 0) {
        setFlag(false)
        return
      }
    }

    if (findExpMonth === undefined) {
      setFlag(false)
      setExpenses1({})
      return
    } else {
      setExpenses1(findExpMonth)
      setFlag(true)
      const mulExp2 = findExpMonth.exp.map((exp) => {
        let exp2 = 0
        exp2 = exp2 + exp.price
        return exp2
      })
      const aaa1 = mulExp2.reduce((prev, current) => prev + current, 0)
      setMulExp3(aaa1)

    }

  }

  const mulExp = () => {
    if (expenses === undefined) {
      return
    }
    if (expenses.exp === undefined) {
      return
    }


    const mulExp1 = expenses.exp.map((exp) => {
      let total = 0
      total = total + exp.price
      return total
    })
    const aaa = mulExp1.reduce((prev, current) => prev + current, 0)

    setMulExp1(aaa)
    if (expenses.exp.length > 4) {
      setFlag1(true)
    } else {
      setFlag1(false)
    }
  }


  const addimage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const image = { uri: result.uri, name: result.uri.split('/').pop(), type: "image/jpeg" }
      const FromData = new FormData();
      FromData.append('image', image)
      const obj = { headers: { "Content-Type": "multipart/form-data" } }

      const newassets = { ...assets.find(item => item._id === props.data._id), image: [...assets.find(item => item._id === props.data._id).image, image.name] }
      dispatch(updateAsset1({ assets: newassets }))
      await axios.post(`http://141.226.241.38:3001/assets/uplaod/${props.data._id}`, FromData, obj)
    }


  }

  const contractImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const image = { uri: result.uri, name: result.uri.split('/').pop(), type: "image/jpeg" }
      const FromData = new FormData();
      FromData.append('image', image)
      const obj = { headers: { "Content-Type": "multipart/form-data" } }
      await axios.post(`http://141.226.241.38:3001/assets/uplaodContract/${props.data._id}`, FromData, obj)
    }

  }

  const deleteImage = async (index) => {
    let asset4 = assets.find((asset1) => asset1._id === props.data._id)
    if (asset4 !== undefined) {
      const imagname = asset4.image[index]
      setAsset1({ ...asset1, image: asset1.image.filter((image) => image !== imagname) })


    }
    let imagename = asset1.image[index]
    const newAssets = { ...asset1, image: asset1.image.filter((image) => image !== imagename) }
    setAsset1({ ...asset1, image: asset1.image.filter((image) => image !== imagename) })
    Alert.alert(
      '  האם אתה בטוח שברצונך להסיר תמונה  ?',
      '       ניתן להוסיף שוב', // <- this part is optional, you can pass an empty string
      [

        { text: 'כן', onPress: () => removeImage(index, newAssets) },
        { text: 'לא', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );

  }
  const removeImage = async (index, newAssets) => {
    const obj = { headers: { token: token.token } }
    dispatch(deleteImage1({ assets: asset1, index: index }))
    props.modalflag1(false)

    await axios.put(`http://141.226.241.38:3001/assets/${asset1._id}`, newAssets, obj)
  }

  const deleteContract = async () => {
    Alert.alert(
      '  האם אתה בטוח שברצונך להסיר חוזה  ?',
      '       ניתן להוסיף שוב', // <- this part is optional, you can pass an empty string
      [

        { text: 'כן', onPress: () => removeContract() },
        { text: 'לא', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );


  }
  const removeContract = async () => {
    dispatch(deleteContract1({ assets: asset1 }))
    props.modalflag1(false)
    const obj = { headers: { token: token.token } }
    const newAssets = { ...asset1, contractImage: [] }
    await axios.put(`http://141.226.241.38:3001/assets/${asset1._id}`, newAssets, obj)

  }

  useEffect(() => {
    findExpMonth()
    mulExp()
  }, [expenses])

  useEffect(() => {
    getimages()
    setExpenses(props.data.expenses[index - 1])
    setNewexpenses(props.data.expenses)
    setNewexpenses2(props.data.expenses2)
    addExDate()
  }, [])




  return (
    <View style={styles.container}>
      <SafeAreaView>

        {Platform.OS === 'ios' ? <View style={styles.back}>
          <TouchableOpacity onPress={() => props.modalflag1(false)}>
            <IconAntDesign name="arrowleft" size={40} color={'white'} />
          </TouchableOpacity>

          <Text style={{ color: "white", paddingTop: 8, paddingLeft: 10, paddingRight: 10 }}>{user.user.username}</Text>



        </View > : <View style={styles.back}>
          <Text style={{ color: "white", paddingTop: 8, paddingLeft: 10, paddingRight: 10 }}>{user.user.username}</Text>
          <TouchableOpacity onPress={() => props.modalflag1(false)}>
            <IconAntDesign name="arrowleft" size={40} color={'white'} />
          </TouchableOpacity>




        </View >


        }

      </SafeAreaView>
      <View>
        <SliderBox
          images={images}
          sliderBoxHeight={200}
          onCurrentImagePressed={index => deleteImage(index)}
          dotColor="#5f19cd"
          inactiveDotColor="black"
        />
      </View>

      <View>

        <Modal visible={modalflag2}>
          <UpAsset data={props.data} modalFlag={(data) => setModalFlag2(data)} />
        </Modal>

        {/* adress & rent & size */}
        <View style={styles.adress}>

          <Pressable >
            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingLeft: 10 }}>{Platform.OS === 'ios' ? ' שכירות: ' + props.data.rent : props.data.adress}</Text>
          </Pressable>

          <Pressable >
            <Text style={{ fontSize: 16, fontWeight: 'bold', }}>גודל: {props.data.size}</Text>
          </Pressable>

          <Pressable >
            <Text style={{ fontSize: 16, fontWeight: 'bold', }}>{Platform.OS === 'ios' ? props.data.adress : ' שכירות: ' + props.data.rent}</Text>
          </Pressable>

        </View>
      </View>



      {/* choose expenses */}
      {Platform.OS === 'ios' ?
        <View style={styles.exp}>
          <View style={{ paddingTop: 8 }}>
            {props.data.expenses.length > 0 ?
              <SelectDropdown
                buttonStyle={{ width: 50, height: 40, backgroundColor: 'white', borderRadius: 10, marginBottom: 10, borderWidth: 2, borderColor: "#5f19cd" }}
                buttonTextStyle={{ color: 'black', fontSize: 18 }}
                rowStyle={{ backgroundColor: 'white', borderColor: '#5f19cd', borderWidth: 2, }}
                defaultButtonText={props.data.expenses[index - 1].months}
                data={props.data.expenses}
                onSelect={(selectedItem, index) => {
                  setExpenses(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem.months
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.months
                }}

              /> : null
            }

          </View>

          <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: 'bold' }}>בחירת חודש:</Text>

        </View> :
        <View style={styles.exp}>
          <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: 'bold' }}>בחירת חודש:</Text>
          <View style={{ paddingTop: 8 }}>
            {props.data.expenses.length > 0 ?
              <SelectDropdown
                buttonStyle={{ width: 50, height: 40, backgroundColor: 'white', borderRadius: 10, marginBottom: 10, borderWidth: 2, borderColor: "#5f19cd" }}
                buttonTextStyle={{ color: 'black', fontSize: 18 }}
                rowStyle={{ backgroundColor: 'white', borderColor: '#5f19cd', borderWidth: 2, }}
                defaultButtonText={props.data.expenses[index - 1].months}
                data={props.data.expenses}
                onSelect={(selectedItem, index) => {
                  setExpenses(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem.months
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.months
                }}

              /> : null
            }

          </View>


        </View>
      }


      {/* expenses data */}


      <View>
        <View style={{ alignItems: "center", paddingBottom: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', paddingTop: 10 }}>הוצאות חודשיות</Text>
        </View>

        <View style={{ height: flag1 ? 250 : null }}>
          {expenses ?
            <FlatList

              data={expenses.exp}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) =>
              (
                <View style={styles.flatlist}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{Platform.OS === 'ios' ? item.price : item.name}</Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{Platform.OS === 'ios' ? item.name : item.price}</Text>
                  {expenses.months == month1 ?
                    <TouchableOpacity onPress={() => deleteEX(item)}>
                      <Text style={{ fontSize: 14, fontWeight: 'bold' }}>למחוק</Text>
                    </TouchableOpacity> : null
                  }

                </View>

              )
              }


            /> : null
          }


          {flag ? <View style={{ alignItems: "center", padding: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>הוצאות נלוות</Text>
          </View> : null}


          {flag ?
            <View style={{ height: 100 }}>
              <FlatList

                data={expenses1.exp}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) =>

                (
                  <View style={styles.flatlist}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{Platform.OS === 'ios' ? item.price : item.name}</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{Platform.OS === 'ios' ? item.name : item.price}</Text>
                    {expenses1.months == month1 ?
                      <TouchableOpacity onPress={() => deleteEX2(item)}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>למחוק</Text>
                      </TouchableOpacity> : null
                    }
                  </View>

                )
                }

              />
            </View>
            : null
          }
        </View>

        <View>

        </View>

      </View>


      <ScrollView style={{marginBottom:40}}>

        {Platform.OS === 'ios' ?
          <View style={{ alignItems: "center", padding: 16, justifyContent: "space-between", paddingRight: 10, flexDirection: "row" }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>סה"כ אחרי שיכרות: {flag ? props.data.rent - mulExp1 - mulExp3 : props.data.rent - mulExp1}</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>סה"כ: {flag ? mulExp1 + mulExp3 : mulExp1}</Text>
          </View> :
          <View style={{ alignItems: "center", padding: 16, justifyContent: "space-between", paddingRight: 10, flexDirection: "row" }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>סה"כ: {flag ? mulExp1 + mulExp3 : mulExp1}</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>סה"כ אחרי שיכרות: {flag ? props.data.rent - mulExp1 - mulExp3 : props.data.rent - mulExp1}</Text>
          </View>
        }
        <View style={{ alignItems: "center", padding: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', paddingTop: 10, paddingLeft: 10 }}>חוזה עד: {props.data.rentF ? props.data.rentF : "לא הוכנס תאריך"}</Text>

        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", paddingTop: 10, marginBottom: 50 }}>

          <Pressable
            onPress={() => setModalFlag(true)}
            style={{ alignItems: "center", padding: 5, }}
          >
            <View style={styles.modal}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: "white" }}>ריהוט</Text>
            </View>
          </Pressable>




          {props.data.contractImage.length > 0 ?
            <Pressable
              onPress={() => setModalFlag1(true)}
              style={{ alignItems: "center", padding: 5, }}
            >
              <View style={styles.modal}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: "white" }}>חוזה</Text>
              </View>
            </Pressable> : null


          }
          <Pressable
            onPress={() => setModalFlag2(!modalflag2)}
            style={{ alignItems: "center", padding: 5, }}
          >
            <View style={styles.modal}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: "white" }}>לעדכן</Text>
            </View>
          </Pressable>

        </View>

        <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 50 }}>

          <Pressable
            onPress={() => addimage()}
            style={{ alignItems: "center", padding: 5, }}
          >
            <View style={styles.modal}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: "white" }}>להוסיף תמונה</Text>
            </View>
          </Pressable>
          <View style={styles.modal1}>

            <Pressable
              onPress={() => contractImage()}
              style={{ alignItems: "center", padding: 5, }}
            >
              <View style={styles.modal1}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: "white" }}>להוסיף חוזה</Text>
              </View>
            </Pressable>


          </View>

          <View style={styles.modal}>

            <Pressable
              onPress={() => deleteContract()}
              style={{ alignItems: "center", padding: 5 }}
            >
              <View style={styles.modal1}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: "white" }}>למחוק חוזה</Text>
              </View>
            </Pressable>


          </View>

        </View>
        <Modal visible={modalflag}>
          <ExpCompA data={props.data} modalFlag={(data) => setModalFlag(data)} />
        </Modal>

        <Modal visible={modalflag1}>
          <ContractImageComp data={props.data} modalFlag1={(data) => setModalFlag1(data)} />
        </Modal>



        <Modal animationType="slide" visible={addFFlag}>
          <AddFComp data={props.data} modalFlag1={(data) => setAddFFlag(data)} />
        </Modal>

        <Modal animationType="slide" visible={createFFlag}>
          <AddF2Comp data2={expenses.months} data={props.data} modalFlag1={(data) => setCreateFFlag(data)} />
        </Modal>


        <View style={styles.addF} >
          <View style={{ flexDirection: "row" }}>

            <Pressable
              onPress={() => setAddFFlag(!addFFlag)}
              style={{ alignItems: "center", padding: 5 }}
            >
              <View style={styles.modal1}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: "white" }}> להוסיף הוצאות</Text>
              </View>
            </Pressable>


            {index11 - 1 == -1 ?
              <Pressable
                style={{ alignItems: "center", padding: 5 }}
                onPress={() => createF2()}
              >
                <View style={styles.modal1}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: "white", alignItems: "center" }}>   צור הוצאות נלוות</Text>
                </View>
              </Pressable>
              :
              <Pressable
                style={{ alignItems: "center", padding: 5 }}
                onPress={() => cheackF2()}
              >
                <View style={styles.modal1}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: "white", alignItems: "center" }}>  הוצאות נלוות</Text>
                </View>
              </Pressable>
            }

          </View>


        </View>

      </ScrollView>



    </View >

  )


}


export default UpdateAssetComp

const diviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  txt: {
    paddingTop: 100,
    alignItems: 'center',

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
  adress: {
    paddingTop: 10,
    paddingRight: 10,
    borderBottomColor: '#5f19cd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#5f19cd',


  },
  exp: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"

  },
  flatlist: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#5f19cd',
    borderBottomWidth: 1,
    borderTopColor: '#5f19cd',
    borderTopWidth: 1,
    padding: 10,


  },
  modal: {
    backgroundColor: '#5f19cd',
    width: 100,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center',

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
  modal1: {
    backgroundColor: '#5f19cd',
    width: 100,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center',
    margin: 5
  },
  modal3: {
    backgroundColor: '#5f19cd',
    borderRadius: 60,
    alignItems: 'center',
    alignSelf: 'center',

  },
  addF: {
    justifyContent: 'center',
    alignItems: 'center',
  }


});
