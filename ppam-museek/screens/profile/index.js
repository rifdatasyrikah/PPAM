// import { useNavigation, useRoute } from "@react-navigation/native";
// import { useState } from "react";
// import { Image, StyleSheet, View, FlatList } from "react-native";
// import { Button, HelperText, IconButton, Text, TextInput, ActivityIndicator } from "react-native-paper";
// import theme from "../../config/theme";
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import { useAuth } from "../../contexts/AuthProvider";

// import { useCollectionData } from 'react-firebase-hooks/firestore';

// import storage from '@react-native-firebase/storage';
// import * as ImagePicker from 'expo-image-picker';

// export default function Profile() {
//     const navigation = useNavigation();
//     const { user } = useAuth();
//     const route = useRoute();
//     const [errors, setErrors] = useState({});
//     // const [image, setImage] = useState(route.params?.item?.imageUrl ?? null);

//     // auth().signOut();

//     // const query = firestore()
//     //     .collection("profile")
//     //     .where("userId", "==", user?.uid);

//     // const [data2, loading] = useCollectionData(query, { idField: "id" });

//     // const [name, setName] = useState(data2[0]?.name ?? "");
//     // const [address, setAddress] = useState(data2[0]?.address ?? "");
//     // const [phone, setPhone] = useState(data2[0]?.phone ?? "");
//     // const [email, setEmail] = useState(data2[0]?.address ?? "");

//     const handleChange = setField => text => {
//         setField(text);
//         setErrors({})
//     }

//     const handleLogout = ()=> {
//         auth().signOut();
//     }
    

//     // console.log(user.uid);
    
//     // console.log(data2);
//     // console.log(data2[0].name);
//     // console.log(data2[0].address);
    
    
//     // const [address, setName] = useState(data2[0].address ?? "");
    
//     return <View style={styles.container}>
//         <Text variant="headlineLarge" style={styles.title}>Halo {user.displayName}</Text>

//         {/* <View style={styles.profileContainer}>         
//             <Text style={styles.itemTitle}>Nama</Text>
//             <Text style={styles.item}>{data2[0].name}</Text>
//             <Text style={styles.itemTitle}>Email</Text>
//             <Text style={styles.item}>{data2[0].email}</Text>
//             <Text style={styles.itemTitle}>Alamat</Text>
//             <Text style={styles.item}>{data2[0].address}</Text>
//             <Text style={styles.itemTitle}>Nomor Telepon</Text>
//             <Text style={styles.item}>{data2[0].phone}</Text>
//         </View> */}

//         <View style={styles.btnContainer}>
//             {/* <Button
//                 disabled={loading}
//                 mode="outlined" onPress={() => navigation.navigate("Home")}>Ubah Profil</Button> */}
//             <View style={styles.padding}></View>
//             <Button mode="contained" onPress={handleLogout}>Keluar Akun</Button>
//         </View>
//     </View>
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     profileContainer: {
//         width: "90%",
//         padding: 20,
//         marginTop: 20,
//         borderRadius: 20,
//         backgroundColor:"white",
//         paddingRight: 100
//     },
//     btnContainer: {
//         marginTop: 20,
//         width: "90%"
//     },
//     padding: {
//         alignSelf: "center",
//         marginVertical: 4
//     },
//     title: {
//         color: theme.colors.primary,
//         fontWeight: "bold"
//     },
//     subtitile: {
//         color: theme.colors.secondary
//     },
//     imgPreview: {
//         width: 100,
//         height: 100
//     },
//     btnRemoveImg: {
//         position: "absolute",
//         top: -20,
//         right: -20
//     },
//     itemTitle: {
//         fontSize: 18, 
//         fontWeight: "bold", 
//         color: "#8099FF"
//     },
//     item: {
//         fontSize: 15, 
//         fontWeight: "bold", 
//         color: "#545151",
//         paddingBottom: 10
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
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';

export default function Home() {
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const query = firestore()
        .collection("profile")
        .where("userId", "==", user.uid)
        .limit(1);


    // const userId = user.id;
    
        // This works
        // const [data2] = useDocumentData(query);
// 
        // auth().signOut();

    
    const [data2, loading] = useDocumentData(query, { idField: "id" });
    // const [data2, loading] = useCollectionData(query, { idField: "id" });

    const handleLogout = ()=> {
                auth().signOut();
            }

    // console.log(user.uid, user.displayName)
    // console.log(data2);


    
    // const [name, setName] = useState(data2[0]?.name ?? "");
    // const [address, setAddress] = useState(data2[0]?.address ?? "");
    // const [phone, setPhone] = useState(data2[0]?.phone ?? "");
    // const [email, setEmail] = useState(data2[0]?.address ?? "");

    // console.log(name);
    // console.log(data2[0].name)

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
    
    return <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>Halo {user.displayName}</Text>

        {/* <View style={styles.profileContainer}>         
             <Text style={styles.itemTitle}>Nama</Text>
             <Text style={styles.item}>{data2[0].name}</Text>
             <Text style={styles.itemTitle}>Email</Text>
             <Text style={styles.item}>{data2[0].email}</Text>
             <Text style={styles.itemTitle}>Alamat</Text>
             <Text style={styles.item}>{data2[0].address}</Text>
             <Text style={styles.itemTitle}>Nomor Telepon</Text>
             <Text style={styles.item}>{data2[0].phone}</Text>
         </View> */}

         <View style={styles.btnContainer}>
             {/* <Button
                 disabled={loading}
                 mode="outlined" onPress={() => navigation.navigate("Home")}>Ubah Profil</Button> */}
             <View style={styles.padding}></View>
             <Button mode="contained" onPress={handleLogout}>Keluar Akun</Button>
         </View>
     </View>
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    profileContainer: {
        width: "90%",
        padding: 20,
        marginTop: 20,
        borderRadius: 20,
        backgroundColor:"white",
        paddingRight: 100
    },
    btnContainer: {
        marginTop: 20,
        width: "90%"
    },
    padding: {
        alignSelf: "center",
        marginVertical: 4
    },
    title: {
        color: theme.colors.primary,
        fontWeight: "bold"
    },
    subtitile: {
        color: theme.colors.secondary
    },
    imgPreview: {
        width: 100,
        height: 100
    },
    btnRemoveImg: {
        position: "absolute",
        top: -20,
        right: -20
    },
    itemTitle: {
        fontSize: 18, 
        fontWeight: "bold", 
        color: "#8099FF"
    },
    item: {
        fontSize: 15, 
        fontWeight: "bold", 
        color: "#545151",
        paddingBottom: 10
    }
})
