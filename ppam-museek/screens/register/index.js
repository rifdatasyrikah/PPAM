import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, HelperText } from "react-native-paper";
import theme from "../../config/theme";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useAuth } from "../../contexts/AuthProvider";

export default function Register() {
    const navigation = useNavigation()

    const [name, setName] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const handleChange = setField => text => {
        setField(text);
        setErrors({})
    }

    const validate = () => {

        const newErrors = {};

        if (!email || !password || !name || !address || !repeatPassword || !phone) {
            newErrors.empty = "Tidak boleh ada field yang kosong";
        } else if (password.length < 6) {
            newErrors.weak = "Kata sandi terlalu lemah, buat minimal 6 karakter";
        } else if (password != repeatPassword ){
            newErrors.unmatch = "Kata sandi tidak sesuai, cek ulang";
        } 
        return newErrors;
    }

    const handleSubmit = async () => {

        const findErrors = validate();

        if (Object.values(findErrors)?.some(value => value !== "")) {
            setErrors(findErrors);
        } else {
            
            const { user } = useAuth();
            
            console.log(user.uid, user.displayName ,name, email)
            try {
                await firestore().collection("profile").add({
                    userId: user.uid,
                    name: name,
                    phone: phone,
                    email: email,
                    address: address,
                    createdAt: firestore.FieldValue.serverTimestamp()
                });
            } catch (e) {
            console.log("e", e)
            }
        }
    }

    const handleRegister = async () => {
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
                await auth().createUserWithEmailAndPassword(email, password);
                const userInfo = {
                displayName: name,
                phoneNumber: phone,
                };
                await auth().currentUser.updateProfile(userInfo);    
            } catch (e) {
                console.log("error", e)
                const newErrors = {};
                newErrors.used = "Email tersebut sudah terdaftar, silakan login";
                setErrors(newErrors);
            }
            setLoading(false)
        }


               

    }

    // const actionCombined = async () => {
    //     handleRegister();
    //     handleSubmit();
    // } 

    return <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>Selamat Datang</Text>
        <Text variant="titleSmall" style={styles.subtitile}>Buat akun dan temukan guru terbaik disini</Text>
        <View style={styles.formContainer}>
            <TextInput
                value={name}
                mode="outlined"
                placeholder="Nama"
                onChangeText={handleChange(setName)}
                error={errors?.empty ? true : false}
                disabled={loading}
            />
            <TextInput
                value={address}
                mode="outlined"
                onChangeText={handleChange(setAddress)}
                placeholder="Alamat"
                error={errors?.empty ? true : false}
                disabled={loading}
            />
            <TextInput
                value={phone}
                mode="outlined"
                onChangeText={handleChange(setPhone)}
                placeholder="Nomor Telepon"
                error={errors?.empty ? true : false}
                disabled={loading}
            />
            <TextInput
                value={email}
                mode="outlined"
                placeholder="Email"
                onChangeText={handleChange(setEmail)}
                error={errors?.empty ? true : false}
                disabled={loading}
                // autoFocus
            />
            <TextInput
                value={password}
                mode="outlined"
                placeholder="Kata Sandi"
                onChangeText={handleChange(setPassword)}
                error={errors?.empty ? true : false}
                secureTextEntry
                disabled={loading}
            />
            <TextInput
                value={repeatPassword}
                mode="outlined"
                onChangeText={handleChange(setRepeatPassword)}
                placeholder="Ulang Kata Sandi"
                error={errors?.empty ? true : false}
                secureTextEntry
                disabled={loading}
            />
            <HelperText
                type="error"
                visible={errors?.empty ? true : false || errors?.unmatch ? true : false || errors?.used ? true : false || errors?.weak ? true : false}
                style={{color: "red"}}
            >
                {errors?.empty ? errors.empty : errors?.used ? errors.used : errors?.weak? errors.weak : errors.unmatch}
            </HelperText>
            <View style={styles.btnContainer}>
                <Button disabled={loading} mode="contained" onPress={handleRegister}>Daftar</Button>
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
        marginTop: 10,
    },
    title: {
        color: theme.colors.primary,
        fontWeight: "bold"
    },
    subtitile: {
        color: theme.colors.secondary,
        marginTop: 5
    }
})