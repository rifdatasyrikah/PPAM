import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Image, StyleSheet, View, FlatList } from "react-native";
import { Button, HelperText, IconButton, Text, TextInput, ActivityIndicator } from "react-native-paper";
import theme from "../../config/theme";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from "../../contexts/AuthProvider";

import { useCollectionData } from 'react-firebase-hooks/firestore';

import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';

export default function Profile() {
    const navigation = useNavigation();
    const { user } = useAuth();
    const route = useRoute();
    const [errors, setErrors] = useState({});
    // const [image, setImage] = useState(route.params?.item?.imageUrl ?? null);

    const query = firestore()
        .collection("profile")
        .where("userId", "==", user?.uid);

    const [data, loading] = useCollectionData(query, { idField: "id" });



    const handleChange = setField => text => {
        setField(text);
        setErrors({})
    }

    const handleLogout = ()=> {
        auth().signOut();
    }

    return <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>Halo {user.displayName}</Text>
        
        <View style={styles.formContainer}>
        
        {/*             
        {loading ?
            <View style={styles.loading}>
                <ActivityIndicator />
            </View>
            :
            <FlatList

                data={data}
                renderItem={({ item }) => {
                    const { name, email, address, phone } = item;
                    return <List.Item
                        name={name}
                        email={email}
                        address={address}
                        phone={phone}
                    />
                }}
            />} */}

            <View style={styles.btnContainer}>
                {/* <Button
                    disabled={loading}
                    mode="outlined" onPress={() => navigation.navigate("Home")}>Ubah Profil</Button> */}
                <View style={styles.padding}></View>
                <Button mode="contained" onPress={handleLogout}>Keluar Akun</Button>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    formContainer: {
        width: "100%",
        padding: 20,
        marginTop: 8,
    },
    btnContainer: {
        marginTop: 20
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
    }
})