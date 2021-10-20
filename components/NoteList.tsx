import React from "react";
import { View } from '../components/Themed';
import { Note } from "./Types";
import { Alert, FlatList, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { getNotes } from "./functions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NoteList({ notes, getAllNotes }: any) {

    const removeNote = async (note: Note) => {
        let arrAux: Note[];
        arrAux = await getNotes() !== null ? await getNotes() : [];
        arrAux = arrAux.filter(x => x.id !== note.id)
        console.log(arrAux)
        try {
            const jsonValue = JSON.stringify(arrAux)
            await AsyncStorage.setItem('notes', jsonValue)
        } catch (e) {
        }
        getAllNotes()
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={{ width: '100%' }}
                data={notes}
                keyExtractor={(item: Note, index: number) => index.toString()}
                renderItem={({ item }) =>
                    <View
                        key={item.id}
                        style={styles.itemContainer}>
                        <Text style={styles.title}>{item.subject}</Text>
                        <View style={styles.subView}>
                            <Feather name="more-horizontal" size={24} color="black" onPress={() => Alert.alert("Detalhes", String(item.note))} />
                            <FontAwesome5 name="trash-alt" size={24} color="red" onPress={() => removeNote(item)} />
                        </View>
                    </View>
                }
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 20,
    },
    title: {
        fontSize: 25,
        marginLeft: 10,
        color: 'black',
        fontFamily: 'Roboto_400Regular',
        maxWidth: '70%',
        flexWrap: 'wrap',
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#d9d9d9',
        marginBottom: 20,
        paddingRight: 30,
    },
    subView: {
        flexDirection: 'row',
        minWidth: 70,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});
