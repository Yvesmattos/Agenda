import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveId = async (id: number) => {
  try {
    await AsyncStorage.setItem('idList', id.toString())
  } catch (e) {
    // saving error
  }
}


export const getId = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('idList')
    let id = jsonValue != null ? JSON.parse(jsonValue) : 1;
    return id;
  } catch (e) {
  }
}


export const getNotes = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('notes')
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    // read error
  }
}

export const removeFew = async () => {

  try {
    await AsyncStorage.removeItem('notes')
  } catch (e) {
    // remove error
  }
}

