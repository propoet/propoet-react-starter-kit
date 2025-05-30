import { useState } from 'react'
import http from '@/utils/http'
import type { AxiosProgressEvent } from 'axios'

// 上传页面
export default function Upload(){
    const [file, setFile] = useState<File | null>(null)
    const [progress, setProgress] = useState(0)
    const handleUpload = async () => {
        if(file){
            const formData = new FormData()
            formData.append('file',file)
            try{
                const res = await http.post('/upload',formData,{
                    headers:{
                        'Content-Type':'multipart/form-data'
                    },
                    onUploadProgress: (event: AxiosProgressEvent) => {
                        if (event.total) {
                            setProgress(Math.round((event.loaded / event.total) * 100));
                        }
                    }
                })
                console.log(res)
            }catch(error){
                console.log(error)
            }
        }
    }
    return (
        <div className="p-4 space-y-4">
        <input type="file" className='border border-gray-300 rounded-md p-2' onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button onClick={handleUpload} className="bg-green-500 text-white px-4 py-2">
          上传文件
        </button>
        {progress > 0 && <div className='text-green-500'>上传进度: {progress}%</div>}
      </div>
    )
}