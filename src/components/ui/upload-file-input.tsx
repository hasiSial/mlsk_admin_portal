// 'use client';
// import React, { useState } from 'react';
// import { HiOutlineTrash } from 'react-icons/hi';
// import Spinner from '@/components/ui/spinner';
// import NextImage from '@/components/ui/nextImage/NextImage';
// import SVG from 'react-inlinesvg';
// import { fileTypes, imageTypes } from '@/Utils/Constants';
// import { customToast } from '@/Common/Components/ShowToast';

// interface FileUploaderProps {
//   isCover?: boolean;
//   uploadType: 'image' | 'file';
//   value?: { url: string | null; fullPath: string | null };
//   onChange?: (value: { url: string | null; fullPath: string | null }) => void;
//   onDelete?: () => void;
//   dispatch?: any;
//   uploadAction?: any;
//   resetAction?: any;
//   className?: string;
//   imageClassName?: string;
// }

// const UploadFileInput: React.FC<FileUploaderProps> = ({
//   isCover = false,
//   uploadType,
//   value,
//   onChange,
//   onDelete,
//   dispatch,
//   uploadAction,
//   resetAction,
//   className = 'w-[100px] h-[100px]',
//   imageClassName = 'rounded-full',
// }) => {
//   const [loading, setLoading] = useState(false);

//   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const allowedTypes = uploadType === 'image' ? imageTypes : fileTypes;
//     if (!allowedTypes.includes(file.type)) {
//       customToast.error(`Invalid file type! Allowed types: ${allowedTypes.join(', ')}`);
//       return;
//     }

//     // File size validation (1MB to 2MB)
//     const sizeMB = file.size / 1024 / 1024;
//     if (sizeMB < 1 || sizeMB > 2) {
//       customToast.error('File size must be between 1MB and 2MB');
//       return;
//     }

//     try {
//       setLoading(true);
//       // const res = await dispatch(
//       //   uploadAction({
//       //     file,
//       //     type,
//       //     uploadType,
//       //   }),
//       // ).unwrap();

//       // onChange({
//       //   url: res.url,
//       //   fullPath: res.fullUrl,
//       // });
//     } catch (error) {
//       console.error('Upload failed:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = () => {
//     // onChange({ url: null, fullPath: null });
//     // dispatch(resetAction());
//     // onDelete?.();
//   };

//   return (
//     <>
//       {loading ? (
//         <div
//           className={`cursor-pointer flex flex-col items-center justify-center rounded bg-gray-25 border border-dashed border-gray-500 text-gray-500 text-[12px] font-medium gap-1 ${className}`}
//         >
//           <Spinner />
//         </div>
//       ) : value?.fullPath ? (
//         <div className={`relative ${className}`}>
//           <NextImage image={value.fullPath} width={100} height={100} classNames={`w-full h-full object-cover ${imageClassName}`} />
//           <div className="absolute top-2 right-2 flex items-center justify-center cursor-pointer w-[24px] h-[24px] rounded-full bg-error-50 text-error-500" onClick={handleDelete}>
//             <HiOutlineTrash className="text-lg" />
//           </div>
//         </div>
//       ) : isCover ? (
//         <>
//           <label htmlFor="upload-image">
//             <div
//               className={`px-5 2xl:px-16 w-full h-[212px] cursor-pointer flex flex-col items-center justify-center rounded-[16px] bg-text-850 border border-dashed border-text-500 text-gray-500 text-[12px] font-medium gap-1 ${className}`}
//             >
//               <span className="bg-primary-800/15 flex items-center justify-center w-[44px] h-[44px] rounded-[12px]">
//                 <SVG
//                   src="/icons/upload.svg"
//                   className="text-primary"
//                   preProcessor={(code) => {
//                     return code.replaceAll(/fill=".*?"/g, 'fill="currentColor"');
//                   }}
//                 />
//               </span>
//               <p className="text-center font-medium text-text-25 text-xs lg:text-sm">
//                 Drag or <span className="text-primary">Upload</span> And Image or Carousel, etc here if have any Resolution will be: 1080 x 1080
//                 <br />
//                 File must be png, Jpeg or jpg
//               </p>
//             </div>
//           </label>
//           <input id="upload-image" type="file" onChange={handleUpload} className="hidden" />
//         </>
//       ) : (
//         <>
//           <label htmlFor="upload-image">
//             <div className="w-[130px] h-[130px] rounded-[32px] bg-primary-800/15 flex justify-center items-center">
//               <SVG
//                 src="/icons/plus.svg"
//                 className="text-transparent"
//                 preProcessor={(code) => {
//                   return code.replaceAll(/fill=".*?"/g, 'fill="currentColor"');
//                 }}
//               />
//             </div>
//           </label>
//           <input id="upload-image" type="file" onChange={handleUpload} className="hidden" />
//         </>
//       )}
//     </>
//   );
// };

// export default UploadFileInput;

