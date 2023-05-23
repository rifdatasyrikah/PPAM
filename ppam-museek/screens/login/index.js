import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, HelperText } from "react-native-paper";
import theme from "../../config/theme";
import auth from '@react-native-firebase/auth';

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const handleChange = setField => text => {
        setField(text);
        setErrors({})
    }

    const validate = () => {

        const newErrors = {};

        if (!email || !password) {
            newErrors.empty = "Field email dan password tidak boleh ada yang kosong";
        } 
        return newErrors;
    }

    const handleLogin = async () => {
        try {
            const findErrors = validate();
            if (Object.values(findErrors)?.some(value => value !== "")) {
                setErrors(findErrors);
            } else {
                await auth().signInWithEmailAndPassword(email, password)
            }
        } catch (e) {
            console.log("error", e);
            // alert("Email atau kata sandi yang anda masukkan salah");
            const newErrors = {};
            newErrors.unmatch = "Email atau kata sandi yang anda masukkan salah.";
            setErrors(newErrors);
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
                error={errors?.empty ? true : false}
                // autoFocus
            /> 
            <TextInput
                mode="outlined"
                placeholder="Password"
                value={password}
                onChangeText={handleChange(setPassword)}
                error={errors?.empty ? true : false}
                secureTextEntry
            />
            <HelperText
                type="error"
                visible={errors?.empty ? true : false || errors?.unmatch ? true : false}
                style={{color: "red"}}
            >
                { 
                    errors?.empty ? errors.empty : errors.unmatch
                }
            </HelperText>
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
        marginTop: 10
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