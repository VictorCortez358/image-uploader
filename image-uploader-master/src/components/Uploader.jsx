"use client";
import React from "react";
import { message, Upload } from "antd";
import PngImage from "/public/image.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const { Dragger } = Upload;

const Uploader = () => {
    const router = useRouter();

    const props = {
        name: "file",
        multiple: true,
        action: "/api/upload",

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

            if (status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (status === "done") {
                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const data = await res.json();
                const { url } = data;
                const nextUrl = `/uploaded/${encodeURIComponent(url)}`;
                router.push(nextUrl);
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };

    return (
        <Dragger {...props}>
            <Image
                src={PngImage}
                alt="image"
                width={115}
                height={88}
                className="mx-auto"
            />
            <p className="ant-upload-text px-8 py-8 opacity-50">
                Drag & Drop your image here
            </p>
        </Dragger>
    );
};

export default Uploader;