'use client';
import React, { useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import Spinner from '@/components/ui/spinner';
import NextImage from '@/components/ui/nextImage/NextImage';
import SVG from 'react-inlinesvg';
import { fileTypes, imageTypes } from '@/utils/constants';
import { customToast } from '@/common/showToast';
import { useDispatch } from 'react-redux';
import { commonFileUploadHandler } from '@/services/common/common';

interface FileUploaderProps {
  isCover?: boolean;
  uploadType: 'image' | 'file';
  value?: { url: string | null; fullPath: string | null } | null;
  onChange?: (value: { url: string | null; fullPath: string | null }) => void;
  onDelete?: () => void;
  className?: string;
  imageClassName?: string;
}

const UploadFileInput: React.FC<FileUploaderProps> = ({
  isCover = false,
  uploadType,
  value,
  onChange,
  onDelete,
  className = 'w-[100px] h-[100px]',
  imageClassName = 'rounded-full',
}) => {
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = uploadType === 'image' ? imageTypes : fileTypes;
    if (!allowedTypes.includes(file.type)) {
      customToast.error(`Invalid file type! Allowed types: ${allowedTypes.join(', ')}`);
      return;
    }

    // Validate file size (1MB to 2MB)
    const sizeMB = file.size / 1024 / 1024;
    // if (sizeMB < 1 || sizeMB > 2) {
    //   customToast.error('File size must be between 1MB and 2MB');
    //   return;
    // }

    try {
      setLoading(true);

      // Prepare FormData
      const formData = new FormData();
      formData.append('file', file);
      // formData.append('type', uploadType);

      // Call API
      const response = await commonFileUploadHandler(formData);

      if (response.data?.data.shortUrl && response.data?.data.url) {
        onChange?.({
          url: response.data.data.shortUrl,
          fullPath: response.data.data.url,
        });
        customToast.success('File uploaded successfully');
      } else {
        customToast.error('Upload failed, try again!');
      }
    } catch (error: any) {
      console.error(error);
      customToast.error(error?.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    onChange?.({ url: null, fullPath: null });
    onDelete?.();
  };

  // const handleDelete = async () => {
  //   try {
  //     if (value?.fullPath) {
  //       // optional: call API to delete file from server
  //       // await commonFileDeleteHandler({ fullPath: value.fullPath });
  //     }
  //     onChange?.(null); // remove from parent state
  //     onDelete?.();
  //     customToast.success('File deleted successfully');
  //   } catch (err: any) {
  //     console.error(err);
  //     customToast.error(err?.response?.data?.message || 'Failed to delete file');
  //   }
  // };

  return (
    <>
      {loading ? (
        <div className="w-[130px] h-[130px] rounded-[32px] bg-primary-800/15 flex justify-center items-center">
          <Spinner />
        </div>
      ) : isCover ? (
        <div className="h-auto">
          {/* Image Preview if value.fullPath exists */}
          {value?.fullPath && (
            <div className="flex gap-3 mt-3">
              <div className={`relative ${className}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <NextImage image={value.fullPath} width={140} height={140} classNames={`w-[130px] h-[130px] rounded-[32px] object-cover ${imageClassName}`} />
                {hover && (
                  <div
                    className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white cursor-pointer transition hover:bg-red-600"
                    onClick={handleDelete}
                  >
                    <HiOutlineTrash className="text-lg" />
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Upload Section always visible above if file exists */}
          <label htmlFor="upload-image">
            <div
              className={`px-5 2xl:px-16 w-full h-[212px] cursor-pointer flex flex-col items-center justify-center rounded-[16px] bg-text-850 border border-dashed border-text-500 text-gray-500 text-[12px] font-medium gap-1 ${className}`}
            >
              <span className="bg-primary-800/15 flex items-center justify-center w-[44px] h-[44px] rounded-[12px]">
                <SVG src="/icons/upload.svg" className="text-primary" preProcessor={(code) => code.replaceAll(/fill=".*?"/g, 'fill="currentColor"')} />
              </span>
              <p className="text-center font-medium text-text-25 text-xs lg:text-sm">
                Drag or <span className="text-primary">Upload</span> an image. Recommended resolution: 1080 x 1080.
                <br />
                File must be png, jpeg, or jpg.
              </p>
            </div>
            <input id="upload-image" type="file" onChange={handleUpload} className="hidden" />
          </label>
        </div>
      ) : value?.fullPath ? (
        <div className={`relative ${className}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <NextImage image={value.fullPath} width={140} height={140} classNames={`w-[130px] h-[130px] rounded-[32px] object-cover ${imageClassName}`} />
          {hover && (
            <div
              className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white cursor-pointer transition hover:bg-red-600"
              onClick={handleDelete}
            >
              <HiOutlineTrash className="text-lg" />
            </div>
          )}
        </div>
      ) : (
        <label htmlFor="upload-image">
          <div className="w-[130px] h-[130px] rounded-[32px] bg-primary-800/15 flex justify-center items-center">
            <SVG src="/icons/plus.svg" className="text-transparent" preProcessor={(code) => code.replaceAll(/fill=".*?"/g, 'fill="currentColor"')} />
          </div>
          <input id="upload-image" type="file" onChange={handleUpload} className="hidden" />
        </label>
      )}
    </>
  );
};

export default UploadFileInput;
