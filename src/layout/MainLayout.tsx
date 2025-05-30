import React, { useState } from 'react'
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  HomeOutlined, 
  InfoCircleOutlined, 
  CloudUploadOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  UploadOutlined
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuthStore from '@/store/useAuthStore'
import TabManager from './TabManager'

const { Header, Sider, Content } = Layout

interface MenuItem {
  key: string
  label: string
  path: string
  icon: React.ReactNode
}

const menuItems: MenuItem[] = [
  { key: '/home', label: '首页', path: '/', icon: <HomeOutlined /> },
  { key: '/user', label: '用户管理', path: '/user', icon: <UserOutlined /> },
  { key: '/upload', label: '文件上传', path: '/upload', icon: <UploadOutlined /> },
  { key: '/about', label: '关于', path: '/about', icon: <InfoCircleOutlined /> },
]

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          <UserOutlined style={{ marginRight: '8px' }} />
          个人资料
        </span>
      ),
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      label: (
        <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          <SettingOutlined style={{ marginRight: '8px' }} />
          设置
        </span>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <span style={{ color: '#ff7875' }}>
          <LogoutOutlined style={{ marginRight: '8px' }} />
          退出登录
        </span>
      ),
      onClick: handleLogout,
    },
  ]

  // 获取当前选中的菜单项
  const selectedKeys = menuItems
    .filter(item => item.path === location.pathname)
    .map(item => item.key)

  return (
    <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
      {/* 左侧菜单 */}
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={{
          height: '100vh',
          borderRight: '1px solid var(--border-color-split)',
          background: 'var(--component-background)'
        }}
        width={240}
        collapsedWidth={60}
      >
        <div 
          style={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '0' : '0 24px',
            borderBottom: '1px solid var(--border-color-split)',
            background: 'rgba(0, 212, 255, 0.1)'
          }}
        >
          {!collapsed && (
            <div style={{
              color: 'var(--tech-accent)',
              fontSize: '18px',
              fontWeight: 'bold',
              letterSpacing: '1px',
              textShadow: '0 0 10px var(--tech-primary)'
            }}>
              🚀 科技管理台
            </div>
          )}
          {collapsed && (
            <div style={{
              color: 'var(--tech-accent)',
              fontSize: '24px',
              textShadow: '0 0 10px var(--tech-primary)'
            }}>
              🚀
            </div>
          )}
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          items={menuItems.map(item => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
          }))}
          onClick={handleMenuClick}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.8)'
          }}
          theme="dark"
        />
      </Sider>

      <Layout>
        {/* 头部 */}
        <Header 
          style={{
            background: 'var(--component-background)',
            borderBottom: '1px solid var(--border-color-split)',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{
            color: 'var(--text-color)',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            管理系统
          </div>
          <div style={{
            color: 'var(--text-color)',
            fontSize: '14px'
          }}>
            欢迎使用
          </div>
        </Header>

        {/* 页签管理器 */}
        <TabManager />

        {/* 内容区域 */}
        <Content
          style={{
            background: 'var(--component-background)',
            padding: '16px 24px',
            minHeight: 'calc(100vh - 112px)',
            overflow: 'auto'
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout 