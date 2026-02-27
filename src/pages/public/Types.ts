export interface ClientDependent {
  familyId: number;
  name: string;
  nickName: string | null;
  dateOfBirth: string;
  birthMark: string;
  hasBirthMark: boolean;
  gender: {
    id: number;
    label: string;
  };
}

export interface UploadDocumentsType {
  userDocumentSectionUploadId:number;
  fileName:string;
  filePath:string;
}
export interface ClientAccessDocuments {
  userDocumentSectionId:number;
  title:string;
  sortId:number;
  uploads:UploadDocumentsType[]

}

export interface ParentCategories {
  lookupId?: number;
  categoryId?: number;
  name: string;
  icon: string;
  answered?: number;
}

export interface ParentInfo {
  name: string;
  familyId: number;
  parentCategories: ParentCategories[];
}

export interface MedicineDosageTime {
  day: string;
  time: string;
  quantity: number;
}

export interface Medicine {
  medicineId: string;
  medicineName: string;
  strength: string;
  medicineDosageTimes: MedicineDosageTime[];
}

export interface MedicineProvider {
  userMedicineProviderId: string;
  providerName: string;
  doctorName: string;
  medicines: Medicine[];
}

export interface LifeStyleData {
  dietRestrictions: string[];
  exercises: string[];
  physicalActivity: string[];
  smoking: boolean;
  userLifeStyleId: string;
}
