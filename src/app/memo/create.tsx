import {
    View, StyleSheet, TextInput, KeyboardAvoidingView
} from "react-native"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/Icon"
import { router } from "expo-router"
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { db, auth } from "../../config"
import { useState } from "react"

const handlePress = async (bodyText: string): Promise<void> => {
    // メモ登録処理後にメモ一覧へ遷移
    if (auth.currentUser === null) { return }
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`)
    await addDoc(ref, {
        bodyText,
        updatedAt: Timestamp.fromDate(new Date())
    })
        .catch((error) => {
            console.error("Error writing document: ", error)
        })

    router.back()

    /*
    addDoc(collection(db, "memos"), {
        bodyText: "メモの本文",
        updatedAt: new Date()
    })
        .then((docRef) => {
            console.log("Document successfully written!", docRef.id)
            router.back()
        })
        .catch((error) => {
            console.error("Error writing document: ", error)
        })
    */
}

const Create = () => {
    const [bodyText, setBodyText] = useState("")
    return (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    value={bodyText}
                    style={styles.input}
                    onChangeText={(text) => { setBodyText(text) }}
                    autoCapitalize="none"
                    autoFocus
                />
            </View>
            <CircleButton onPress={() => { handlePress(bodyText) }}>
                <Icon name="check" size={40} color="#fff" />
            </CircleButton>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    inputContainer: {
        flex: 1,
        paddingHorizontal: 27,
        paddingVertical: 32
    },
    input: {
        flex: 1,
        textAlignVertical: "top",
        fontSize: 16,
        lineHeight: 24
    }
})

export default Create