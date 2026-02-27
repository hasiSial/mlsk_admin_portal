import api from '../Api';
import apiPublic, { publicDelete, publicGet, publicPut } from '../publicApi';

export const createRequestClientDataAccessHandler = async (data: any) => {
  return apiPublic.post('/user/access-account', data);
};

export const getAccessClientAccountDependentsHandler = async (uuid: string) => {
  return publicGet(`/user/access-account/${uuid}/dependents`);
};

export const getAccessParentDataHandler = async (uuid: string) => {
  return publicGet(`/user/access-account/${uuid}`);
};

export const getAccessClientDependentFamilyDataHandler = async (uuid: string, familyId: number) => {
  return publicGet(`/user/access-account/${uuid}/dependents/${familyId}`);
};

export const getAccessClientDocumentsDataHandler = async (uuid: string, familyId: number) => {
  return publicGet(`/user/access-account/${uuid}/dependents/${familyId}/documents`);
};

export const updateClientAccessDocumentsHandler = async (
  uuid: string,
  documentSectionId: number,
  payload: {
    dependentId: number | null;
    sortId: number;
    title: string;
    files: { filePath: string; fileName: string }[];
  }
) => {
  return publicPut(
    `/user/access-account/${uuid}/documents/sections/${documentSectionId}`,
    payload
  );
};

export const deleteClientAccessDocumentsHandler = async (uuid:string,documentSectionUploadId: number) => {
  return publicDelete(`/user/access-account/${uuid}/documents/files/${documentSectionUploadId}`);
};

export const getAccessClientSingleCategoryDataHandler = async (uuid: string, familyId: number, categoryId: number, isParentCategory: boolean) => {
  return publicGet(`/user/access-account/${uuid}/dependents/${familyId}/answers/${categoryId}/${isParentCategory}`);
};

export const getClientDependentMedicineDetail = async (uuid: string, familyId: number) => {
  return publicGet(`/user/access-account/${uuid}/dependents/${familyId}/medicines`);
};

export const getClientDependentLifeStyleDetail = async (uuid: string, familyId: number) => {
  return publicGet(`/user/access-account/${uuid}/dependents/${familyId}/lifestyle`);
};

export const getClientDependentFeedingDetail = async (uuid: string, familyId: number) => {
  return publicGet(`/user/access-account/${uuid}/dependents/${familyId}/feeding`);
};

export const getClientDependentVaccinationDetail = async (uuid: string, familyId: number) => {
  return publicGet(`/user/access-account/${uuid}/dependents/${familyId}/vaccination`);
};

export const getClientDependentDocumentsDetail = async (uuid: string, familyId: number) => {
  return publicGet(`/user/access-account/${uuid}/dependents/${familyId}/documents`);
};
