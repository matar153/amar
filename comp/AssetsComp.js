import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity, Dimensions, Pressable, Alert, BackHandler,Platform} from "react-native";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logOut1 } from '../redux/filterAssets'

function AssetsComp({ navigation }) {
  const dispatch = useDispatch()
  const [filterAsset, setFilterAsset] = useState([])
  const [render, setRender] = useState(false)

  const filterAssets2 = useSelector(state => state.setfilterAssets.filterAssets)
  const assets = useSelector(state => state.setassets.assets)
  const token = useSelector(state => state.settoken.token)
  const user = useSelector(state => state.setUser.user)

  const goBack = () => {
    console.log('back')
  }

  BackHandler.addEventListener('hardwareBackPress', function () {
    /**
     * this.onMainScreen and this.goBack are just examples,
     * you need to use your own implementation here.
     *
     * Typically you would use the navigator here to go to the last state.
     */
  
    
     goBack();
      /**
       * When true is returned the event will not be bubbled up
       * & no other back action will execute
       */
      return true;
    
    /**
     * Returning false will let the event to bubble up & let other event listeners
     * or the system's default back action to be executed.
     */
    return false;
  });

    const logOut = async () => {

      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('user')
      dispatch(logOut1())
      navigation.navigate('Login')
    }

    useEffect(() => {
      console.log('filterAssets2', filterAssets2)
    }, [])

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

        <View style={{ marginTop: 30 }}>

          <Text style={styles.txt}>בחירת נכנס:</Text>
        </View>

        <View>

          <FlatList
            style={{ marginBottom: 200 }}
            data={filterAssets2}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) =>
            (
              <View>
                <View style={styles.container1}>

                  {/* <Text style={styles.txt1}>{item[1].adress}:</Text> */}

                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Asset', { asset: item })}>
                  <Image style={styles.image} source={{ uri: `http://141.226.241.38:3001/${item.image[0]}` }} />
                </TouchableOpacity>
              </View>

            )
            }
          />

        </View>

      </View>
    )
  }

  export default AssetsComp

  const diviceWidth = Dimensions.get('window').width


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 30,
    },
    aaa: {
      width: 400,
      height: 400,
      marginTop: -250,
    },
    image: {
      width: 200,
      height: 200,
      borderWidth: 1.5,
      borderColor: '#5f19cd',
      borderRadius: 10,
      marginBottom: 20,

    },
    txt: {
      fontSize: 20,
      paddingBottom: 20,
      fontWeight: 'bold',
    },
    txt1: {
      fontSize: 15,
      fontWeight: 'bold',
      paddingBottom: 10,


    },
    container1: {
      alignItems: 'center',
      paddingTop: 20,
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

  });