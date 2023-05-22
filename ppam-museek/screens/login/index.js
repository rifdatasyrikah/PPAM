import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import theme from "../../config/theme";
import auth from '@react-native-firebase/auth';

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = setField => text => {
        setField(text);
    }
    const handleLogin = async () => {
        try {

            await auth().signInWithEmailAndPassword(email, password)
        } catch (e) {
            console.log("error", e)
        }

    }
    return <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>Selamat Datang</Text>
        <Text variant="titleSmall" style={styles.subtitile}>Masuk dan mulailah cari guru musikmu</Text>
        <View style={styles.formContainer}>
            <TextInput
                mode="outlined"
                placeholder="Email"
                value={email}
                onChangeText={handleChange(setEmail)}
                autoFocus
            />
            <TextInput
                mode="outlined"
                placeholder="Password"
                value={password}
                onChangeText={handleChange(setPassword)}
                secureTextEntry
            />
            <View style={styles.btnContainer}>
                <Button mode="contained" onPress={handleLogin}>Masuk</Button>
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
    or: {
        alignSelf: "center",
        marginVertical: 4
    },
    title: {
        color: theme.colors.primary,
        fontWeight: "bold",
    },
    subtitile: {
        color: theme.colors.secondary,
        marginTop: 10
    }
})