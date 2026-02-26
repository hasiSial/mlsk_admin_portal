const noDynamicCategory = [
  { categoryId: 401, categoryName: 'Dependents Basic Information' },
  { categoryId: 403, categoryName: 'Medication & Supplements' },
  { categoryId: 412, categoryName: 'Feeding Schedules & Parent Remainders' },
  { categoryId: 413, categoryName: 'Vaccination & Immunization' },
  { categoryId: 414, categoryName: 'Upload Documents' },
  { categoryId: 30002, categoryName: 'Medicine' },
  { categoryId: 30012, categoryName: 'Reproduction & Sexual Health' },
  { categoryId: 30013, categoryName: 'Life Style & Habits' },
];

export const checkIsDynamicCategory = (categoryId: number, categoryName?: string) => {
  return noDynamicCategory.some((item) => item?.categoryId == categoryId);
};
export const DemoClientDocuments: any = [
  {
    id: 1,
    title: 'Compliance & Taxation',
    docs: [
      { docId: 1, label: 'Tax Return File.PNG', docLink: '' },
      { docId: 2, label: 'Tax File.PNG', docLink: '' },
    ],
  },
  {
    id: 1,
    title: 'Market Analysis',
    docs: [
      { docId: 1, label: 'Competitor Report.pdf', docLink: '' },
      { docId: 2, label: 'SWOT Analysis.pptx', docLink: '' },
    ],
  },
  {
    id: 3,
    title: 'Risk Management',
    docs: [
      { docId: 1, label: 'Risk Assessment.docx', docLink: '' },
      { docId: 2, label: 'Mitigation Strategies.pdf', docLink: '' },
    ],
  },
  {
    id: 4,
    title: 'Financial Planning',
    docs: [
      { docId: 1, label: 'Budget Overview.xlsx', docLink: '' },
      { docId: 2, label: 'Investment Strategy.docx', docLink: '' },
    ],
  },
  {
    id: 5,
    title: 'Estate Planning',
    docs: [
      { docId: 1, label: 'Tax Assessment.pdf', docLink: '' },
      { docId: 2, label: 'W-2 Form.docx', docLink: '' },
    ],
  },
  {
    id: 6,
    title: 'Investment Strategy',
    docs: [
      { docId: 1, label: 'Portfolio Analysis.xlsx', docLink: '' },
      { docId: 2, label: 'Retirement Projections.pdf', docLink: '' },
    ],
  },
  {
    id: 7,
    title: 'Healthcare Directives',
    docs: [
      { docId: 1, label: 'Living Will.docx', docLink: '' },
      { docId: 2, label: 'Power of Attorney.pdf', docLink: '' },
    ],
  },
  {
    id: 8,
    title: 'Insurance Policies',
    docs: [
      { docId: 1, label: 'Life Insurance.pdf', docLink: '' },
      { docId: 2, label: 'Home Insurance.docx', docLink: '' },
    ],
  },
];
