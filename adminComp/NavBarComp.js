
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import ADAssetsComp from '../adminComp/ADAssetsComp';
import { tabClasses } from '@mui/material';
import UserComp from '../adminComp/UserComp';
import CreateAssets from './CreateAssets';


function NavBarComp() {

  return (


    <Tab.Navigator screenOptions={{
      headerShown: false, tabBarIconStyle: { display: "none" },
      tabBarLabelStyle: {
        fontWeight: "700",
        fontSize: 15,
        color: '#5f19cd',
        paddingBottom: 10,

      },

      tabBarStyle: { backgroundColor: 'white', },

    }}>

      <Tab.Screen name="נכסים" component={ADAssetsComp} />
      <Tab.Screen name="משתמשים" component={UserComp} />
      <Tab.Screen name="יצירת נכס" component={CreateAssets} />

    </Tab.Navigator>

  );
}

export default NavBarComp;