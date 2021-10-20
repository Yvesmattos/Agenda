import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ModalNota from '../components/ModalNota';
import { getNotes } from '../components/functions';
import NoteList from '../components/NoteList';
import { not } from 'react-native-reanimated';



export default function NoteScreen({ navigation }: RootTabScreenProps<'Note'>) {

  const [notes, setNotes] = useState<any>();

  const getAllNotes = async () => {

    let auxNotes = await getNotes();
    setNotes(auxNotes)
    console.log(notes)
  }

  useEffect(() => {
    getAllNotes()
  }, [])

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View style={[styles.buttonView, { opacity: modalVisible ? 0.9 : 1 }]}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: '#2196F3', borderRadius: 5,
            flexDirection: 'row', minWidth: 120, justifyContent: 'space-between', alignItems: 'center',
            margin: 5, minHeight: 40, paddingRight: 5
          }}
        >
          <MaterialIcons name="add" size={26} color="white" />
          <Text
            style={{ fontSize: 25, color: '#fff' }}>
            Anotação</Text>
        </TouchableOpacity>
        <ModalNota modalVisible={modalVisible} setModalVisible={setModalVisible} getAllNotes={getAllNotes} />
      </View>
      <View style={[styles.container, { opacity: modalVisible ? 0.9 : 1 }]}>
        <NoteList notes={notes} getAllNotes={getAllNotes} />
        <Text style={{
          fontSize: 30, marginBottom: 70, display: notes !== undefined && notes.length > 0 ? "none" : "flex",
          width: '100%', textAlign: 'center', marginTop: 250
        }}>Minhas anotações</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonView: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  }
});
