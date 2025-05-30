import React from 'react';
import { Card, Typography, Space, Row, Col, Timeline, Tag } from 'antd';
import { 
  RocketOutlined, 
  TeamOutlined, 
  CodeOutlined, 
  BugOutlined,
  StarOutlined,
  GithubOutlined,
  HeartOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: <RocketOutlined style={{ color: 'var(--primary-color)' }} />,
      title: '现代化技术栈',
      description: '基于 React 18 + TypeScript + Ant Design 5.x 构建'
    },
    {
      icon: <TeamOutlined style={{ color: 'var(--success-color)' }} />,
      title: '多标签页管理',
      description: '支持多标签页切换，提升用户体验'
    },
    {
      icon: <CodeOutlined style={{ color: 'var(--warning-color)' }} />,
      title: '权限控制',
      description: '完善的权限管理系统，支持角色和菜单权限'
    },
    {
      icon: <BugOutlined style={{ color: 'var(--error-color)' }} />,
      title: '响应式设计',
      description: '适配各种屏幕尺寸，支持移动端访问'
    }
  ];

  const versions = [
    {
      version: 'v2.0.0',
      date: '2024-03-15',
      type: 'major',
      title: '现代化重构',
      changes: [
        '升级到 Ant Design 5.x',
        '采用现代化设计风格',
        '优化用户体验',
        '提升性能表现'
      ]
    },
    {
      version: 'v1.2.0',
      date: '2024-02-01',
      type: 'feature',
      title: '权限系统',
      changes: [
        '新增角色管理',
        '菜单权限控制',
        '用户权限分配',
        '权限验证中间件'
      ]
    },
    {
      version: 'v1.1.0',
      date: '2024-01-15',
      type: 'feature',
      title: '多标签页系统',
      changes: [
        '标签页管理',
        '页面缓存',
        '标签页拖拽',
        '快捷键支持'
      ]
    },
    {
      version: 'v1.0.0',
      date: '2024-01-01',
      type: 'initial',
      title: '项目初始化',
      changes: [
        '基础框架搭建',
        '路由系统',
        '基础组件',
        '主题配置'
      ]
    }
  ];

  const getVersionColor = (type: string) => {
    switch (type) {
      case 'major': return 'var(--error-color)'
      case 'feature': return 'var(--primary-color)'
      case 'fix': return 'var(--warning-color)'
      case 'initial': return 'var(--success-color)'
      default: return 'var(--text-color-secondary)'
    }
  }

  const getVersionTag = (type: string) => {
    const config = {
      major: { color: 'red', text: '重大更新' },
      feature: { color: 'blue', text: '新功能' },
      fix: { color: 'orange', text: '修复' },
      initial: { color: 'green', text: '初始版本' }
    }
    const item = config[type as keyof typeof config]
    return <Tag color={item.color}>{item.text}</Tag>
  }

  return (
    <div style={{ 
      padding: '0',
      background: 'transparent',
      minHeight: '100%'
    }}>
      {/* 项目介绍 */}
      <Card
        style={{
          background: 'var(--component-background)',
          border: '1px solid var(--border-color-split)',
          borderRadius: '12px',
          marginBottom: '24px'
        }}
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <Title level={1} style={{ 
            color: 'var(--text-color)',
            fontSize: '42px',
            fontWeight: 'bold',
            margin: '0 0 16px 0'
          }}>
            🚀 React 管理平台
          </Title>
          <Paragraph style={{ 
            color: 'var(--text-color-secondary)',
            fontSize: '18px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            基于 React 18 + TypeScript + Ant Design 构建的现代化管理系统，
            提供完整的权限管理、多标签页、响应式设计等功能。
          </Paragraph>
        </div>
      </Card>

      {/* 核心特性 */}
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <StarOutlined style={{ color: 'var(--primary-color)' }} />
            <span style={{ color: 'var(--text-color)', fontSize: '18px', fontWeight: 'bold' }}>核心特性</span>
          </div>
        }
        style={{
          background: 'var(--component-background)',
          border: '1px solid var(--border-color-split)',
          borderRadius: '12px',
          marginBottom: '24px'
        }}
      >
        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <div style={{
                background: 'var(--background-color-light)',
                border: '1px solid var(--border-color-split)',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                height: '100%',
                transition: 'all 0.2s ease'
              }}
              className="feature-card">
                <div style={{ 
                  fontSize: '32px',
                  marginBottom: '12px'
                }}>
                  {feature.icon}
                </div>
                <Title level={4} style={{ 
                  color: 'var(--text-color)',
                  margin: '0 0 8px 0'
                }}>
                  {feature.title}
                </Title>
                <Text style={{ color: 'var(--text-color-secondary)' }}>
                  {feature.description}
                </Text>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* 版本历史 */}
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CodeOutlined style={{ color: 'var(--primary-color)' }} />
            <span style={{ color: 'var(--text-color)', fontSize: '18px', fontWeight: 'bold' }}>版本历史</span>
          </div>
        }
        style={{
          background: 'var(--component-background)',
          border: '1px solid var(--border-color-split)',
          borderRadius: '12px',
          marginBottom: '24px'
        }}
      >
        <Timeline
          items={versions.map((version, index) => ({
            color: getVersionColor(version.type),
            children: (
              <div style={{
                background: 'var(--background-color-light)',
                border: '1px solid var(--border-color-split)',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: index < versions.length - 1 ? '16px' : '0'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <Text strong style={{ 
                    color: 'var(--text-color)',
                    fontSize: '16px'
                  }}>
                    {version.version}
                  </Text>
                  {getVersionTag(version.type)}
                  <Text style={{ 
                    color: 'var(--text-color-secondary)',
                    fontSize: '12px'
                  }}>
                    {version.date}
                  </Text>
                </div>
                <Title level={5} style={{ 
                  color: 'var(--text-color)',
                  margin: '0 0 8px 0'
                }}>
                  {version.title}
                </Title>
                <ul style={{ 
                  margin: 0,
                  paddingLeft: '20px',
                  color: 'var(--text-color-secondary)'
                }}>
                  {version.changes.map((change, changeIndex) => (
                    <li key={changeIndex}>{change}</li>
                  ))}
                </ul>
              </div>
            )
          }))}
        />
      </Card>

      {/* 技术栈 */}
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CodeOutlined style={{ color: 'var(--primary-color)' }} />
            <span style={{ color: 'var(--text-color)', fontSize: '18px', fontWeight: 'bold' }}>技术栈</span>
          </div>
        }
        style={{
          background: 'var(--component-background)',
          border: '1px solid var(--border-color-split)',
          borderRadius: '12px',
          marginBottom: '24px'
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <div style={{
              background: 'var(--background-color-light)',
              border: '1px solid var(--border-color-split)',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <Title level={5} style={{ 
                color: 'var(--text-color)',
                margin: '0 0 12px 0'
              }}>
                前端技术
              </Title>
              <Space wrap>
                <Tag color="blue">React 18</Tag>
                <Tag color="blue">TypeScript</Tag>
                <Tag color="blue">Ant Design 5</Tag>
                <Tag color="blue">React Router</Tag>
                <Tag color="blue">Zustand</Tag>
                <Tag color="blue">Vite</Tag>
              </Space>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div style={{
              background: 'var(--background-color-light)',
              border: '1px solid var(--border-color-split)',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <Title level={5} style={{ 
                color: 'var(--text-color)',
                margin: '0 0 12px 0'
              }}>
                开发工具
              </Title>
              <Space wrap>
                <Tag color="green">ESLint</Tag>
                <Tag color="green">Prettier</Tag>
                <Tag color="green">Husky</Tag>
                <Tag color="green">Commitlint</Tag>
                <Tag color="green">VS Code</Tag>
                <Tag color="green">Git</Tag>
              </Space>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 开源信息 */}
      <Card
        style={{
          background: 'var(--component-background)',
          border: '1px solid var(--border-color-split)',
          borderRadius: '12px'
        }}
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ 
            fontSize: '48px',
            color: 'var(--primary-color)',
            marginBottom: '16px'
          }}>
            <GithubOutlined />
          </div>
          <Title level={3} style={{ 
            color: 'var(--text-color)',
            margin: '0 0 8px 0'
          }}>
            开源项目
          </Title>
          <Paragraph style={{ 
            color: 'var(--text-color-secondary)',
            marginBottom: '16px'
          }}>
            本项目基于 MIT 协议开源，欢迎 Star 和贡献代码
          </Paragraph>
          <Space>
            <Text style={{ color: 'var(--text-color-secondary)' }}>
              Made with <HeartOutlined style={{ color: 'var(--error-color)' }} /> by ProPoet Team
            </Text>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default AboutPage;
