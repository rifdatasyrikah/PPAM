import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import theme from "../../config/theme";
import auth from '@react-native-firebase/auth';

export default function Register() {

    const navigation = useNavigation()

    const [name, setName] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = setField => text => {
        setField(text);
    }

    const handleRegister = async () => {
        try {

            await auth().createUserWithEmailAndPassword(email, password);
            const userInfo = {
                displayName: name,
                phoneNumber: phone,
              };
            await auth().currentUser.updateProfile(userInfo);
        } catch (e) {
            console.log("error", e)
        }

    }
    return <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>Selamat Datang</Text>
        <Text variant="titleSmall" style={styles.subtitile}>Buat akun dan temukan guru terbaik disini</Text>
        <View style={styles.formContainer}>
            <TextInput
                value={name}
                mode="outlined"
                placeholder="Nama"
                onChangeText={handleChange(setName)}
                autoFocus
            />
            <TextInput
                value={address}
                mode="outlined"
                onChangeText={handleChange(setAddress)}
                placeholder="Alamat"
            />
            <TextInput
                value={phone}
                mode="outlined"
                onChangeText={handleChange(setPhone)}
                placeholder="Nomor Telepon"
            />
            <TextInput
                value={email}
                mode="outlined"
                placeholder="Email"
                onChangeText={handleChange(setEmail)}
                autoFocus
            />
            <TextInput
                value={password}
                mode="outlined"
                placeholder="Kata Sandi"
                onChangeText={handleChange(setPassword)}
                secureTextEntry
            />
            <TextInput
                value={repeatPassword}
                mode="outlined"
                onChangeText={handleChange(setRepeatPassword)}
                placeholder="Ulang Kata Sandi"
                secureTextEntry
            />
            <View style={styles.btnContainer}>
                <Button mode="contained" onPress={handleRegister}>Daftar</Button>
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
        marginTop: 20,
    },
    title: {
        color: theme.colors.primary,
        fontWeight: "bold"
    },
    subtitile: {
        color: theme.colors.secondary,
        marginTop: 10
    }
})