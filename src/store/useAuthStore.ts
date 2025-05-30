import {create} from 'zustand'

interface AuthState {
    user: {
        name: string
    } | null
    login: (username: string) => void
    logout: () => void
}
const useAuthStore = create<AuthState>((set) => ({
    user: null, // 初始状态为未登录
    login: (username: string) => set({ user: { name: username } }),
    logout: () => set({user: null}),
}))

export default useAuthStore
