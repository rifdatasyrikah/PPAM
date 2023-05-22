import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Image } from "react-native";
import { Button, Text } from "react-native-paper";
import theme from "../../config/theme";

export default function Landing() {

    const navigation = useNavigation();

    return <View style={styles.container}>
        <Text variant="displaySmall" style={styles.title}>Temukan Guru Musik Terbaik Disini!</Text>
        <Text variant="titleMedium" style={styles.subtitle}>Belajar musik dengan guru favoritmu dengan nyaman di manapun dan kapanpun kamu mau. Buat janji dengan guru privatmu dan mulailah raih impianmu dalam bermusik!</Text>
        
        <Image source={require('ppam-museek/assets/logo.png')} style={styles.logo}/>

        <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={() => navigation.navigate("Login")}>Masuk</Button>
            <View style={styles.padding}></View>
            <Button mode="outlined" onPress={() => navigation.navigate("Register")}>Buat Akun Baru</Button>
        </View>

    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer: {
        marginTop: 30,
        width: "100%",
        padding: 30
    },
    padding: {
        marginTop: 10
    },
    title: {
        marginTop: 20,
        color: theme.colors.secondary,
        textAlign: "center",
        fontWeight: "bold",
    },
    subtitle: {
        color: theme.colors.secondary,
        textAlign: "center",
        padding: 30
    },
    logo: {
        marginTop: 30,
        marginBottom:30,
        width:250,
        height:250
    },
})