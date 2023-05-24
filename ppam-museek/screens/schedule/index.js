// import { FlatList, StyleSheet, View, Alert } from "react-native";
// import { ActivityIndicator, Appbar, Button, FAB, IconButton, List, Text } from "react-native-paper";
// import theme from "../../config/theme";

// import auth from '@react-native-firebase/auth';
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import firestore from '@react-native-firebase/firestore';
// import { useEffect, useState } from "react";
// import { useAuth } from "../../contexts/AuthProvider";
// import { useCollectionData } from 'react-firebase-hooks/firestore';

// export default function Schedule() {
//     const navigation = useNavigation();
//     const route = useRoute();
//     const { user } = useAuth();
//     const query = firestore()
//         .collection("schedule")
//         .where("userId", "==", user.uid)
//         .orderBy("createdAt", "desc");


//     const [data, loading] = useCollectionData(query, { idField: "id" });

//     // data = [
//     //     {
//     //         date: "kapan",
//     //         location: "dimana",
//     //     },
//     //     {
//     //         date: "when",
//     //         location: "where"
//     //     }
//     // ]
    
    
//         // auth().signOut();
//     console.log("ini di page shcedule")
//     console.log(user.uid);
    
//     console.log(data);
//     // console.log(data[0].name);


//     return <SafeAreaView style={styles.container}>
//         <Appbar>
//             <Appbar.Content title=" Jadwal Belajarmu" />
//         </Appbar>

//         {loading ?
//             <View style={styles.loading}>
//                 <ActivityIndicator />
//             </View>
//             :
//             <FlatList

//                 data={data}
//                 renderItem={({ item }) => {
//                     const { date, location } = item;
//                     return <List.Item
//                         // left={props => <List.Icon {...props} icon="checkbox-blank-circle" />}
//                         // file-eye-outline
//                         style={styles.list}
//                         title={date}
//                         description={location}
//                         right={props => <View {...props}>
//                             <View style={styles.actionBtns}>
//                                 <IconButton mode="outlined" onPress={() => navigation.navigate("Details", {item})} icon="arrow-right-bold" />                                
//                             </View>
//                         </View>}
//                     />
//                 }}
//             />}

//     </SafeAreaView>
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     buttonContainer: {
//         marginTop: 20
//     },
//     title: {
//         color: theme.colors.primary
//     },
//     fab: {
//         position: "absolute",
//         right: 40,
//         bottom: 40
//     },
//     actionBtns: {
//         flexDirection: "row"
//     },
//     loading: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     list: {
//         padding: 5,
//         backgroundColor:"white",
//         // marginTop:10,
//         marginHorizontal:10,
//         marginBottom: 10,
//         borderRadius: 10
//     }
// })



import { FlatList, StyleSheet, View, Alert } from "react-native";
import { ActivityIndicator, Appbar, Button, FAB, IconButton, List, Text } from "react-native-paper";
import theme from "../../config/theme";

import auth from '@react-native-firebase/auth';
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Home() {
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = useAuth();

    console.log(user.uid);
    const query = firestore()
        .collection("schedule")
        .where("userId", "==", user.uid)
        // .orderBy("createdAt", "desc");

        // const query = firestore()
//         .collection("schedule")
//         .where("userId", "==", user?.uid)
//         .orderBy("createdAt", "desc");

        // auth().signOut();
    const [data, loading] = useCollectionData(query, { idField: "id" });
// 
    // console.log(user.uid, user.displayName)
    console.log(data);

    // for( var i = 0; i < data.length; i++){ 
    
    //     if ( data[i].userId === 5) { 
    
    //         arr.splice(i, 1); 
    //     }
    
    // }

    // data = [
    //     {description:
    //         "Pemain piano berpengalaman lebih dari 10 tahun"
    //         ,fee:
    //         "IDR 120.000",
    //         instrument:
    //         "Piano",
    //         names:
    //         "James Adam"}

    // ]
    
    return <SafeAreaView style={styles.container}>
        <Appbar>
            <Appbar.Content title=" Buat Jadwal dengan Guru Privat Musik" />
        </Appbar>

        {loading ?
            <View style={styles.loading}>
                <ActivityIndicator />
            </View>
            :
            <FlatList

                data={data}
                renderItem={({ item }) => {
                    const { date, location, time } = item;
                    return <List.Item
                        // left={props => <List.Icon {...props} icon="checkbox-blank-circle" />}
                        // file-eye-outline
                        style={styles.list}
                        title={date}
                        description={time}
                        right={props => <View {...props}>
                            <View style={styles.actionBtns}>
                                <IconButton mode="outlined" onPress={() => navigation.navigate("Details", {item})} icon="arrow-right-bold" />                                
                            </View>
                        </View>}
                    />
                }}
            />}


        {/* <View style={{padding:20}}></View> */}

    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonContainer: {
        marginTop: 20,
        width:" 90%"
    },
    title: {
        color: theme.colors.primary
    },
    actionBtns: {
        flexDirection: "row"
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    list: {
        padding: 5,
        backgroundColor:"white",
        // marginTop:10,
        marginHorizontal:10,
        marginBottom: 10,
        borderRadius: 10
    }
})