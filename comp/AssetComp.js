import { View, Text, StyleSheet, Pressable, Button, TouchableOpacity, Image, FlatList, ScrollView, SafeAreaView, Modal, Dimensions, Platform } from "react-native";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { SliderBox } from "react-native-image-slider-box";
import SelectDropdown from 'react-native-select-dropdown'
import ExpComp from './ExpComp'
import ContractImageComp from './ContractImageComp'
import AsyncStorage from "@react-native-async-storage/async-storage";


function AssetComp({ route, navigation }) {
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

  const index = route.params.asset.expenses.length
  const getimages = () => {
    const images = []
    route.params.asset.image.map((image) => {
      images.push(`http://141.226.241.38:3001/${image}`)
      setImages(images)
    })
  }


  const findExpMonth = () => {
    if (route.params.asset.expenses2 === undefined) {
      return
    }
    const findExpMonth = route.params.asset.expenses2.find((months) => {
      return months.months === expenses.months

    })
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
    if (expenses.exp === undefined) {
      return
    }

    // if (!expenses1) {
    //   const mulExp2 = expenses1.exp.map((exp) => {
    //     let exp2 = 0
    //     exp2 = exp2 + exp.price
    //     return exp2
    //   })
    //   const aaa1 = mulExp2.reduce((prev, current) => prev + current, 0)
    //   setMulExp2(aaa1)
    //   console.log(aaa1)
    // } else {
    //   setMulExp2(0)
    //   console.log("else", mulExp2)
    // }
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

  useEffect(() => {
    findExpMonth()
    mulExp()

  }, [expenses])

  useEffect(() => {
    getimages()
    setExpenses(route.params.asset.expenses[index - 1])
  }, [])

  return (
    <View style={styles.container}>

      <SafeAreaView>

        {Platform.OS === 'ios' ? <View style={styles.back}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconAntDesign name="arrowleft" size={40} color={'white'} />
          </TouchableOpacity>

          <Text style={{ color: "white", paddingTop: 8, paddingLeft: 10, paddingRight: 10 }}>{user.user.username}</Text>



        </View > :
          <View style={styles.back}>
            <Text style={{ color: "white", paddingTop: 8, paddingLeft: 10, paddingRight: 10 }}>{user.user.username}</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconAntDesign name="arrowleft" size={40} color={'white'} />
            </TouchableOpacity>
          </View >

        }

      </SafeAreaView>

      <View>
        <SliderBox
          images={images}
          sliderBoxHeight={200}
          dotColor="#5f19cd"
          inactiveDotColor="black"
        />
      </View>

      <View>


        {/* adress & rent & size */}

        {Platform.OS === 'ios' ?
          <View style={styles.adress}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingLeft: 10 }}>שכירות: {route.params.asset.rent}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', }}>גודל: {route.params.asset.size}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', }}>{route.params.asset.adress}</Text>
          </View> :
          <View style={styles.adress}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingRight: 5 }}>גודל: {route.params.asset.size}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', }}>{route.params.asset.adress}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingLeft: 10 }}>שכירות: {route.params.asset.rent}</Text>
          </View>
        }

      </View>



      {/* choose expenses */}

      <View style={styles.exp}>
        {Platform.OS !== 'ios' ? <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: 'bold' }}>בחירת חודש:</Text> : null}

        <View style={{ paddingTop: 8 }}>
          <SelectDropdown
            buttonStyle={{ width: 50, height: 40, backgroundColor: 'white', borderRadius: 10, marginBottom: 10, borderWidth: 2, borderColor: "#5f19cd" }}
            buttonTextStyle={{ color: 'black', fontSize: 18 }}
            rowStyle={{ backgroundColor: 'white', borderColor: '#5f19cd', borderWidth: 2, }}
            defaultButtonText={route.params.asset.expenses[index - 1].months}
            data={route.params.asset.expenses}
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

          />
        </View>
        {Platform.OS === 'ios' ? <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: 'bold' }}>בחירת חודש:</Text> : null}


      </View>

      {/* expenses data */}


      <View>
        <View style={{ alignItems: "center", paddingBottom: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', paddingTop: 10 }}>הוצאות חודשיות</Text>
        </View>

        <View style={{ height: flag1 ? 250 : null }}>
          <FlatList

            data={expenses.exp}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) =>
            (
              <View style={styles.flatlist}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{Platform.OS === 'ios' ? item.price : item.name}</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{Platform.OS === 'ios' ? item.name : item.price}</Text>

              </View>

            )
            }


          />

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


      <ScrollView>
        {Platform.OS === 'ios' ?
          <View style={{ alignItems: "center", padding: 16, justifyContent: "space-between", paddingRight: 10, flexDirection: "row" }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>סה"כ אחרי שיכרות: {flag ? route.params.asset.rent - mulExp1 - mulExp3 : route.params.asset.rent - mulExp1}</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>סה"כ: {flag ? mulExp1 + mulExp3 : mulExp1}</Text>
          </View> :
          <View style={{ alignItems: "center", padding: 16, justifyContent: "space-between", paddingRight: 10, flexDirection: "row" }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>סה"כ: {flag ? mulExp1 + mulExp3 : mulExp1}</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>סה"כ אחרי שיכרות: {flag ? route.params.asset.rent - mulExp1 - mulExp3 : route.params.asset.rent - mulExp1}</Text>
          </View>
        }


        <View style={{ alignItems: "center", padding: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', paddingTop: 10, paddingLeft: 10 }}>חוזה עד: {route.params.asset.rentF ? route.params.asset.rentF : "לא הוכנס תאריך"}</Text>

        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", paddingTop: 10 }}>

          {route.params.asset.furniture.length > 0 ?
            <Pressable
              onPress={() => setModalFlag(true)}
              style={{ alignItems: "center", padding: 5, }}
            >
              <View style={styles.modal}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: "white" }}>ריהוט</Text>
              </View>
            </Pressable> : null


          }

          {route.params.asset.contractImage.length > 0 ?
            <Pressable
              onPress={() => setModalFlag1(true)}
              style={{ alignItems: "center", padding: 5, }}
            >
              <View style={styles.modal}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: "white" }}>חוזה</Text>
              </View>
            </Pressable> : null


          }

        </View>




        <Modal visible={modalflag}>
          <ExpComp data={route.params.asset} modalFlag={(data) => setModalFlag(data)} />
        </Modal>

        <Modal visible={modalflag1}>
          <ContractImageComp data={route.params.asset} modalFlag1={(data) => setModalFlag1(data)} />
        </Modal>

      </ScrollView>

    </View >

  )


}


export default AssetComp
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
    marginTop: Platform.OS === 'ios' ? 0 : 24,

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

  }



});
