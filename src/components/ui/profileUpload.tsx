'use client';
import React, { useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import Spinner from '@/components/ui/spinner';
import NextImage from '@/components/ui/nextImage/NextImage';
import SVG from 'react-inlinesvg';
import { imageTypes } from '@/utils/constants';
import { customToast } from '@/common/showToast';
import { cn } from '@/lib/utils';
import { commonFileUploadHandler } from '@/services/common/common';
import { Upload } from 'lucide-react';

interface FileUploaderProps {
  value?: { url: string | null; fullPath: string | null } | null;
  onChange?: (value: { url: string | null; fullPath: string | null }) => void;
  onDelete?: () => void;
  className?: string;
  imageClassName?: string;
  labelText?: string | null;
  title?: string | null;
  subTitle?: string | null;
  isSubtitle?: boolean;
  isAmenityIcon?: boolean;
}

const ProfileUpload: React.FC<FileUploaderProps> = ({
  title = 'Drop photo here or click to upload',
  subTitle = 'Max file size: 2MB. Formats: JPG, PNG',
  isSubtitle = true,
  labelText = null,
  value,
  onChange,
  onDelete,
  className = 'w-[130px] h-[130px]',
  imageClassName = 'rounded-[32px]',
  isAmenityIcon = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!imageTypes.includes(file.type)) {
      customToast.error(`Invalid file type! Allowed: ${imageTypes.join(', ')}`);
      return;
    }

    const sizeKB = file.size / 1024;
    const sizeMB = file.size / 1024 / 1024;

    if (!isAmenityIcon) {
      if (sizeKB < 1 || sizeMB > 2) {
        customToast.error('File size must be between 1 KB and 2 MB');
        return;
      }
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await commonFileUploadHandler(formData);
      if (response.data?.data.shortUrl && response?.data.data.fullUrl) {
        onChange?.({
          url: response.data.data.shortUrl,
          fullPath: response?.data.data.fullUrl,
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

  return (
    <>
      {loading ? (
        <div
          className={`${className} ${imageClassName}  w-full h-[143px] border-2 border-dashed border-primary roundedDefault bg-primary-800/15 flex flex-col justify-center items-center`}
        >
          <Spinner />
        </div>
      ) : value?.fullPath ? (
        <div className={`relative ${className} group`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          {/* Image */}
          <div className={`overflow-hidden ${imageClassName}`}>
            <NextImage image={value.fullPath} width={130} height={130} classNames={`w-[130px] h-[130px] object-cover ${imageClassName}`} />
          </div>

          {/* Delete Button */}
          {hover && (
            <button
              type="button"
              onClick={handleDelete}
              className="absolute top-2 right-2 bg-red-500 text-secondary w-8 h-8 flex items-center justify-center rounded-full shadow-md hover:bg-red-600 transition"
            >
              <HiOutlineTrash className="text-lg" />
            </button>
          )}
        </div>
      ) : (
        <div className="default-space">
          {labelText && <label className=" text-sm 2xl:text-lg px-1 font-medium transition-colors duration-200 text-black">{labelText}</label>}
          <label htmlFor="upload-image" className="cursor-pointer">
            <div className="mt-2 w-full h-[143px] border-none roundedDefault bg-[#F5F7F8] flex flex-col justify-center items-center">
              <h6 className={cn('text-textDefault font-medium text-base xl:text-xl')}>{title}</h6>
              {isSubtitle && <span className="text-untitle-200 italic text-sm font-normal">{subTitle}</span>}
              <div className='flex items-center justify-center gap-2 border border-untitle-200 mt-2 rounded-[6px] py-1 px-4 bg-white'>
                  <Upload className='text-untitle-200'/>
                  <span className='text-primary'>Click to Upload</span>
              </div>

            </div>
            <input id="upload-image" type="file" onChange={handleUpload} className="hidden" />
          </label>
        </div>
      )}
    </>
  );
};

export default ProfileUpload;
