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

export default function Home() {
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = useAuth();
    const query = firestore()
        .collection("teachers")
        .orderBy("instrument");

        // auth().signOut();
    const [data, loading] = useCollectionData(query, { idField: "id" });
// 
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
    
    return <SafeAreaView style={styles.container}>
        <Appbar>
            <Appbar.Content title=" Buat Jadwal dengan Guru Privat Musik" />
        </Appbar>

        {loading ?
            <View style={styles.loading}>
                <ActivityIndicator />
            </View>
            :

            <FlatList
                data={data}
                renderItem={({ item }) => {
                    const { names, instrument } = item;
                    let iconInstrument = "";
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

                    return <List.Item
                        // left={props => <List.Icon {...props} icon="checkbox-blank-circle" />}
                        style={styles.list}
                        title={names}
                        description={instrument}

                        left={props => <List.Icon {...props} icon={iconInstrument} />}

                        right={props => <View {...props}>
                            <View style={styles.actionBtns}>
                                <IconButton mode="outlined" onPress={() => navigation.navigate("SetSchedule", {item})} icon="calendar-clock" />
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
    buttonContainer: {
        marginTop: 20,
        width:" 90%"
    },
    title: {
        color: theme.colors.primary
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