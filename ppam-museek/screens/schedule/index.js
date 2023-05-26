import { FlatList, StyleSheet, View, Alert } from "react-native";
import { ActivityIndicator, Appbar, Button, FAB, IconButton, List, Text, Avatar } from "react-native-paper";
import theme from "../../config/theme";

import auth from '@react-native-firebase/auth';
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useCollectionData } from 'react-firebase-hooks/firestore';


export default function Schedule() {
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = useAuth();
    const query = firestore()
        .collection("schedule")
        .where("userId", "==", user.uid);
    // .where("instrument", "==", route.params.category);

        // auth().signOut();
    const [data, loading] = useCollectionData(query, { idField: "id" });
// 
    // if (data.length != 0) {
        return <SafeAreaView style={styles.container}>
            <Appbar>
                <Appbar.Content title="Jadwal Belajar Kamu" style={{alignItems: "center"}} />
            </Appbar>

            {loading ?
                <View style={styles.loading}>
                    <ActivityIndicator />
                </View>
                :
                <FlatList
                    data={data}

                    renderItem={({ item }) => {
                        const { date, location, time, instrument } = item;
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
                            // file-eye-outline
                            style={styles.list}
                            title={date}
                            description={time}

                            
                            left={props => <List.Icon {...props} icon={iconInstrument} />}

                            right={props => <View {...props}>
                                <View style={styles.actionBtns}>
                                    <IconButton mode="outlined" onPress={() => navigation.navigate("Details", {item})} icon="arrow-right-bold" />                                
                                </View>
                            </View>}
                        />
                    }}
                />}


            {/* <View style={{padding:20}}></View> */}

        </SafeAreaView>
    // } else {
    //     return <SafeAreaView style={styles.container}>
    //     <Appbar>
    //         <Appbar.Content title="Jadwal Belajar Kamu" style={{alignItems: "center"}} />
    //     </Appbar>

    //     {loading ?
    //             <View style={styles.loading}>
    //                 <ActivityIndicator />
    //             </View>
    //             :
                
    //             <View style={styles.titleContainer}>
    //                 <Text variant="headlineSmall" style={styles.title}>AAA MAU NANGIS </Text>
    //             </View>
    //     }
        
    //     </SafeAreaView>
    // }
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