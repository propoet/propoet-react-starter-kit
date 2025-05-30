import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tabs, Dropdown, Button } from 'antd'
import { CloseOutlined, MoreOutlined, HomeOutlined, InfoCircleOutlined, CloudUploadOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

interface Tab {
  key: string
  label: string
  path: string
  closable: boolean
}

const defaultTabs: Tab[] = [
  { key: 'home', label: '首页', path: '/', closable: false },
]

// 页面图标映射
const getPageIcon = (path: string, isActive: boolean = false) => {
  const iconStyle = {
    fontSize: '14px',
    marginRight: '8px',
    transition: 'all 0.2s ease'
  }

  const iconProps = {
    style: iconStyle,
    className: isActive ? 'active' : ''
  }

  switch (path) {
    case '/':
    case '/home':
      return <HomeOutlined {...iconProps} />
    case '/about':
      return <InfoCircleOutlined {...iconProps} />
    case '/upload':
      return <CloudUploadOutlined {...iconProps} />
    case '/profile':
      return <UserOutlined {...iconProps} />
    default:
      return <HomeOutlined {...iconProps} />
  }
}

const TabManager: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [tabs, setTabs] = useState<Tab[]>(defaultTabs)
  const [activeKey, setActiveKey] = useState('home')
  const [isLoading, setIsLoading] = useState(false)

  // 监听路由变化，自动添加或切换标签页
  useEffect(() => {
    const currentPath = location.pathname
    const pathToLabelMap: Record<string, string> = {
      '/': '首页',
      '/home': '首页',
      '/about': '关于',
      '/upload': '上传',
      '/profile': '个人资料'
    }
    
    const label = pathToLabelMap[currentPath] || '未知页面'
    const tabKey = currentPath === '/' ? 'home' : currentPath.slice(1)

    setTabs(prevTabs => {
      // 检查标签页是否已存在
      const existingTab = prevTabs.find(tab => tab.path === currentPath)
      
      if (!existingTab) {
        // 添加新标签页
        const newTab: Tab = {
          key: tabKey,
          label,
          path: currentPath,
          closable: currentPath !== '/', // 首页不可关闭
        }
        return [...prevTabs, newTab]
      }
      
      return prevTabs
    })
    
    setActiveKey(tabKey)
  }, [location.pathname])

  // 切换标签页
  const handleTabChange = (key: string) => {
    setIsLoading(true)
    const tab = tabs.find(t => t.key === key)
    if (tab) {
      setActiveKey(key)
      navigate(tab.path)
    }
    // 模拟页面加载延迟
    setTimeout(() => setIsLoading(false), 200)
  }

  // 关闭标签页
  const handleTabClose = (targetKey: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (tabs.length === 1) return
    
    const targetIndex = tabs.findIndex(tab => tab.key === targetKey)
    const newTabs = tabs.filter(tab => tab.key !== targetKey)
    
    if (activeKey === targetKey && newTabs.length > 0) {
      const newActiveTab = targetIndex > 0 
        ? newTabs[targetIndex - 1] 
        : newTabs[0]
      setActiveKey(newActiveTab.key)
      navigate(newActiveTab.path)
    }
    
    setTabs(newTabs)
  }

  // 关闭其他标签页
  const handleCloseOthers = () => {
    const currentTab = tabs.find(tab => tab.key === activeKey)
    const homeTabs = tabs.filter(tab => !tab.closable)
    
    if (currentTab && currentTab.closable) {
      setTabs([...homeTabs, currentTab])
    } else {
      setTabs(homeTabs)
    }
  }

  // 关闭所有可关闭的标签页
  const handleCloseAll = () => {
    const nonClosableTabs = tabs.filter(tab => !tab.closable)
    setTabs(nonClosableTabs)
    if (nonClosableTabs.length > 0) {
      navigate(nonClosableTabs[0].path)
    }
  }

  const menuItems: MenuProps['items'] = [
    {
      key: 'close-others',
      label: '关闭其他',
      disabled: tabs.length <= 1,
      onClick: handleCloseOthers,
    },
    {
      key: 'close-all',
      label: '关闭所有',
      onClick: handleCloseAll,
    },
  ]

  const tabItems = tabs.map(tab => {
    const isActive = tab.key === activeKey
    return {
      key: tab.key,
      label: (
        <div className="tab-label-container">
          {getPageIcon(tab.path, isActive)}
          <span 
            style={{ 
              fontSize: '13px', 
              lineHeight: '1.2',
              maxWidth: '120px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </span>
          {tab.closable && (
            <Button
              type="text"
              size="small"
              className="tab-close-btn"
              style={{
                width: '18px',
                height: '18px',
                minWidth: '18px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                marginLeft: '8px'
              }}
              icon={<CloseOutlined style={{ fontSize: '10px' }} />}
              onClick={(e) => handleTabClose(tab.key, e)}
            />
          )}
          {isLoading && isActive && (
            <div 
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(22, 119, 255, 0.04)',
                borderRadius: '6px'
              }}
            >
              <div className="loading-spinner"></div>
            </div>
          )}
        </div>
      ),
      children: null,
    }
  })

  return (
    <div className="tab-manager-container">
      <Tabs
        type="editable-card"
        hideAdd
        activeKey={activeKey}
        onChange={handleTabChange}
        items={tabItems}
        className="custom-tabs"
        tabBarStyle={{ 
          margin: 0, 
          background: 'transparent',
          borderBottom: 'none'
        }}
        tabBarExtraContent={{
          right: tabs.length > 1 ? (
            <Dropdown 
              menu={{ items: menuItems }} 
              trigger={['click']} 
              placement="bottomRight"
            >
              <Button 
                type="text" 
                size="small" 
                icon={<MoreOutlined />}
                className="tab-more-btn"
                style={{
                  marginRight: '12px',
                  borderRadius: '6px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
            </Dropdown>
          ) : null
        }}
      />
    </div>
  )
}

export default TabManager 