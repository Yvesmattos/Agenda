import React, { useState } from "react";
import { Modal, TouchableHighlight, View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getId, getNotes, saveId } from "./functions";
import { Note } from "./Types";

export default function ModalNota({ modalVisible, setModalVisible, getAllNotes }: any) {
    const [modalSubject, setModalSubject] = useState<String>("")
    const [modalNote, setModalNote] = useState<String>("")



    const saveNote = async () => {
        let actualId = await getId();
        let note: Note = {
            id: actualId,
            subject: modalSubject,
            note: modalNote
        }
        storeData(note)
        saveId(actualId + 1)
    }

    const storeData = async (note: Note) => {
        let arrAux: any;
        arrAux = await getNotes() !== null ? await getNotes() : [];
        arrAux.push(note);
        console.log(arrAux)
        try {
            const jsonValue = JSON.stringify(arrAux)
            await AsyncStorage.setItem('notes', jsonValue)
        } catch (e) {
        }
        getAllNotes()
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Nova Nota</Text>
                        <TextInput
                            onChangeText={(e) => setModalSubject(e.trim())}
                            placeholder="Assunto"
                            style={{ borderColor: '#a6a6a6', minWidth: '90%', maxWidth: '90%', minHeight: 50, borderRadius: 5, borderWidth: 2, paddingLeft: 5, fontSize: 18 }}>
                        </TextInput>
                        <TextInput
                            onChangeText={(e) => setModalNote(e.trim())}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Anotação"
                            style={{ borderColor: '#a6a6a6', minWidth: '90%', maxWidth: '90%', borderRadius: 5, borderWidth: 2, paddingLeft: 5, fontSize: 18 }}>
                        </TextInput>
                        <View style={styles.buttonView}>
                            <TouchableHighlight
                                underlayColor={'#d8dbeb'}
                                style={styles.cancelar}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text style={[styles.textStyle, { color: "#2196F3" }]}>Cancelar</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor={'#6fb3e8'}
                                style={styles.salvar}
                                onPress={() => {
                                    setModalVisible(!modalVisible); saveNote();
                                }}>
                                <Text style={[styles.textStyle, { color: "white" }]}>Cadastrar</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        minHeight: "60%",
        minWidth: "85%",
        justifyContent: 'space-evenly'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20
    },
    cancelar: {
        borderRadius: 7,
        minHeight: 40,
        minWidth: 90,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e4e6f2'
    },
    salvar: {
        borderRadius: 7,
        minHeight: 40,
        minWidth: 90,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2196F3'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold'
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        minWidth: '70%'
    }
});