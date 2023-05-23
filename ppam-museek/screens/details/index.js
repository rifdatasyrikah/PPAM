import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Image, StyleSheet, View,Text } from "react-native";
import { Button, HelperText, IconButton, TextInput } from "react-native-paper";
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
    const [names, setNames] = useState("");
    const [instrument, setInstrument] = useState("");
    const [fee, setFee] = useState("");
    // const [names, setnames] = useState(route.params?.item?.names ?? "");
    // const [image, setImage] = useState(route.params?.item?.imageUrl ?? null);

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

                }
            },
        ]);

    }


    return <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>Jadwal</Text>
        <View style={styles.teacher}>
            <Text style={{fontSize: 20, fontWeight: "bold", paddingBottom:10}}>{route.params.item.names}</Text>
            <Text style={styles.subtitle}>Guru {route.params.item.instrument}</Text>
            <Text style={styles.subtitle}>{route.params.item.description}</Text>
            <Text style={{color: "#8099FF", paddingTop:10}}>Biaya/jam: {route.params.item.tarif}</Text>
        </View>
        
        <View style={styles.btnContainer}>
                <Button
                    disabled={loading}
                    mode="contained" onPress={handleDelete}>Batalkan Jadwal</Button>
                <View style={{padding:5}}></View>
                {/* <Button mode="outlined" onPress={() => navigation.navigate("Home")}>Kembali</Button> */}
        </View>

    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    teacher: {
        width: "90%",
        padding: 20,
        marginTop: 20,
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
    }
})