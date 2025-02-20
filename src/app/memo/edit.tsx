import {
    View, StyleSheet, TextInput, KeyboardAvoidingView,
    Alert
} from "react-native"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/Icon"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { auth, db } from "../../config"
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore"

const handlePress = (id: string, bodyText: string): void => {
    if (auth.currentUser === null) { return }
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
    setDoc(ref, {
        bodyText,
        updatedAt: Timestamp.fromDate(new Date())
    }).then(() => {
        // console.log("Document successfully update written!")
        router.back()
    }).catch((error) => {
        console.error("Error writing document: ", error)
        Alert.alert("メモ更新に失敗しました！", error.message)
    })
    // メモ一覧へ遷移
}

const Edit = () => {
    const id = String(useLocalSearchParams().id)
    const [bodyText, setBodyText] = useState("")
    // console.log('editId: ', id)
    useEffect(() => {
        if (auth.currentUser === null) { return }
        const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
        getDoc(ref)
            .then((docRef) => {
                // console.log(docRef.data())
                const editBodyText = docRef?.data()?.bodyText
                setBodyText(editBodyText)
            })
            .catch((error) => {
                console.error("Error writing document: ", error)
            })

    }, [])
    return (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    value={bodyText}
                    style={styles.input}
                    onChangeText={(text) => { setBodyText(text) }}
                    autoFocus
                />
            </View>
            <CircleButton onPress={() => { handlePress(id, bodyText) }}>
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
        flex: 1
    },
    input: {
        flex: 1,
        textAlignVertical: "top",
        fontSize: 16,
        lineHeight: 24,
        paddingHorizontal: 27,
        paddingVertical: 32
    }
})

export default Edit