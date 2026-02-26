import ValueSkeleton from '@/common/valueSkeleton';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState, type FC } from 'react';
import SVG from 'react-inlinesvg';

interface Props {
  icon?: string;
  title: string;
  value: string;
  change?: string;
  date?: string;
  loading?: boolean;
}

const AnalyticsCard: FC<Props> = ({ icon, title, value, change, date, loading = false }) => {
  const [count, setCount] = useState(0);

  const targetValue = Number(value) || 0;

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-IN');
  };

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      if (elapsed < duration) {
        const progress = Math.min(elapsed / duration, 1);
        setCount(Math.floor(progress * targetValue));
        requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };

    requestAnimationFrame(animate);
  }, [targetValue]);
  return (
    <div
      className="
        rounded-lg p-4 bg-white shadow cursor-pointer
        transition duration-300 ease-out
        hover:scale-[1.03] hover:shadow-lg

      "
    >
      <div className="flex gap-2 items-center justify-between">
        <h2 className="text-textSecondary font-medium text-base">{title}</h2>
        {icon && (
          <Avatar className="w-[44px] h-[44px] rounded-[12px] bg-primary/15 flex justify-center items-center">
            <SVG
              src={icon}
              className="text-primary"
              // preProcessor={(code) => {
              //   return code.replaceAll(/fill=".*?"/g, 'fill="currentColor"');
              // }}
            />
          </Avatar>
        )}
      </div>
      {loading ? (
        <ValueSkeleton />
      ) : (
        <h2 className="text-heading">
          {title === 'Total Revenue' ? '$ ' : ''}
          {formatNumber(count)}
        </h2>
      )}
      {/* {loading ? <ValueSkeleton /> : <h2 className="text-heading">{value}</h2>} */}
    </div>
  );
};

export default AnalyticsCard;
