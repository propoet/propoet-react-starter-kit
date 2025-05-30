import { useState } from "react"
import useAuthStore from "@/store/useAuthStore"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [username, setUsername] = useState('')
    const { login } = useAuthStore()
    const navigate = useNavigate()
    
    const handleLogin = () => {
        if (username.trim()) {
            login(username)
            navigate('/')
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleLogin()
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">登录</h1>
                <div className="space-y-4">
                    <input 
                        className="w-full border-2 border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none transition-colors" 
                        type="text" 
                        placeholder="请输入用户名"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md transition-colors font-medium" 
                        onClick={handleLogin}
                        disabled={!username.trim()}
                    >
                        登录
                    </button>
                </div>
            </div>
        </div>
    )
}
