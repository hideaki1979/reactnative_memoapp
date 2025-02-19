import { View, StyleSheet } from "react-native"
import MemoListItem from "../../components/MemoListItem"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/Icon"
import { router, useNavigation } from "expo-router"
import { useEffect } from "react"
import LogOutButton from "../../components/LogOutButton"

const handlePress = (): void => {
    // メモ作成画面へ遷移
    router.push("/memo/create")
}

const List = () => {
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => { return <LogOutButton /> }
        })
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <MemoListItem />
                <MemoListItem />
                <MemoListItem />
            </View>
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