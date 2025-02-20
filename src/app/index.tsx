import { Redirect, router } from "expo-router"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../config"
import { useEffect } from "react"

const Index = () => {
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user !== null) {
                // ログイン済みの場合、メモ一覧へ遷移
                router.replace("/memo/list")
            }
        })
    }, [])

    return <Redirect href={'auth/login'} />
}

export default Index