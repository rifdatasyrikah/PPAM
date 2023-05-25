import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Image, StyleSheet, View,Text, Alert } from "react-native";
import { Button, HelperText, IconButton, TextInput, FAB, Avatar  } from "react-native-paper";
import theme from "../../config/theme";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from "../../contexts/AuthProvider";
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';

import { SafeAreaView } from "react-native-safe-area-context";

export default function SetSchedule() {
    const navigation = useNavigation();
    const { user } = useAuth();
    const route = useRoute();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("")
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const [names, setNames] = useState(route.params?.item?.names ?? "");
    const [instrument, setInstrument] = useState(route.params?.item?.instrument ?? "");
    const [fee, setFee] = useState(route.params?.item?.fee ?? "");
    const [description, setDescription] = useState(route.params?.item?.description ?? "");
    const [imageUrl, setImageUrl] = useState(route.params?.item?.imageUrl ?? "");
    

    // const [names, setnames] = useState(route.params?.item?.names ?? "");
    const [image, setImage] = useState(route.params?.item?.imageUrl ?? null);

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

    const handleSubmit = async () => {
        // console.log(user.uid, title, description)

        if (loading) {
            // skip submitting if loading
            return false;
        }
        const findErrors = validate();

        if (Object.values(findErrors)?.some(value => value !== "")) {
            setErrors(findErrors);
        } else {
            setLoading(true)

            try {
                setNames(route.params.item.names);
                setInstrument(route.params.item.instrument);
                setFee(route.params.item.fee);
                setDescription(route.params.item.description);
                setImageUrl(route.params.image);
                await firestore().collection("schedule").add({
                    userId: user.uid,
                    date,
                    time,
                    location,
                    names,
                    instrument,
                    description,
                    imageUrl,
                    fee,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                    updatedAt: firestore.FieldValue.serverTimestamp(),
                });
                // console.log("success")

                // if (route.params?.mode === "create") {
                //     await firestore().collection("schedule").add({
                //         userId: user.uid,
                //         date,
                //         time,
                //         location,
                //         names,
                //         instrument,
                //         fee,
                //         createdAt: firestore.FieldValue.serverTimestamp(),
                //         // updatedAt: firestore.FieldValue.serverTimestamp(),
                //     });
                // } else {
                //     await firestore().collection("schedule").doc(route.params?.item?.id).set({
                //         userId: user.uid,
                //         date,
                //         time,
                //         location,
                //         names,
                //         instrument,
                //         fee,
                //         createdAt: firestore.FieldValue.serverTimestamp(),
                //         // updatedAt: firestore.FieldValue.serverTimestamp(),
                //     }, { merge: true })
                // }


                navigation.navigate("Success");
            } catch (e) {
                console.log("e", e)
            }
            setLoading(false);
        }
    }

    return <SafeAreaView style={styles.container}>
         <IconButton 
            mode="outlined"
            onPress={() => navigation.navigate("Teacher", {category:route.params.category})}
            style={styles.fab}
            icon={"arrow-left"}
        />

        <Text variant="headlineLarge" style={styles.title}>Buat Jadwal</Text>
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

        {/* <Text variant="titleLarge" style={styles.subtitile}>Login</Text> */}
        <View style={styles.formContainer}>
            <TextInput
                mode="outlined"
                placeholder="Tanggal"
                value={date}
                onChangeText={handleChange(setDate)}
                left={<TextInput.Icon icon="calendar" />}
                error={errors?.empty ? true : false}
                disabled={loading}
            />
            <TextInput
                mode="outlined"
                placeholder="Waktu"
                value={time}
                onChangeText={handleChange(setTime)}
                left={<TextInput.Icon icon="clock" />}
                error={errors?.empty ? true : false}
                disabled={loading}
            />
            <TextInput
                mode="outlined"
                placeholder="Lokasi"
                value={location}
                onChangeText={handleChange(setLocation)}
                left={<TextInput.Icon icon="map-marker" />}
                error={errors?.empty ? true : false}
                disabled={loading}
            />
            <HelperText
                type="error"
                visible={errors?.empty ? true : false}
                style={{color: "red"}}
            >
                {errors.empty}
            </HelperText>

            <View style={styles.btnContainer}>
                <Button
                    disabled={loading}
                    mode="contained" onPress={handleSubmit}>Simpan</Button>
                <View style={{padding:5}}></View>
                {/* <Button mode="outlined" onPress={() => navigation.navigate("Home")}>Kembali</Button> */}
            </View>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    teacherContainer: {
        flexDirection: "row",
        width: "90%",
        padding: 20,
        margin: 20,
        marginRight: 20,
        borderRadius: 20,
        backgroundColor:"white",
    }, teacher: {
        width: 220,
        paddingRight: 10
    },
    formContainer: {
        width: "100%",
        padding: 20
    },
    btnContainer: {
        marginTop: 20
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
        height: 100,
        borderRadius: 20

    },
    btnRemoveImg: {
        position: "absolute",
        top: -20,
        right: -20
    },
    fab: {
        position: "relative",
        left: -150,
        top: -100
    },
    imgPreview: {
        width: 100,
        height: 100

    }

})