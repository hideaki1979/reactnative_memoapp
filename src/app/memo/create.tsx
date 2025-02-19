import {
    View, StyleSheet, TextInput, KeyboardAvoidingView
} from "react-native"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/Icon"
import { router } from "expo-router"

const handlePress = (): void => {
    // メモ登録処理後にメモ一覧へ遷移
    router.back()
}

const Create = () => {
    return (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput multiline value="" style={styles.input} />
            </View>
            <CircleButton onPress={handlePress}>
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