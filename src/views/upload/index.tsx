import React, { useState } from 'react'
import { 
  Card, 
  Upload, 
  Button, 
  Progress, 
  List, 
  Space, 
  Tag, 
  Typography, 
  Row, 
  Col, 
  Statistic,
  message,
  Modal,
  Tooltip
} from 'antd'
import { 
  FileOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  CloudUploadOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons'
import type { UploadFile } from 'antd'

const { Title, Text } = Typography
const { Dragger } = Upload

interface FileItem {
  id: string
  name: string
  size: number
  type: string
  status: 'uploading' | 'done' | 'error'
  progress: number
  uploadTime: string
  url?: string
}

const UploadPage: React.FC = () => {
  const [fileList, setFileList] = useState<FileItem[]>([])
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null)

  // 模拟文件数据
  const mockFiles: FileItem[] = [
    {
      id: '1',
      name: 'document.pdf',
      size: 2048576,
      type: 'application/pdf',
      status: 'done',
      progress: 100,
      uploadTime: '2024-03-15 10:30:00',
      url: '#'
    },
    {
      id: '2',
      name: 'image.jpg',
      size: 1024000,
      type: 'image/jpeg',
      status: 'done',
      progress: 100,
      uploadTime: '2024-03-15 09:15:00',
      url: '#'
    },
    {
      id: '3',
      name: 'video.mp4',
      size: 10485760,
      type: 'video/mp4',
      status: 'uploading',
      progress: 65,
      uploadTime: '2024-03-15 11:00:00'
    }
  ]

  React.useEffect(() => {
    setFileList(mockFiles)
  }, [])

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <FileOutlined style={{ color: 'var(--success-color)' }} />
    } else if (type.startsWith('video/')) {
      return <FileOutlined style={{ color: 'var(--warning-color)' }} />
    } else if (type.includes('pdf')) {
      return <FileOutlined style={{ color: 'var(--error-color)' }} />
    }
    return <FileOutlined style={{ color: 'var(--primary-color)' }} />
  }

  const getStatusTag = (status: string) => {
    const statusConfig = {
      done: { color: 'success', text: '已完成', icon: <CheckCircleOutlined /> },
      uploading: { color: 'processing', text: '上传中', icon: <ClockCircleOutlined /> },
      error: { color: 'error', text: '失败', icon: <ExclamationCircleOutlined /> }
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    )
  }

  const statistics = [
    {
      title: '总文件数',
      value: fileList.length,
      icon: <FileOutlined style={{ color: 'var(--primary-color)' }} />
    },
    {
      title: '已完成',
      value: fileList.filter(f => f.status === 'done').length,
      icon: <CheckCircleOutlined style={{ color: 'var(--success-color)' }} />
    },
    {
      title: '上传中',
      value: fileList.filter(f => f.status === 'uploading').length,
      icon: <ClockCircleOutlined style={{ color: 'var(--warning-color)' }} />
    },
    {
      title: '总大小',
      value: formatFileSize(fileList.reduce((acc, file) => acc + file.size, 0)),
      icon: <CloudUploadOutlined style={{ color: 'var(--info-color)' }} />
    }
  ]

  const uploadProps = {
    name: 'file',
    multiple: true,
    action: '/api/upload',
    showUploadList: false,
    beforeUpload: (file: UploadFile) => {
      const isLt10M = file.size! / 1024 / 1024 < 10
      if (!isLt10M) {
        message.error('文件大小不能超过 10MB!')
        return false
      }
      return true
    },
    onChange: (info: { file: UploadFile }) => {
      const { status } = info.file
      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功`)
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败`)
      }
    }
  }

  const handlePreview = (file: FileItem) => {
    setPreviewFile(file)
    setPreviewVisible(true)
  }

  const handleDelete = (fileId: string) => {
    setFileList(fileList.filter(f => f.id !== fileId))
    message.success('文件删除成功')
  }

  return (
    <div style={{ 
      padding: '0',
      background: 'transparent',
      minHeight: '100%'
    }}>
      {/* 统计卡片 */}
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        {statistics.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
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
                  color: 'var(--text-color)',
                  fontWeight: 'bold'
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* 上传区域 */}
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CloudUploadOutlined style={{ color: 'var(--primary-color)' }} />
            <span style={{ color: 'var(--text-color)', fontSize: '18px', fontWeight: 'bold' }}>文件上传</span>
          </div>
        }
        style={{
          background: 'var(--component-background)',
          border: '1px solid var(--border-color-split)',
          borderRadius: '12px',
          marginBottom: '24px'
        }}
      >
        <Dragger
          {...uploadProps}
          style={{
            background: 'var(--background-color-light)',
            border: '2px dashed var(--border-color-split)',
            borderRadius: '12px',
            padding: '40px 20px'
          }}
        >
          <p style={{
            fontSize: '48px',
            color: 'var(--primary-color)',
            margin: '0 0 16px 0'
          }}>
            <CloudUploadOutlined />
          </p>
          <p style={{
            fontSize: '18px',
            color: 'var(--text-color)',
            margin: '0 0 8px 0',
            fontWeight: 'bold'
          }}>
            点击或拖拽文件到此区域上传
          </p>
          <p style={{
            color: 'var(--text-color-secondary)',
            margin: 0
          }}>
            支持单个或批量上传，文件大小不超过 10MB
          </p>
        </Dragger>
      </Card>

      {/* 文件列表 */}
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileOutlined style={{ color: 'var(--primary-color)' }} />
            <span style={{ color: 'var(--text-color)', fontSize: '18px', fontWeight: 'bold' }}>文件列表</span>
          </div>
        }
        style={{
          background: 'var(--component-background)',
          border: '1px solid var(--border-color-split)',
          borderRadius: '12px'
        }}
      >
        <List
          dataSource={fileList}
          renderItem={(file) => (
            <List.Item
              style={{
                background: 'var(--background-color-light)',
                border: '1px solid var(--border-color-split)',
                borderRadius: '8px',
                marginBottom: '12px',
                padding: '16px',
                transition: 'all 0.2s ease'
              }}
              className="file-item"
              actions={[
                <Tooltip title="预览" key="preview">
                  <Button
                    type="text"
                    icon={<EyeOutlined />}
                    onClick={() => handlePreview(file)}
                    style={{ color: 'var(--primary-color)' }}
                  />
                </Tooltip>,
                <Tooltip title="删除" key="delete">
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(file.id)}
                    style={{ color: 'var(--error-color)' }}
                  />
                </Tooltip>
              ]}
            >
              <List.Item.Meta
                avatar={getFileIcon(file.type)}
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--text-color)', fontWeight: 'bold' }}>
                      {file.name}
                    </span>
                    {getStatusTag(file.status)}
                  </div>
                }
                description={
                  <div>
                    <div style={{ color: 'var(--text-color-secondary)', marginBottom: '8px' }}>
                      大小: {formatFileSize(file.size)} | 上传时间: {file.uploadTime}
                    </div>
                    {file.status === 'uploading' && (
                      <Progress
                        percent={file.progress}
                        size="small"
                        strokeColor={{
                          '0%': 'var(--primary-color)',
                          '100%': 'var(--success-color)',
                        }}
                      />
                    )}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      {/* 预览模态框 */}
      <Modal
        title={
          <span style={{ color: 'var(--text-color)', fontSize: '18px', fontWeight: 'bold' }}>
            文件预览
          </span>
        }
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
        width={800}
      >
        {previewFile && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '16px' }}>
              {getFileIcon(previewFile.type)}
            </div>
            <Title level={4} style={{ color: 'var(--text-color)' }}>
              {previewFile.name}
            </Title>
            <Space direction="vertical" size="small">
              <Text style={{ color: 'var(--text-color-secondary)' }}>
                文件大小: {formatFileSize(previewFile.size)}
              </Text>
              <Text style={{ color: 'var(--text-color-secondary)' }}>
                文件类型: {previewFile.type}
              </Text>
              <Text style={{ color: 'var(--text-color-secondary)' }}>
                上传时间: {previewFile.uploadTime}
              </Text>
            </Space>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default UploadPage 