import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import Icon from "./Icon"
import { Link } from "expo-router"
import { type Memo } from "../../types/memo"
import { deleteDoc, doc } from "firebase/firestore"
import { auth, db } from "../config"

interface Props {
    memo: Memo
}

const handlePress = (id: string): void => {
    if (auth.currentUser === null) { return }
    const ref = doc(db, `users/${auth.currentUser.uid}/memos/`, id)
    Alert.alert("メモを削除します", "よろしいですか？", [
        {
            text: "キャンセル",
            style: "cancel"
        },
        {
            text: "削除する",
            onPress: () => {
                deleteDoc(ref)
                    .catch((error) => {
                        console.error("Error writing document: ", error)
                        Alert.alert("メモ削除に失敗しました！", error.message)
                    })
            }
        }
    ])
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
                <TouchableOpacity onPress={() => { handlePress(memo.id) }}>
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