import Modalbody from '@/components/ui/modal/Body';
import Modalfooter from '@/components/ui/modal/Footer';
import Modalheader from '@/components/ui/modal/Header';
import Modal from '@/components/ui/modal/Modal';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { useState, type ChangeEvent, type FC } from 'react';
import { useAppDispatch } from '@/redux/Hooks';
import { customToast } from '@/common/showToast';
import { updateClientAccessDocuments } from '@/redux/accessRequest/slice';
import type { UploadDocumentsType } from '@/pages/public/Types';

interface Props {
  close: () => void;
  uuid: string; 
  documentSectionId: number; 
  documents: UploadDocumentsType[];
  onUpdateDocuments: (docs: UploadDocumentsType[]) => void; 
}

const UploadClientAccessDocumentModal: FC<Props> = ({
  close,
  uuid,
  documentSectionId,
  documents,
  onUpdateDocuments,
}) => {
  const dispatch = useAppDispatch();
  const [localDocs, setLocalDocs] = useState<UploadDocumentsType[]>(documents);
  const [uploading, setUploading] = useState(false);

  // handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles: UploadDocumentsType[] = Array.from(e.target.files).map((file, idx) => ({
      userDocumentSectionUploadId: Date.now() + idx, 
      fileName: file.name,
      filePath: URL.createObjectURL(file), 
    }));

    setLocalDocs([...localDocs, ...newFiles]);
  };

  // remove a document
  const handleRemove = (id: number) => {
    setLocalDocs(localDocs.filter((doc) => doc.userDocumentSectionUploadId !== id));
  };

  // download a document
  const handleDownload = (file: UploadDocumentsType) => {
    const link = document.createElement('a');
    link.href = file.filePath;
    link.download = file.fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // save/upload documents via API
  const handleSave = async () => {
    if (!uuid) {
      customToast.error('UUID is missing.');
      return;
    }

    setUploading(true);

    const payload = {
      dependentId: null,
      sortId: 0,
      title: 'Documents',
      files: localDocs.map((doc) => ({
        filePath: doc.filePath,
        fileName: doc.fileName,
      })),
    };

    try {
      await dispatch(
        updateClientAccessDocuments({ uuid, documentSectionId, payload })
      ).unwrap();

      onUpdateDocuments(localDocs); // update parent state
      customToast.success('Documents updated successfully.');
      close();
    } catch (error) {
      console.error('Failed to update documents', error);
      customToast.error('Failed to update documents.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal
      classNames="md:max-w-[40%] md:min-w-[40%] h-fit overflow-x-auto scrollbar-thin"
      closeModal={close}
      backDrop
    >
      <Modalheader showCloseButton onCloseClick={close} className="flex justify-between items-center">
        <h2 className="text-primary text-xl font-semibold">Upload / View Documents</h2>
      </Modalheader>

      <Modalbody className="p-3 flex flex-col gap-3">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="mb-3"
        />

        {localDocs.length === 0 && (
          <p className="text-sm text-textSecondary">No documents available.</p>
        )}

        {localDocs.map((doc) => (
          <div
            key={doc.userDocumentSectionUploadId}
            className="bg-primary-50 border border-[#99B9D1] rounded-md p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Icon icon="/icons/doc.svg" fill={false} stroke={true} />
              <span className="text-sm font-medium">{doc.fileName}</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleDownload(doc)}>
                Download
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleRemove(doc.userDocumentSectionUploadId)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </Modalbody>

      <Modalfooter>
        <div className="w-full flex justify-end gap-2">
          <Button type="button" onClick={close} className="h-[40px]">
            Close
          </Button>
          <Button type="button" onClick={handleSave} className="h-[40px]" disabled={uploading}>
            {uploading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </Modalfooter>
    </Modal>
  );
};

export default UploadClientAccessDocumentModal;