import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import Button from '../../components/Button'

import { Link, router } from "expo-router"
import { useState } from 'react'
import { auth } from '../../config'
import { signInWithEmailAndPassword } from '@firebase/auth'

const handlePress = (email: string, password: string): void => {
    // ログイン処理後、メモ一覧へ遷移
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            router.replace("/memo/list")
        })
        .catch((error) => {
            const { code, message } = error
            console.error(code, message)
            Alert.alert("Error:", message)
        })
}

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Log In</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    placeholder='Email Address'
                    textContentType='emailAddress'
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    autoCapitalize='none'
                    secureTextEntry
                    placeholder='Password'
                    textContentType='password'
                />
                <Button label={"Submit"} onPress={() => { handlePress(email, password) }} />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Not registered?</Text>
                    <Link href={"/auth/signup"} asChild replace>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Sign up here!</Text>
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

export default Login