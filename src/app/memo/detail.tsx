import { View, Text, StyleSheet, ScrollView } from "react-native"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/Icon"
import { router } from "expo-router"

const handlePress = (): void => {
    // アカウント登録処理
    router.push("/memo/edit")
}

const Detail = () => {
    return (
        <View style={styles.container}>
            <View style={styles.memoHeader}>
                <Text style={styles.memoHeaderTitle}>買い物リスト</Text>
                <Text style={styles.memoHeaderDate}>2025年2月17日</Text>
            </View>
            <ScrollView style={styles.memoContent}>
                <Text style={styles.memoContentText}>
                    買い物リスト書体やレイアウトなどを確認するために用います。本文用なので使い方を間違えると不自然に見えることもありますので要注意。
                </Text>
            </ScrollView>
            <CircleButton style={{ top: 64, bottom: 'auto' }} onPress={handlePress}>
                <Icon name="pencil" size={40} color="#fff" />
            </CircleButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    memoHeader: {
        backgroundColor: "#467FD3",
        height: 100,
        justifyContent: "center",
        paddingVertical: 24,
        paddingHorizontal: 20
    },
    memoHeaderTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 32
    },
    memoHeaderDate: {
        color: '#fff',
        fontSize: 12,
        lineHeight: 16
    },
    memoContent: {
        paddingHorizontal: 27,
        paddingVertical: 32
    },
    memoContentText: {
        fontSize: 16,
        lineHeight: 24
    }
})

export default Detail