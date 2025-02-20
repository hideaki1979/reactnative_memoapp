import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import Icon from "./Icon"
import { Link } from "expo-router"
import { type Memo } from "../../types/memo"

interface Props {
    memo: Memo
}

const MemoListItem = (props: Props): JSX.Element | null => {
    const { memo } = props
    const { bodyText, updatedAt } = memo
    if (bodyText === null || updatedAt === null) { return null }
    const dateStr = updatedAt.toDate().toLocaleString("ja-JP")
    return (
        // メモ詳細画面へ遷移
        <Link
            href={{ pathname: "/memo/detail", params: { id: memo.id } }}
            asChild
        >
            <TouchableOpacity style={styles.memoListItem}>
                <View>
                    <Text numberOfLines={1} style={styles.memoListItemTitle}>{bodyText}</Text>
                    <Text style={styles.memoListItemDate}>{dateStr}</Text>
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