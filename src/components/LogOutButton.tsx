import { TouchableOpacity, Text, StyleSheet } from "react-native"

const LogOutButton = () => {
    return (
        <TouchableOpacity>
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