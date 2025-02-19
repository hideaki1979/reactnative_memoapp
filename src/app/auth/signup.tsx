import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Button from '../../components/Button'
import { Link, router } from "expo-router"

const handlePress = (): void => {
    // アカウント登録処理後、メモ一覧へ遷移
    router.push("/memo/list")
}

const SignUp = () => {
    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput style={styles.input} value='Email Address' />
                <TextInput style={styles.input} value='Password' />
                <Button label={"Submit"} onPress={handlePress} />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already registered?</Text>
                    <Link href={"/auth/login"} asChild>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Log In</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8'
    },
    inner: {
        paddingHorizontal: 27,
        paddingVertical: 24
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 32,
        marginBottom: 24
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderColor: '#DDDDDD',
        height: 48,
        padding: 8,
        marginBottom: 16,
        borderWidth: 1,
        fontSize: 16
    },
    footer: {
        flexDirection: 'row'
    },
    footerText: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
        color: '#000000'
    },
    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        color: '#467FD3'
    }
})

export default SignUp