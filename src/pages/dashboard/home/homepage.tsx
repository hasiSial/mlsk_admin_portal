import AnalyticsCard from '@/components/features/dashboard/analyticsCard';
import StatChartCard from '@/components/features/dashboard/statChartCard';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomPaginationObj } from '@/utils/constants';
import ColoredPieChart from '@/components/charts/coloredPieChart';
import ColoredMultiLineChart from '@/components/charts/coloredMultiLineChart';
import { homePageData } from '@/utils/demeData';
import { homePageDemeData } from './Utils';

interface TopPerformanceCardProps {
  avatar: string;
  title: string;
  subTitle: string;
  status: string;
}

const homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-2">
      <p className="text-xl lg:text-2xl text-black font-medium">Good Morning Smith !</p>
      <h2 className="text-2xl xl:text-3xl font-semibold text-black">Welcome To Med Legal Safe Keep</h2>
      {/* Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
        {homePageData.analytics.map((item, index) => (
          <AnalyticsCard key={index} icon={item.icon} title={item.title} value={item.value} />
        ))}
      </div>
    </div>
  );
};

export default homepage;
