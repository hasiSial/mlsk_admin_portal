import type { LifeStyleData } from '@/pages/public/Types';

interface Props {
  record?: any;
}

const DynamicCategoryOverview = ({ record }: Props) => {
  if (!record) {
    return (
      <div className="col-span-12">
        <p className="text-xs text-textDefault font-medium">No records are currently available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 mt-4">
      {record.map((item: any, i: number) => (
        <div key={i} className="rounded-lg w-full min-h-[332px] h-auto p-3 space-y-3 col-span-12 lg:col-span-4 border border-borderDefault2 bg-specificCard">
          <h4 className="text-textDefault font-bold text-base">Do you have any known {item?.name}?</h4>

          <p className="text-primary text-sm font-semibold">Yes</p>

          {(item?.answeredQuestions || []).map((q: any, index: number) => (
            <div key={index}>
              <p className="text-xs text-textDefault font-medium">{q?.question}</p>
              <p className="text-primary text-sm font-semibold">{q?.answer}</p>
              <span className="block w-full border-b border-[#ccdce8] mt-2 mb-2"></span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DynamicCategoryOverview;
