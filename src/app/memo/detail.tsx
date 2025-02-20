import { View, Text, StyleSheet, ScrollView } from "react-native"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/Icon"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { auth, db } from "../../config"
import { doc, onSnapshot } from "firebase/firestore"
import { Memo } from "../../../types/memo"


const handlePress = (id: string): void => {
    // アカウント登録処理
    router.push({ pathname: "/memo/edit", params: { id } })
}

const Detail = () => {
    const id = String(useLocalSearchParams().id)

    const [memo, setMemo] = useState<Memo | null>(null)
    useEffect(() => {
        if (auth.currentUser === null) { return }
        const ref = doc(db, `users/${auth.currentUser.uid}/memos/${id}`)
        // onSnapshot() はデータベースの変更をリアルタイムで監視するため
        // 画面が消えた後も監視を続けるため、戻り値として監視を解除する関数を返す
        const onsubscribe = onSnapshot(ref, (memoDoc) => {
            // console.log(memoDoc.data())
            const { bodyText, updatedAt } = memoDoc.data() as Memo
            setMemo({
                id: memoDoc.id,
                bodyText,
                updatedAt
            })
        })
        return onsubscribe
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.memoHeader}>
                <Text
                    style={styles.memoHeaderTitle}
                    numberOfLines={1}
                >
                    {memo?.bodyText}
                </Text>
                <Text style={styles.memoHeaderDate}>{memo?.updatedAt?.toDate().toLocaleString('ja-JP')}</Text>
            </View>
            <ScrollView style={styles.memoContent}>
                <Text style={styles.memoContentText}>
                    {memo?.bodyText}
                </Text>
            </ScrollView>
            <CircleButton style={{ top: 64, bottom: 'auto' }} onPress={() => handlePress(id)}>
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
        paddingHorizontal: 27
    },
    memoContentText: {
        paddingVertical: 32,
        fontSize: 16,
        lineHeight: 24
    }
})

export default Detail