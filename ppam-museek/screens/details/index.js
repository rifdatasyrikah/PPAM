import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Image, StyleSheet, View,Text, Alert } from "react-native";
import { Button, Dialog, IconButton, Portal, Avatar } from "react-native-paper";
import theme from "../../config/theme";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from "../../contexts/AuthProvider";
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';

export default function Details() {
    const navigation = useNavigation();
    const { user } = useAuth();
    const route = useRoute();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("")
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    // const [names, setnames] = useState(route.params?.item?.names ?? "");
    // const [image, setImage] = useState(route.params?.item?.imageUrl ?? null);

     
    const [names, setNames] = useState(route.params?.item?.names ?? "");
    const [instrument, setInstrument] = useState(route.params?.item?.instrument ?? "");
    const [fee, setFee] = useState(route.params?.item?.fee ?? "");
    const [description, setDescription] = useState(route.params?.item?.description ?? "");
    const [imageUrl, setImageUrl] = useState(route.params?.item?.imageUrl ?? "");
    
    // const [names, setnames] = useState(route.params?.item?.names ?? "");
    // const [image, setImage] = useState(null);

    // const getImage = async () => {
    //     const storageRef = storage().ref(`/images/teacher/${imageUrl}`);
    //     // console.log(imageUrl)
    //     // const image = null;
    //     i = await storageRef.getDownloadURL();
    //     setImage(i)
    //     // console.log(image);
    //     // return image
    // }

    // getImage();
    // console.log(image)


    const handleChange = setField => text => {
        setField(text);
        setErrors({})
    }

    const validate = () => {

        const newErrors = {};

        if (!date || !time || !location) {
            newErrors.empty = "Tidak boleh ada field yang kosong";
        } 
        return newErrors;
    }

    const handleDelete = item => e => {
        Alert.alert('Konfirmasi Pembatalan Jadwal', 'Apakah kamu yakin mau membatalkan jadwal ini?', [
            {
                text: 'Tidak',
                onPress: () => { },
                style: 'tidak',
            },
            {
                text: 'Yakin', onPress: async () => {

                    await firestore().collection("schedule").doc(item.id).delete();
                    navigation.navigate("Schedule")
                }
            },
        ]);
    }

    let item = route.params.item;

    return <View style={styles.container}>
        <IconButton 
            mode="outlined"
            onPress={() => navigation.navigate("Schedule")}
            style={styles.fab}
            icon={"arrow-left"}
        />

        <Text variant="headlineLarge" style={styles.title}>Jadwal Belajar {instrument}</Text>

        
        <View style={styles.teacherContainer}>
            <View style={styles.teacher}>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>{route.params.item.names}</Text>
                <Text style={{color: "#8099FF", paddingBottom:10}}>Guru {route.params.item.instrument}</Text>
                <Text style={styles.subtitle}>{route.params.item.description}</Text>
                <Text style={{color: "#8099FF", paddingTop:10}}>Biaya/jam: {route.params.item.fee}</Text>
            </View>
            {/* <Image source={{ uri: route.params.image }} style={styles.imgPreview} /> */}
            <Avatar.Image size={100} source={{uri: route.params.item.imageUrl}}/>
        </View>

        <View style={styles.schedule}>
            <Text style={styles.itemTitle}>Tanggal</Text>
            <Text style={styles.item}>{route.params.item.date}</Text>
            <Text style={styles.itemTitle}>Waktu</Text>
            <Text style={styles.item}>{route.params.item.time}</Text>
            <Text style={styles.itemTitle}>Lokasi</Text>
            <Text style={styles.item}>{route.params.item.location}</Text>
            <Text style={{color: "#8099FF", paddingTop:10, fontWeight:"bold"}}>Biaya/jam: {route.params.item.fee}</Text>
        </View>
        
        <View style={styles.btnContainer}>
                <Button mode="contained" onPress={handleDelete(route.params.item)}>Hapus Jadwal</Button>
                
                {/* <Button mode="contained" onPress={handleDelete(route.item)}>Batalkan Jadwal</Button> */}
                <View style={{padding:5}}></View>
                <Button mode="outlined" onPress={() => navigation.navigate("Reschedule", {item})}>Atur Ulang Jadwal</Button>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    schedule: {
        width: "90%",
        padding: 20,
        borderRadius: 20,
        backgroundColor:"white",
    },
    formContainer: {
        width: "100%",
        padding: 20
    },
    btnContainer: {
        marginTop: 20,
        padding: 20,
        width: "100%"
    },
    or: {
        alignSelf: "center",
        marginVertical: 4
    },
    title: {
        color: theme.colors.primary,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 30,
        marginBottom:5
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
        fontSize: 15, 
        fontWeight: "bold", 
        color: "#8099FF"
    },
    item: {
        fontSize: 15, 
        fontWeight: "bold", 
        // color: "#545151",
        paddingBottom: 10
    },
    fab: {
        position: "absolute",
        left: 20,
        top: 50
    },
    teacherContainer: {
        flexDirection: "row",
        width: "90%",
        padding: 20,
        margin: 20,
        borderRadius: 20,
        backgroundColor:"white",
        paddingRight: 100
    }, teacher: {
        marginRight: 50
    }
})