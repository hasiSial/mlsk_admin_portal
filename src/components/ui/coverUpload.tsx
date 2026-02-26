'use client';
import React, { useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import Spinner from '@/components/ui/spinner';
import NextImage from '@/components/ui/nextImage/NextImage';
import SVG from 'react-inlinesvg';
import { imageTypes } from '@/utils/constants';
import { customToast } from '@/common/showToast';
import { useCustomAlert } from '@/common/customAlert';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { commonFileUploadHandler } from '@/services/common/common';

interface CoverUploadProps {
  gymId?: number;
  value?: { id?: number; url: string; fullPath: string }[];
  onChange?: (value: { id?: number; url: string; fullPath: string }[]) => void;
  className?: string;
  imageClassName?: string;
  onDelete?: (params: { gymId: number; coverId?: number }) => void;
  onUpdate?: (params: { gymId: number; coverImagePath: string }) => void;
}

const CoverUpload: React.FC<CoverUploadProps> = ({ onUpdate, onDelete, gymId, value = [], onChange, className = 'w-[180px] h-[150px]', imageClassName = 'rounded-[32px]' }) => {
  const [loading, setLoading] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const showAlert = useCustomAlert();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadedFiles = Array.from(files);
    const uploadedList = [...value];

    const totalImages = value.length + files.length;

    if (totalImages > 3) {
      customToast.error('You can only upload up to 3 images.');
      return;
    }

    for (const file of uploadedFiles) {
      // Validate file type
      if (!imageTypes.includes(file.type)) {
        customToast.error('Invalid file type! Only png, jpg, jpeg allowed.');
        continue;
      }

      // Validate size (max 2 MB)
      const sizeMB = file.size / 1024 / 1024;
      if (sizeMB > 2) {
        customToast.error('File size must be less than 2 MB');
        continue;
      }

      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        const response = await commonFileUploadHandler(formData);

        if (response.data?.data?.shortUrl && response.data?.data?.url) {
          const newImage = {
            url: response.data.data.shortUrl,
            fullPath: response.data.data.url,
          };

          uploadedList.push(newImage);

          if (gymId && onUpdate) {
            onUpdate({ gymId, coverImagePath: newImage.url });
          }

          customToast.success(`${file.name} uploaded successfully`);
        } else {
          customToast.error(`${file.name}: Upload failed`);
        }
      } catch (err: any) {
        console.error(err);
        customToast.error(err?.response?.data?.message || 'Upload failed');
      } finally {
        setLoading(false);
      }
    }

    onChange?.(uploadedList);
    e.target.value = '';
  };

  const handleDelete = (index: number) => {
    const cover = value[index];

    if (cover?.id && gymId && onDelete) {
      showAlert({
        title: 'Delete Gym Cover Image',
        description: 'Are you sure you want to delete this gym cover image?',
        confirmText: 'Yes',
        cancelText: 'No',
        customLogo: <Icon icon="/icons/trash-2.svg" fill={true} className="text-error-25" />,
        logoClasses: 'bg-error-100 text-error',
        onConfirm: () => {
          onDelete({ gymId: gymId, coverId: cover?.id! });
        },
        classNames: {
          confirmButton: 'customAlterConfirmButton',
          cancelButton: 'customAlterCancelButton',
        },
      });
    } else {
      const updated = value.filter((_, i) => i !== index);
      onChange?.(updated);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-3">
      {/* Uploaded Images */}
      <div className="flex flex-wrap gap-4">
        {value.map((img, index) => (
          <div key={index} className={`relative ${className}`} onMouseEnter={() => setHoverIndex(index)} onMouseLeave={() => setHoverIndex(null)}>
            <NextImage image={img.fullPath} width={180} height={150} classNames={`w-[180px] h-[150px] object-cover rounded-[32px] ${imageClassName}`} />
            {hoverIndex === index && (
              <div
                className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white cursor-pointer transition hover:bg-red-600"
                onClick={() => handleDelete(index)}
              >
                <HiOutlineTrash className="text-lg" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="w-[180px] h-[150px] rounded-[32px] bg-primary-800/15 flex justify-center items-center">
            <Spinner />
          </div>
        )}
      </div>

      {/* Upload Section */}
      <label htmlFor="upload-cover">
        <div
          className={`px-5 2xl:px-16 w-full h-[212px] cursor-pointer flex flex-col items-center justify-center rounded-[16px] bg-text-850 border border-dashed border-text-500 text-gray-500 text-[12px] font-medium gap-1`}
        >
          <span className="bg-primary-800/15 flex items-center justify-center w-[44px] h-[44px] rounded-[12px]">
            <SVG src="/icons/upload.svg" className="text-primary" preProcessor={(code) => code.replaceAll(/fill=".*?"/g, 'fill="currentColor"')} />
          </span>
          <p className="text-center font-medium text-text-25 text-xs lg:text-sm">
            Drag or <span className="text-primary">Upload</span> multiple images.
            <br />
            Recommended resolution: 1080 x 1080. (Max 2 MB each)
          </p>
        </div>
        <input id="upload-cover" type="file" multiple accept="image/png, image/jpeg, image/jpg" onChange={handleUpload} className="hidden" />
      </label>
    </div>
  );
};

export default CoverUpload;
