import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/Hooks';
import { getAccessClientAccountDependents } from '@/redux/accessRequest/slice';
import Loader from '@/components/ui/loader/Loader';
import { Button } from '@/components/ui/button';
import type { ClientDependent } from '@/pages/public/Types';

interface Props {
  onSelectDependent: (familyId: number) => void;
}

const AccessClientDependentsOverview = ({ onSelectDependent }: Props) => {
  const { uuid } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [dependents, setDependents] = useState<ClientDependent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDependents = async () => {
      try {
        if (!uuid) return;
        setLoading(true);

        const res = await dispatch(getAccessClientAccountDependents(uuid)).unwrap();
        setDependents(res?.data || []);
      } catch (error) {
        console.log('dependents error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDependents();
  }, [uuid, dispatch]);

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 md:p-6 bg-neutral-200">
      <div className="w-full h-full roundedDefault p-4 sm:p-5 md:p-6 bg-white">
        <h4 className="text-2xl text-black font-bold mb-6">Access Client Dependents</h4>

        {loading && <Loader />}

        {!loading && dependents.length === 0 && <p className="text-text-500 font-medium">No dependents found</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dependents.map((item) => (
            <div key={item.familyId} className="rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition">
              <h5 className="text-lg font-semibold text-black">{item.name}</h5>

              {item.nickName && <p className="text-sm text-gray-500">Nickname: {item.nickName}</p>}

              <div className="mt-2 text-sm space-y-1">
                <p className="text-text-500">
                  <span className="text-black font-medium">Gender:</span> {item.gender?.label}
                </p>
                <p className="text-text-500">
                  <span className="text-black font-medium">DOB:</span> {new Date(item.dateOfBirth).toLocaleDateString()}
                </p>
                <p className="text-text-500">
                  <span className="text-black font-medium">Birth Mark:</span> {item.hasBirthMark ? item.birthMark || 'Yes' : 'No'}
                </p>
              </div>

              <Button onClick={() => onSelectDependent(item.familyId)} className="mt-4 w-full py-2 text-sm rounded-lg bg-primary text-white hover:bg-primary/90">
                View Details
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessClientDependentsOverview;
