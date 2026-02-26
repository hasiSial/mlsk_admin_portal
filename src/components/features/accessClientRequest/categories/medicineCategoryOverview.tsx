import Icon from '@/components/ui/svg_icon/SvgIcon';
import type { MedicineProvider } from '@/pages/public/Types';

interface Props {
  record?: MedicineProvider[] | null;
}

const MedicineCategoryOverview = ({ record = [] }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 mt-4">
      {record ? (
        record.map((provider: any, i: number) => (
          <div key={i} className="rounded-lg w-full h-auto p-3 space-y-3 col-span-12 lg:col-span-4 border border-borderDefault2 bg-specificCard">
            <h4 className="text-textDefault font-bold text-base">Provider: {provider.providerName}</h4>
            <p className="text-primary text-sm font-semibold">Doctor: {provider.doctorName}</p>

            {provider.medicines?.map((med: any, j: number) => (
              <div key={j} className="mt-6 space-y-2">
                <p className="text-xs text-textDefault font-medium">
                  Medicine: {med.medicineName} (Strength: {med.strength})
                </p>

                <div className="mt-3 space-y-1">
                  {med.medicineDosageTimes?.map((dosage: any, k: number) => (
                    <div key={k} className="flex justify-between border-b border-[#ccdce8] text-primary text-sm font-semibold py-1">
                      <span>
                        {dosage.day} - {dosage.time}
                      </span>
                      <span>Quantity: {dosage.quantity}</span>
                    </div>
                  ))}
                </div>

                <span className="block w-full mt-2 mb-2"></span>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="col-span-12">
          <p className="text-xs text-textDefault font-medium">No records are currently available.</p>
        </div>
      )}
    </div>
  );
};

export default MedicineCategoryOverview;
