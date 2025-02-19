import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import Icon from "./Icon"
import { Link } from "expo-router"

const MemoListItem = () => {
    return (
        // メモ詳細画面へ遷移
        <Link href={"/memo/detail"} asChild>
            <TouchableOpacity style={styles.memoListItem}>
                <View>
                    <Text style={styles.memoListItemTitle}>買い物リスト</Text>
                    <Text style={styles.memoListItemDate}>2025年2月17日</Text>
                </View>
                <TouchableOpacity onPress={() => { Alert.alert("削除ボタンが押されました") }}>
                    <Icon name="delete" size={32} color="#808080" />
                </TouchableOpacity>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    memoListItem: {
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 20,
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.15)"
    },
    memoListItemTitle: {
        fontSize: 16,
        lineHeight: 32
    },
    memoListItemDate: {
        fontSize: 12,
        lineHeight: 16,
        color: "#848484"
    }
})

export default MemoListItem