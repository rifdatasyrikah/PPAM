import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Image } from "react-native";
import { Button, Text } from "react-native-paper";
import theme from "../../config/theme";

export default function Success() {

    const navigation = useNavigation();

    return <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>Jadwal Berhasil Dibuat</Text>
        <Text variant="titleMedium" style={styles.subtitle}>Gurumu akan memberikan konfirmasi jika mereka menyetujui jadwal yang diajukan</Text>
        
        <Image source={require('ppam-museek/assets/success.png')} style={styles.logo}/>

        <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={() => navigation.navigate("Home")}>Kembali Ke Beranda</Button>
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
        width: "85%",
        padding: 30
    },
    padding: {
        marginTop: 10
    },
    title: {
        marginTop: 20,
        color: theme.colors.primary,
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
        width:150,
        height:150
    },
})