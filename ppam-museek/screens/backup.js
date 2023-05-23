import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, HelperText, IconButton, Text, TextInput } from "react-native-paper";
import theme from "../../config/theme";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from "../../contexts/AuthProvider";
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';

export default function ToDoForm() {
    const navigation = useNavigation();
    const { user } = useAuth();
    const route = useRoute();
    const [title, setTitle] = useState(route.params?.item?.title ?? "");
    const [description, setDescription] = useState(route.params?.item?.description ?? "");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(route.params?.item?.imageUrl ?? null);


    const handleChange = setField => text => {
        setField(text);
        setErrors({})
    }

    const handleLogout = ()=> {
        auth().signOut();
    }

    const validate = () => {

        const newErrors = {};

        if (!title) {
            newErrors.title = "Title is required";
        } else if (title.length <= 3) {
            newErrors.title = "Title must be at least 4 characters";
        }
        if (!description) {
            newErrors.description = "Description is required";
        } else if (description.length <= 8) {
            newErrors.description = "Description must be at least 8 characters";
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

                let imageUrl = null;

                if (image) {
                    const storageRef = storage().ref(`/images/todos/${Date.now()}.${image?.split?.(".")?.pop()}`);

                    await storageRef.putFile(image);

                    imageUrl = await storageRef.getDownloadURL();
                }

                if (route.params?.mode === "create") {
                    await firestore().collection("todos").add({
                        userId: user.uid,
                        title,
                        description,
                        imageUrl,
                        createdAt: firestore.FieldValue.serverTimestamp(),
                        updatedAt: firestore.FieldValue.serverTimestamp(),
                    });
                } else {
                    await firestore().collection("todos").doc(route.params?.item?.id).set({
                        title: user.uid,
                        title,
                        description,
                        imageUrl,
                        updatedAt: firestore.FieldValue.serverTimestamp()
                    }, { merge: true })
                }
                // console.log("success")
                navigation.navigate("Home");
            } catch (e) {
                console.log("e", e)
            }
            setLoading(false);
        }
    }

    const handlePickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }
    return <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>{route.params?.mode === "create" ? "Create " : "Update "} To Do</Text>
        {/* <Text variant="titleLarge" style={styles.subtitile}>Login</Text> */}
        <View style={styles.formContainer}>
            <TextInput
                mode="outlined"
                placeholder="Title"
                value={title}
                onChangeText={handleChange(setTitle)}
                left={<TextInput.Icon icon="format-title" />}
                error={errors?.title ? true : false}
                disabled={loading}
            />
            <HelperText
                type="error"
                visible={errors?.title ? true : false}
            >
                {errors.title}
            </HelperText>
            <TextInput
                mode="outlined"
                placeholder="Description"
                value={description}
                onChangeText={handleChange(setDescription)}
                multiline
                numberOfLines={5}
                style={{ height: 200 }}
                error={errors?.description ? true : false}
                disabled={loading}
            />
            <HelperText
                type="error"
                visible={errors?.description ? true : false}
            >
                {errors.description}
            </HelperText>
            <View>
                {!image && <IconButton disabled={loading} onPress={handlePickImage} mode="outlined" icon="attachment" />}

                {image && <View style={styles.imgPreview} >
                    <Image source={{ uri: image }} style={styles.imgPreview} />
                    <IconButton disabled={loading} onPress={() => setImage(null)} style={styles.btnRemoveImg} size={12} mode="contained" icon="close" />
                </View>}
            </View>

            <View style={styles.btnContainer}>
                <Button
                    disabled={loading}
                    mode="outlined" onPress={{}}>Ubah Profil</Button>
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
        color: theme.colors.primary
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