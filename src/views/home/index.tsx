import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Statistic, Typography, Space, Spin } from 'antd'
import { UserOutlined, FileOutlined, CloudUploadOutlined, BarChartOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const stats = [
    { title: '总用户数', value: 1234, icon: <UserOutlined />, color: 'var(--primary-color)' },
    { title: '文件总数', value: 5678, icon: <FileOutlined />, color: 'var(--success-color)' },
    { title: '上传次数', value: 9012, icon: <CloudUploadOutlined />, color: 'var(--warning-color)' },
    { title: '系统访问', value: 3456, icon: <BarChartOutlined />, color: 'var(--error-color)' },
  ]

  const recentActivities = [
    { id: 1, title: '用户管理模块优化', time: '2小时前', type: 'update' },
    { id: 2, title: '新增文件上传功能', time: '5小时前', type: 'feature' },
    { id: 3, title: '系统性能提升', time: '1天前', type: 'improvement' },
    { id: 4, title: '修复已知问题', time: '2天前', type: 'fix' },
  ]

  return (
    <div style={{ 
      padding: '0',
      background: 'transparent',
      minHeight: '100%'
    }}>
      {/* 欢迎区域 */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(22, 119, 255, 0.08) 0%, rgba(22, 119, 255, 0.04) 100%)',
        border: '1px solid var(--border-color-split)',
        borderRadius: '12px',
        padding: '32px',
        marginBottom: '24px',
        position: 'relative'
      }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title 
              level={1} 
              style={{ 
                color: 'var(--text-color)',
                fontSize: '42px',
                fontWeight: 'bold',
                margin: 0
              }}
            >
              🚀 管理平台
            </Title>
            <Paragraph 
              style={{ 
                color: 'var(--text-color-secondary)',
                fontSize: '18px',
                marginTop: '16px'
              }}
            >
              基于 React 18 + TypeScript + Ant Design 构建的现代化管理系统
            </Paragraph>
          </div>
        </Space>
      </div>

      {/* 统计数据 */}
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              style={{
                background: 'var(--component-background)',
                border: '1px solid var(--border-color-split)',
                borderRadius: '12px',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
              className="stat-card"
              bodyStyle={{ padding: '24px' }}
              hoverable
            >
              <div style={{ 
                color: stat.color,
                fontSize: '32px',
                marginBottom: '12px'
              }}>
                {stat.icon}
              </div>
              <Statistic
                title={stat.title}
                value={stat.value}
                valueStyle={{ 
                  color: stat.color,
                  fontWeight: 'bold'
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* 最新动态 */}
      <Card
        title={
          <span style={{
            color: 'var(--text-color)',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            📡 最新动态
          </span>
        }
        style={{
          background: 'var(--component-background)',
          border: '1px solid var(--border-color-split)',
          borderRadius: '12px'
        }}
        bodyStyle={{ padding: '24px' }}
      >
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
            <div style={{ 
              marginTop: '16px', 
              color: 'var(--text-color-secondary)'
            }}>
              正在加载数据...
            </div>
          </div>
        ) : (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                style={{
                  background: 'var(--background-color-light)',
                  border: '1px solid var(--border-color-split)',
                  borderRadius: '8px',
                  padding: '16px',
                  transition: 'all 0.2s ease'
                }}
                className="file-item"
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ 
                    color: 'var(--text-color)',
                    fontWeight: '500'
                  }}>
                    {activity.title}
                  </span>
                  <span style={{ 
                    color: 'var(--text-color-secondary)',
                    fontSize: '12px'
                  }}>
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </Space>
        )}
      </Card>
    </div>
  )
}

export default HomePage

