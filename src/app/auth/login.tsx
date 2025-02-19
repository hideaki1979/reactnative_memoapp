import { Text, View, StyleSheet, TextInput } from 'react-native'
import Header from '../../components/Header'

const Login = () => {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.inner}>
                <Text style={styles.title}>Log In</Text>
                <TextInput style={styles.input} value='Email Address' />
                <TextInput style={styles.input} value='Password' />
                <View style={styles.button}>
                    <Text style={styles.buttonLabel}>Submit</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Not registered?</Text>
                    <Text style={styles.footerLink}>Sign up here!</Text>
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
    button: {
        backgroundColor: '#467FD3',
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 24
    },
    buttonLabel: {
        color: '#FFFFFF',
        fontSize: 16,
        lineHeight: 32,
        paddingVertical: 8,
        paddingHorizontal: 24
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