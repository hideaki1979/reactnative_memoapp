import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native"
import { signOut } from "firebase/auth"
import { auth } from "../config"
import { router } from "expo-router"

const handlePress = (): void => {
    signOut(auth)
        .then(() => {
            Alert.alert("ログアウトしました")
            router.replace("/auth/login")
        })
        .catch((error) => {
            console.error(error)
            Alert.alert("ログアウトエラー:", error.message)
        })
}

const LogOutButton = () => {
    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={styles.buttonLabel}>ログアウト</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonLabel: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 12,
        lineHeight: 24
    }
})

export default LogOutButton