import {create} from 'zustand'

interface User {
    id: string
    name: string
    email: string
}

interface AuthState {
    user: User | null
    login: (user: User) => void
    logout: () => void
}
const useAuthStore = create<AuthState>((set) => ({
    user: null, // 初始状态为未登录
    login: (user: User) => set({ user }),
    logout: () => set({ user: null }),
}))

export default useAuthStore
