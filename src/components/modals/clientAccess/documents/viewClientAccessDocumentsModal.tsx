import Modalbody from '@/components/ui/modal/Body';
import Modalfooter from '@/components/ui/modal/Footer';
import Modalheader from '@/components/ui/modal/Header';
import Modal from '@/components/ui/modal/Modal';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { truncateText } from '@/utils/helpers';
import type { FC } from 'react';
import type { UploadDocumentsType } from '@/pages/public/Types';

interface Props {
  close: () => void;
  documents: UploadDocumentsType[];
}

const ViewClientAccessDocumentModal: FC<Props> = ({ close, documents }) => {

  const handleDownload = (file: UploadDocumentsType) => {
    const link = document.createElement('a');
    link.href = file.filePath;
    link.download = file.fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal 
      classNames="md:max-w-[40%] md:min-w-[40%] h-fit overflow-x-auto scrollbar-thin" 
      closeModal={close} 
      backDrop
    >
      <Modalheader showCloseButton onCloseClick={close} className="flex justify-between items-center">
        <h2 className="text-primary text-xl font-semibold">View Documents</h2>
        {/* Download first document by default */}
        {documents.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDownload(documents[0])}
          >
            Download
          </Button>
        )}
      </Modalheader>

      <Modalbody className="p-3 flex flex-col gap-2">
        {documents.length === 0 && <p className="text-sm text-textSecondary">No documents available.</p>}

        {documents.map((doc) => (
          <div
            key={doc.userDocumentSectionUploadId}
            className="bg-primary-50 border border-[#99B9D1] rounded-md p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Icon icon="/icons/doc.svg" fill={false} stroke={true} />
              <span className="text-sm font-medium">{truncateText(doc.fileName, 25)}</span>
            </div>
            <Button size="sm" variant="outline" onClick={() => handleDownload(doc)}>
              Download
            </Button>
          </div>
        ))}
      </Modalbody>

      <Modalfooter>
        <div className="w-full flex justify-end">
          <Button type="button" onClick={close} className="h-[40px]">
            Close
          </Button>
        </div>
      </Modalfooter>
    </Modal>
  );
};

export default ViewClientAccessDocumentModal;