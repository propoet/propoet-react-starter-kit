import { Navigate } from "react-router-dom"
import { type ReactNode } from "react"
import useAuthStore from "@/store/useAuthStore"

interface RequireAuthProps {
    children: ReactNode
}

export default function RequireAuth({children}: RequireAuthProps){
    const {user} = useAuthStore()
    if(!user){
        return <Navigate to="/login" />
    }
    return children
}