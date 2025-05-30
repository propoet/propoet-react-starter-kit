import React, { useState } from 'react'
import { Form, Input, Button, Card, Typography, Space, message, Checkbox } from 'antd'
import { UserOutlined, LockOutlined, RocketOutlined } from '@ant-design/icons'
import useAuthStore from '@/store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph, Text } = Typography

interface LoginForm {
  username: string
  password: string
  remember?: boolean
}

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleSubmit = async (values: LoginForm) => {
    setLoading(true)
    try {
      // 模拟登录API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟登录成功
      const userData = {
        id: '1',
        name: values.username,
        username: values.username,
        email: values.username === 'admin' ? 'admin@example.com' : 'user@example.com',
        role: values.username === 'admin' ? 'admin' : 'user',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + values.username
      }
      
      login(userData)
      message.success('登录成功！')
      navigate('/')
    } catch {
      message.error('登录失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f2f5 0%, #e6f7ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative'
    }}>
      {/* 背景装饰 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(22, 119, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(22, 119, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: 0.5
      }} />

      <Card
        style={{
          width: '100%',
          maxWidth: '400px',
          background: 'var(--component-background)',
          border: '1px solid var(--border-color-split)',
          borderRadius: '12px',
          boxShadow: 'var(--box-shadow-base)',
          position: 'relative'
        }}
        bodyStyle={{ padding: '40px' }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Logo和标题 */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              color: 'var(--primary-color)',
              marginBottom: '16px'
            }}>
              <RocketOutlined />
            </div>
            <Title 
              level={2} 
              style={{ 
                color: 'var(--text-color)',
                margin: '0 0 8px 0',
                fontSize: '28px',
                fontWeight: 'bold'
              }}
            >
              管理平台
            </Title>
            <Paragraph style={{ 
              color: 'var(--text-color-secondary)',
              margin: 0,
              fontSize: '14px'
            }}>
              欢迎回来，请登录您的账户
            </Paragraph>
          </div>

          {/* 登录表单 */}
          <Form
            name="login"
            onFinish={handleSubmit}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: 'var(--text-color-tertiary)' }} />}
                placeholder="用户名"
                style={{
                  borderRadius: '8px',
                  height: '48px'
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: 'var(--text-color-tertiary)' }} />}
                placeholder="密码"
                style={{
                  borderRadius: '8px',
                  height: '48px'
                }}
              />
            </Form.Item>

            <Form.Item>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox style={{ 
                    color: 'var(--text-color-secondary)',
                    fontSize: '14px'
                  }}>
                    记住我
                  </Checkbox>
                </Form.Item>
                <Button 
                  type="link" 
                  style={{ 
                    color: 'var(--primary-color)',
                    padding: 0,
                    fontSize: '14px'
                  }}
                >
                  忘记密码？
                </Button>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  width: '100%',
                  height: '48px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                {loading ? '登录中...' : '登录'}
              </Button>
            </Form.Item>
          </Form>

          {/* 演示信息 */}
          <div style={{
            background: 'rgba(22, 119, 255, 0.04)',
            border: '1px solid rgba(22, 119, 255, 0.1)',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <Text style={{ 
              color: 'var(--primary-color)',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'block',
              marginBottom: '8px'
            }}>
              🎯 演示账户
            </Text>
            <Text style={{ 
              color: 'var(--text-color-secondary)',
              fontSize: '11px',
              display: 'block',
              lineHeight: '1.4'
            }}>
              用户名：admin / 密码：任意密码
              <br />
              用户名：user / 密码：任意密码
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  )
}

export default LoginPage
