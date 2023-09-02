"use client";
import Uploader from '@/components/Uploader'
import { message, Upload } from 'antd';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  const props = {
    name: 'file',
    action: '/api/upload',
    beforeUpload(file) {
      const isJpgOrPng =
          file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
          message.error("You can only upload JPG/PNG file!");
      }
      return isJpgOrPng;
  },
    async onChange(info) {
      const { status } = info.file;
      const formData = new FormData();
      formData.append("file", info.file.originFileObj);
  
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await res.json();
        const { url } = data;

        const nextUrl = `/uploaded/${encodeURIComponent(url)}`;
        router.push(nextUrl);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-custom2 border-l-2 border-r-2  border-b-2 p-10 rounded-lg shadow-xl">
      <div className="py-8">
        <h1 className="text-2xl text-center">Upload your image</h1>
        <p className="text-sm text-center pt-4">File should be Jpeg, Png...</p>
      </div>
      <div className="flex justify-center">
        <Uploader />
      </div>
      <div className="flex flex-col justify-center items-center pt-8">
        <p className="text-center">Or</p>
        <Upload className="pt-4" {...props}>
          <div className="flex justify-center items-center w-80">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-md mt-4">
            Choose a file
          </button>
          </div>
        </Upload>
      </div>
      </div>
    </div>
  )
}
