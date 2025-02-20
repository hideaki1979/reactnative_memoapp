import { View, StyleSheet, FlatList } from "react-native"
import MemoListItem from "../../components/MemoListItem"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/Icon"
import { router, useNavigation } from "expo-router"
import { useEffect, useState } from "react"
import LogOutButton from "../../components/LogOutButton"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db, auth } from "../../config"
import { type Memo } from "../../../types/memo"

const handlePress = (): void => {
    // メモ作成画面へ遷移
    router.push("/memo/create")
}

const List = () => {
    const [memos, setMemos] = useState<Memo[]>([])
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => { return <LogOutButton /> }
        })
    }, [])

    useEffect(() => {
        if (auth.currentUser === null) { return }
        const ref = collection(db, `users/${auth.currentUser.uid}/memos`)
        const q = query(ref, orderBy("updatedAt", "desc"))
        // onSnapshot() はデータベースの変更をリアルタイムで監視するため
        // 画面が消えた後も監視を続けるため、戻り値として監視を解除する関数を返す
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const memoList: Memo[] = []
            snapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data())
                const { bodyText, updatedAt } = doc.data()
                memoList.push({
                    id: doc.id,
                    bodyText,
                    updatedAt
                })
            })
            setMemos(memoList)
        })
        return unsubscribe
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={memos}
                renderItem={({ item }) => <MemoListItem memo={item} />}
            />
            <CircleButton onPress={handlePress}>
                <Icon name="plus" size={40} color="#fff" />
            </CircleButton>
        </View >
    )
}
// スタイルの定義
// React Native ではスタイルは StyleSheet.create() で定義する
// StyleSheet.create() はオブジェクトを返す
// React Nativeでは、Flexboxの考えが通常と逆で
// justifyContent が縦方向の配置、alignItems が横方向の配置を調整.
// flexDirection: "row" が横並び、 flexDirection: "column" が縦並びで
// flexDirection はデフォルトで column になっている
// flexDireciton: "row" にすると横並びになり、
// justifyContent が横方向の配置、alignItems が縦方向の配置を調整するので注意！！！
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
})

export default List