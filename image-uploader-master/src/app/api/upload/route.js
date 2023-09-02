import { NextResponse } from "next/server";


import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dtz4vdlgb',
    api_key: '223645713645776',
    api_secret: '1cye5rQyBvq07cKhqm4I_B1KXJA'
});

export async function POST(request) {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
        return NextResponse.badRequest('No file uploaded');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        }).end(buffer);
    });
    const { secure_url } = response;
    return NextResponse.json({ url: secure_url });
}