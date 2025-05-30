import React, { useState, useEffect } from 'react'
import {
  Card,
  Table,
  Button,
  Space,
  Input,
  Modal,
  Form,
  Select,
  Tag,
  Avatar,
  Tooltip,
  message,
  Row,
  Col,
  Statistic,
  Popconfirm,
  Badge
} from 'antd'
import {
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  CrownOutlined,
  SafetyOutlined,
  EyeOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'

const { Search } = Input
const { Option } = Select

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'user' | 'manager'
  status: 'active' | 'inactive' | 'pending'
  avatar?: string
  createTime: string
  lastLogin: string
  department: string
}

interface FormValues {
  name: string
  email: string
  phone: string
  role: 'admin' | 'user' | 'manager'
  status: 'active' | 'inactive' | 'pending'
  department: string
}

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedRole, setSelectedRole] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [form] = Form.useForm()

  // 模拟用户数据
  const mockUsers: User[] = [
    {
      id: '1',
      name: '张三',
      email: 'zhangsan@example.com',
      phone: '13800138001',
      role: 'admin',
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang',
      createTime: '2024-01-15',
      lastLogin: '2024-03-15 10:30',
      department: '技术部'
    },
    {
      id: '2',
      name: '李四',
      email: 'lisi@example.com',
      phone: '13800138002',
      role: 'manager',
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Li',
      createTime: '2024-02-01',
      lastLogin: '2024-03-14 16:45',
      department: '产品部'
    },
    {
      id: '3',
      name: '王五',
      email: 'wangwu@example.com',
      phone: '13800138003',
      role: 'user',
      status: 'inactive',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wang',
      createTime: '2024-02-15',
      lastLogin: '2024-03-10 09:15',
      department: '设计部'
    },
    {
      id: '4',
      name: '赵六',
      email: 'zhaoliu@example.com',
      phone: '13800138004',
      role: 'user',
      status: 'pending',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhao',
      createTime: '2024-03-01',
      lastLogin: '从未登录',
      department: '运营部'
    }
  ]

  // 统计数据
  const statistics = [
    {
      title: '总用户数',
      value: mockUsers.length,
      icon: <TeamOutlined style={{ color: 'var(--primary-color)' }} />,
      color: 'var(--primary-color)'
    },
    {
      title: '活跃用户',
      value: mockUsers.filter(u => u.status === 'active').length,
      icon: <CheckCircleOutlined style={{ color: 'var(--success-color)' }} />,
      color: 'var(--success-color)'
    },
    {
      title: '管理员',
      value: mockUsers.filter(u => u.role === 'admin').length,
      icon: <CrownOutlined style={{ color: 'var(--warning-color)' }} />,
      color: 'var(--warning-color)'
    },
    {
      title: '待审核',
      value: mockUsers.filter(u => u.status === 'pending').length,
      icon: <ExclamationCircleOutlined style={{ color: 'var(--error-color)' }} />,
      color: 'var(--error-color)'
    }
  ]

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      setUsers(mockUsers)
    } catch {
      message.error('获取用户列表失败')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingUser(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    form.setFieldsValue(user)
    setIsModalVisible(true)
  }

  const handleDelete = async (userId: string) => {
    try {
      // 模拟删除操作
      await new Promise(resolve => setTimeout(resolve, 500))
      setUsers(users.filter(u => u.id !== userId))
      message.success('删除成功')
    } catch {
      message.error('删除失败')
    }
  }

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true)
      // 模拟保存操作
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (editingUser) {
        // 编辑
        setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...values } : u))
        message.success('更新成功')
      } else {
        // 新增
        const newUser: User = {
          ...values,
          id: Date.now().toString(),
          createTime: new Date().toISOString().split('T')[0],
          lastLogin: '从未登录',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${values.name}`
        }
        setUsers([...users, newUser])
        message.success('添加成功')
      }
      
      setIsModalVisible(false)
      form.resetFields()
    } catch {
      message.error('操作失败')
    } finally {
      setLoading(false)
    }
  }

  const getRoleTag = (role: string) => {
    const roleConfig = {
      admin: { color: '#ff4d4f', text: '管理员', icon: <CrownOutlined /> },
      manager: { color: '#faad14', text: '经理', icon: <SafetyOutlined /> },
      user: { color: '#1890ff', text: '用户', icon: <UserOutlined /> }
    }
    const config = roleConfig[role as keyof typeof roleConfig]
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    )
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { status: 'success' as const, text: '活跃' },
      inactive: { status: 'default' as const, text: '非活跃' },
      pending: { status: 'warning' as const, text: '待审核' }
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge status={config.status} text={config.text} />
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchText.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const columns = [
    {
      title: '用户信息',
      key: 'userInfo',
      render: (record: User) => (
        <Space>
          <Avatar 
            src={record.avatar} 
            icon={<UserOutlined />}
            style={{ 
              border: '2px solid var(--primary-color)',
              boxShadow: '0 2px 8px rgba(22, 119, 255, 0.15)'
            }}
          />
          <div>
            <div style={{ color: 'var(--text-color)', fontWeight: 'bold' }}>
              {record.name}
            </div>
            <div style={{ color: 'var(--text-color-secondary)', fontSize: '12px' }}>
              <MailOutlined /> {record.email}
            </div>
          </div>
        </Space>
      )
    },
    {
      title: '联系方式',
      key: 'contact',
      render: (record: User) => (
        <div>
          <div style={{ color: 'var(--text-color)' }}>
            <PhoneOutlined /> {record.phone}
          </div>
          <div style={{ color: 'var(--text-color-secondary)', fontSize: '12px' }}>
            {record.department}
          </div>
        </div>
      )
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => getRoleTag(role)
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusBadge(status)
    },
    {
      title: '创建时间',
      key: 'createTime',
      render: (record: User) => (
        <div>
          <div style={{ color: 'var(--text-color)' }}>
            <CalendarOutlined /> {record.createTime}
          </div>
          <div style={{ color: 'var(--text-color-secondary)', fontSize: '12px' }}>
            最后登录: {record.lastLogin}
          </div>
        </div>
      )
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: User) => (
        <Space>
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              icon={<EyeOutlined />}
              style={{ color: 'var(--primary-color)' }}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              style={{ color: 'var(--warning-color)' }}
            />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm
              title="确定要删除这个用户吗？"
              onConfirm={() => handleDelete(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <Button 
                type="text" 
                icon={<DeleteOutlined />}
                style={{ color: 'var(--error-color)' }}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      )
    }
  ]

  return (
    <div style={{ 
      padding: '0',
      background: 'transparent',
      minHeight: '100%'
    }}>
      {/* 统计卡片 */}
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        {statistics.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card 
              style={{
                background: 'var(--component-background)',
                border: '1px solid var(--border-color-split)',
                borderRadius: '12px',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
              hoverable
            >
              <Statistic
                title={
                  <span style={{ color: 'var(--text-color-secondary)' }}>
                    {stat.title}
                  </span>
                }
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ 
                  color: stat.color,
                  fontSize: '28px',
                  fontWeight: 'bold'
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* 主要内容卡片 */}
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TeamOutlined style={{ color: 'var(--primary-color)' }} />
            <span style={{ color: 'var(--text-color)', fontSize: '18px', fontWeight: 'bold' }}>用户管理</span>
          </div>
        }
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
            style={{
              borderRadius: '8px'
            }}
          >
            添加用户
          </Button>
        }
        style={{
          background: 'var(--component-background)',
          border: '1px solid var(--border-color-split)',
          borderRadius: '12px'
        }}
      >
        {/* 搜索和筛选 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
          <Col xs={24} sm={8}>
            <Search
              placeholder="搜索用户名或邮箱"
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={12} sm={4}>
            <Select
              placeholder="角色筛选"
              value={selectedRole}
              onChange={setSelectedRole}
              style={{ width: '100%' }}
            >
              <Option value="all">全部角色</Option>
              <Option value="admin">管理员</Option>
              <Option value="manager">经理</Option>
              <Option value="user">用户</Option>
            </Select>
          </Col>
          <Col xs={12} sm={4}>
            <Select
              placeholder="状态筛选"
              value={selectedStatus}
              onChange={setSelectedStatus}
              style={{ width: '100%' }}
            >
              <Option value="all">全部状态</Option>
              <Option value="active">活跃</Option>
              <Option value="inactive">非活跃</Option>
              <Option value="pending">待审核</Option>
            </Select>
          </Col>
        </Row>

        {/* 用户表格 */}
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredUsers.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
          style={{
            background: 'transparent'
          }}
        />
      </Card>

      {/* 添加/编辑用户模态框 */}
      <Modal
        title={
          <div style={{ color: 'var(--text-color)', fontSize: '18px', fontWeight: 'bold' }}>
            {editingUser ? '编辑用户' : '添加用户'}
          </div>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        style={{
          top: 50
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: '20px' }}
        >
          <Form.Item
            name="name"
            label={<span style={{ color: 'var(--text-color)' }}>姓名</span>}
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input 
              placeholder="请输入姓名"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span style={{ color: 'var(--text-color)' }}>邮箱</span>}
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input 
              placeholder="请输入邮箱"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label={<span style={{ color: 'var(--text-color)' }}>手机号</span>}
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input 
              placeholder="请输入手机号"
            />
          </Form.Item>

          <Form.Item
            name="department"
            label={<span style={{ color: 'var(--text-color)' }}>部门</span>}
            rules={[{ required: true, message: '请输入部门' }]}
          >
            <Input 
              placeholder="请输入部门"
            />
          </Form.Item>

          <Form.Item
            name="role"
            label={<span style={{ color: 'var(--text-color)' }}>角色</span>}
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select 
              placeholder="请选择角色"
            >
              <Option value="user">用户</Option>
              <Option value="manager">经理</Option>
              <Option value="admin">管理员</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label={<span style={{ color: 'var(--text-color)' }}>状态</span>}
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select 
              placeholder="请选择状态"
            >
              <Option value="active">活跃</Option>
              <Option value="inactive">非活跃</Option>
              <Option value="pending">待审核</Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button 
                onClick={() => setIsModalVisible(false)}
              >
                取消
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
              >
                {editingUser ? '更新' : '添加'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UserPage 