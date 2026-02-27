import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/Hooks';
import { getAccessClientDocumentsData } from '@/redux/accessRequest/slice';
import Loader from '@/components/ui/loader/Loader';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { truncateText } from '@/utils/helpers';
import type { ClientAccessDocuments, UploadDocumentsType } from '@/pages/public/Types';
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { Eye } from 'lucide-react';
import ViewClientAccessDocumentModal from '@/components/modals/clientAccess/documents/viewClientAccessDocumentsModal';
import useClientAccessDocumentsActionHook from '@/hooks/clientAccess/useClientAccessDocuments';
import UploadClientAccessDocumentModal from '@/components/modals/clientAccess/documents/updateClientAccessDocumentsModal';

interface Props {
  familyId: number;
}

const AccessClientDocumentsOverview = ({ familyId }: Props) => {
    const { uuid } = useParams();
    const dispatch = useAppDispatch();
    const [documents, setDocuments] = useState<ClientAccessDocuments[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedDocuments, setSelectedDocuments] = useState<UploadDocumentsType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [activeDocumentSection, setActiveDocumentSection] = useState<ClientAccessDocuments | null>(null);
    const { deleteDocumentSweetAlert } = useClientAccessDocumentsActionHook();

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!uuid) return;
      try {
        setLoading(true);
        const res = await dispatch(
          getAccessClientDocumentsData({ uuid, familyId })
        ).unwrap();
        setDocuments(res?.data || []);
      } catch (error) {
        console.error('documents error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [uuid, familyId, dispatch]);


  const handleDeleteDocuments = async (id: number) => {
    if (!uuid) return;
    const success = await deleteDocumentSweetAlert(uuid!,id);
        if (success) {
            // refetch documents after successful deletion
            const res = await dispatch(
            getAccessClientDocumentsData({ uuid, familyId })
            ).unwrap();
            setDocuments(res?.data || []);
        }
    };

    const handleEditDocuments = (docSection: ClientAccessDocuments) => {
        setActiveDocumentSection(docSection);
        setIsUploadModalOpen(true);
    };

    const handleUpdateDocuments = (updatedDocs: UploadDocumentsType[], title?: string) => {
        if (!activeDocumentSection) return;

        const updatedSection = {
        ...activeDocumentSection,
        title: title ?? activeDocumentSection.title,
        uploads: updatedDocs,
        };

        setDocuments((prev) =>
        prev.map((doc) => (doc === activeDocumentSection ? updatedSection : doc))
        );

        setActiveDocumentSection(null);
        setIsUploadModalOpen(false);
    };



  return (
    <>
        {loading &&  <Loader />}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {documents.map((doc, docIdx) => {
                const uploadsToShow = doc.uploads?.slice(0, 2) || [];
                const remainingUploads = doc.uploads?.slice(2) || [];

                return (
                <div
                    key={docIdx}
                    className="bg-specificCard border border-borderDefault2 rounded-lg gap-3 px-3 py-4 relative"
                >
                    <h4 className="text-textDefault font-semibold text-sm md:text-base">
                    {doc?.title ?? ''}
                    </h4>

                    <div className="space-y-3 mt-3">
                    {uploadsToShow.map((file, idx) => (
                        <div
                        key={idx}
                        className="bg-primary-50 border border-[#99B9D1] p-[6px] rounded-[6px] flex items-center justify-between"
                        >
                        <div className="text-primary flex items-center gap-1">
                            <Icon icon="/icons/doc.svg" fill={false} stroke={true} />
                            <span className="text-sm font-medium">
                            {truncateText(file?.fileName || '', 18)}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className='cursor-pointer' onClick={() => {
                                    setSelectedDocuments([file]); 
                                    setIsModalOpen(true);
                                }}
                            >
                                <Eye className='text-green' size={18} />
                            </span>
                            <span className='cursor-pointer' onClick={() => handleEditDocuments(doc)}><HiOutlinePencilSquare className='text-primary' /></span>
                            <span className='cursor-pointer' onClick={()=>handleDeleteDocuments(file?.userDocumentSectionUploadId)}><HiOutlineTrash className='text-red'/></span>
                        </div>
                        </div>
                    ))}

                    {remainingUploads.length > 0 && (
                        <div className="relative group">
                        <button className="text-sm text-primary font-medium">
                            See More
                        </button>

                        {/* Hover Card */}
                        <div className="absolute top-0 left-20 ml-2 hidden group-hover:flex flex-col bg-white border border-borderDefault2 rounded-lg shadow-lg p-3 w-80 z-50">
                            {remainingUploads.map((file, idx) => (
                            <div
                                key={idx}
                                className="bg-primary-50 border border-[#99B9D1] p-[6px] rounded-[6px] flex items-center justify-between mb-2 last:mb-0"
                            >
                                <div className="text-primary flex items-center gap-1">
                                <Icon icon="/icons/doc.svg" fill={false} stroke={true} />
                                <span className="text-sm font-medium">
                                    {truncateText(file?.fileName || '', 15)}
                                </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className='cursor-pointer' onClick={() => {
                                            setSelectedDocuments([file]); 
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        <Eye className='text-green' size={18} />
                                    </span>
                                    <span className='cursor-pointer' onClick={() => handleEditDocuments(doc)}><HiOutlinePencilSquare className='text-primary' /></span>
                                    <span className='cursor-pointer' onClick={()=>handleDeleteDocuments(file?.userDocumentSectionUploadId)}><HiOutlineTrash className='text-red'/></span>
                                </div>
                            </div>
                            ))}
                        </div>
                        </div>
                    )}
                    </div>
                </div>
                );
            })}
        </div>
        {isModalOpen &&(
            <ViewClientAccessDocumentModal
                close={() => setIsModalOpen(false)}
                documents={selectedDocuments}
            />
        )}

        {isUploadModalOpen && activeDocumentSection && (
            <UploadClientAccessDocumentModal
            close={() => setIsUploadModalOpen(false)}
            uuid={uuid!}
            documentSectionId={activeDocumentSection.userDocumentSectionId}
            documents={activeDocumentSection.uploads || []}
            onUpdateDocuments={handleUpdateDocuments}
            />
        )}
    </>
  );
};

export default AccessClientDocumentsOverview;