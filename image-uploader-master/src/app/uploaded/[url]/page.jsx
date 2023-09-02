"use client"
import React from 'react'
import Image from 'next/image';
import UploadIcon from '/public/UploadIcon.png';
import { message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';



const UploadedImage = ({ params }) => {

    const decodedUrl = decodeURIComponent(params.url);
    const router = useRouter();


    const copyLink = () => {
        navigator.clipboard.writeText(decodedUrl);
        message.success('Link Copied to Clipboard');
    }

    const back = () => {
        router.push('/');
    }


    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <ArrowLeftOutlined className="text-2xl absolute top-4 left-10" onClick={() => back()} />
            <div className="border-l-2 border-r-2  border-b-2 p-8 rounded-lg shadow-xl">
                <div className="py-4 flex flex-col justify-center items-center gap-2">
                    <Image src={UploadIcon} width={30} height={30} alt='icon' />
                    <h1 className="text-2xl text-center">Uploaded Successfully!</h1>
                </div>
                <div className="flex flex-col justify-center items-center gap-6">
                    <Image src={decodedUrl} width={338} height={225} alt='image' className='rounded-lg' />
                    <div className="flex flex-row w-custom justify-around items-center border-l-2 border-r-2 border-t-2 border-b-2 p-1  rounded-lg ">
                        <p className="text-sm w-3/4 text-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis">{decodedUrl}</p>
                        <button onClick={() =>
                            copyLink()
                        } className="bg-blue-500 hover:bg-blue-700 text-white h-8 w-28 rounded-md text-sm">
                            Copy Link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadedImage;
