import { FlatList, StyleSheet, View, Alert } from "react-native";
import { ActivityIndicator, Appbar, Button, FAB, IconButton, List, Text } from "react-native-paper";
import theme from "../../config/theme";

import auth from '@react-native-firebase/auth';
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Teacher() {
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = useAuth();
    const query = firestore()
        .collection("teachers")
    .where("instrument", "==", route.params.category);

        // auth().signOut();
    const [data, loading] = useCollectionData(query, { idField: "id" });
// 

    const [category, setCategory] = useState(route.params?.category ?? "");
    // console.log(user.uid, user.displayName)
    // console.log(data);

    // data = [
    //     {description:
    //         "Pemain piano berpengalaman lebih dari 10 tahun"
    //         ,fee:
    //         "IDR 120.000",
    //         instrument:
    //         "Piano",
    //         names:
    //         "James Adam"}

    // ]

    let instrument = route.params.category;
    if (instrument == "Bass") {
        iconInstrument = "guitar-acoustic"
    } else if (instrument == "Biola") {
        iconInstrument = "violin"
    } else if (instrument == "Gitar") {
        iconInstrument = "guitar-electric"
    } else if (instrument == "Piano") {
        iconInstrument = "piano"
    } else if (instrument == "Vokal") {
        iconInstrument = "microphone-variant"
    }
    
    
    return <SafeAreaView style={styles.container}>
        {/* <Appbar>
            <Appbar.Content title=" Buat Jadwal dengan Guru Privat Musik"/>
        </Appbar> */}

        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.navigate("Home")} />
            <Appbar.Content title="Buat Jadwal Dengan Guru" />
            <Appbar.Action icon={iconInstrument} onPress={() => {}} />
        </Appbar.Header>

        {/* <View style={styles.titleContainer}>
            <Text variant="headlineLarge" style={styles.title}>Buat Jadwal dengan Guru Privat Musik {route.params.category}</Text>
        </View> */}


        {loading ?
            <View style={styles.loading}>
                <ActivityIndicator />
            </View>
            :

            <FlatList
                data={data}
                renderItem={({ item }) => {
                    const { names, instrument, fee } = item;
                    // let iconInstrument = "";
                    // if (instrument == "Bass") {
                    //     iconInstrument = "guitar-acoustic"
                    // } else if (instrument == "Biola") {
                    //     iconInstrument = "violin"
                    // } else if (instrument == "Gitar") {
                    //     iconInstrument = "guitar-electric"
                    // } else if (instrument == "Piano") {
                    //     iconInstrument = "piano"
                    // } else if (instrument == "Vokal") {
                    //     iconInstrument = "microphone-variant"
                    // }

                    return <List.Item
                        // left={props => <List.Icon {...props} icon="checkbox-blank-circle" />}
                        style={styles.list}
                        title={names}
                        description={fee}

                        left={props => <List.Icon {...props} icon={iconInstrument} />}

                        right={props => <View {...props}>
                            <View style={styles.actionBtns}>
                                <IconButton mode="outlined" onPress={() => navigation.navigate("SetSchedule", {item, category})} icon="calendar-clock" />
                            </View>
                        </View>}
                    />
                }}
            />
            }
        
        {/* <View style={{padding:20}}></View> */}

    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleContainer: {
        flex: 1,    
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    title: {
        color: theme.colors.primary,
        textAlign: "center",
        fontWeight: "bold"
    },
    actionBtns: {
        flexDirection: "row"
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    list: {
        padding: 5,
        backgroundColor:"white",
        // marginTop:10,
        marginHorizontal:10,
        marginBottom: 10,
        borderRadius: 10
    }
})