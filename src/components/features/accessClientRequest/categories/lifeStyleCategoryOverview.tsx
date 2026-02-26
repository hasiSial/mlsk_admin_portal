import type { LifeStyleData } from '@/pages/public/Types';

interface Props {
  record?: LifeStyleData | null;
}

const LifeStyleCategoryOverview = ({ record }: Props) => {
  if (!record) {
    return (
      <div className="col-span-12">
        <p className="text-xs text-textDefault font-medium">No records are currently available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 mt-4">
      <div className="rounded-lg w-full h-auto p-3 space-y-3 col-span-12 lg:col-span-4 border border-borderDefault2 bg-specificCard">
        <h4 className="text-textDefault font-bold text-base">Lifestyle Details</h4>

        {record.dietRestrictions?.length > 0 && (
          <div>
            <p className="text-xs text-textDefault font-medium">Diet Restrictions:</p>
            <ul className="list-disc ml-4 text-primary text-sm font-semibold">
              {record.dietRestrictions.map((diet, i) => (
                <li key={i}>{diet}</li>
              ))}
            </ul>
          </div>
        )}

        {record.exercises?.length > 0 && (
          <div>
            <p className="text-xs text-textDefault font-medium">Exercises:</p>
            <ul className="list-disc ml-4 text-primary text-sm font-semibold">
              {record.exercises.map((exercise, i) => (
                <li key={i}>{exercise}</li>
              ))}
            </ul>
          </div>
        )}

        {record.physicalActivity?.length > 0 && (
          <div>
            <p className="text-xs text-textDefault font-medium">Physical Activity:</p>
            <ul className="list-disc ml-4 text-primary text-sm font-semibold">
              {record.physicalActivity.map((activity, i) => (
                <li key={i}>{activity}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <p className="text-xs text-textDefault font-medium">Smoking:</p>
          <p className="text-primary text-sm font-semibold">{record.smoking ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
};

export default LifeStyleCategoryOverview;
