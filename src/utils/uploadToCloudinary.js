// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';

// cloudinary.config({
//   cloud_name: 'dod9yfzup',
//   api_key: '666983146394437',
//   api_secret: 'fGB7pFLKckZW88NqHOy_ogzn414'
// });

// const uploadImageToCloudinary = async (localPath) => {
//   try {
//     const result = await cloudinary.uploader.upload(localPath, {
//       resource_type: "auto",
//     });
//     fs.unlinkSync(localPath); 
//     return result.secure_url;  
//   } catch (error) {
//     fs.unlinkSync(localPath);
//     throw error;
//   }
// };

// export default uploadImageToCloudinary;


import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dod9yfzup',
  api_key: '666983146394437',
  api_secret: 'fGB7pFLKckZW88NqHOy_ogzn414',
});

// New version using buffer and upload_stream
const uploadImageToCloudinary = async (fileBuffer) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(fileBuffer);
    });

    return result.secure_url;
  } catch (error) {
    throw error;
  }
};

export default uploadImageToCloudinary;

