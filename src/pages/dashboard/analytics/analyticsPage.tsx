import AnalyticsCard from '@/components/features/dashboard/analyticsCard';
import StatChartCard from '@/components/features/dashboard/statChartCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ColoredPieChart from '@/components/charts/coloredPieChart';
import ColoredMultiLineChart from '@/components/charts/coloredMultiLineChart';
import { TfiExport } from 'react-icons/tfi';
import { analytics } from './Utils';
import ColoredLineChart from '@/components/charts/coloredLineChart';
import ColoredBarChart from '@/components/charts/coloredBarChart';
import ColoredAreaChart from '@/components/charts/coloredAreaChart';

interface TopPerformanceCardProps {
  avatar: string;
  title: string;
  subTitle: string;
  status: string;
}

const AnalyticsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-primary font-semibold text-base xl:text-xl 2xl:text-2xl">Analytics</h2>

        <div className="flex justify-end">
          <Button type="button" variant="link" className="!no-underline flex items-center gap-2 h-[44px] rounded-[10px] bg-primary text-white font-semibold px-4">
            <TfiExport size={28} className="text-white" />

            <span>Export CSV</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="col-span-2 xl:col-span-1">
          <StatChartCard icon="/icons/calender.svg" title="Bookings by Week">
            <div className="space-y-4 mt-8">
              <ColoredMultiLineChart data={analytics?.bookingOverTime} yTicks={[0, 20, 40, 60, 80, 100]} height={346} showGrid={false} />
            </div>
          </StatChartCard>
        </div>
        <div className="col-span-2 xl:col-span-1">
          <StatChartCard icon="/icons/pie_chart.svg" title="Revenue Breakdown by Category">
            <div className="space-y-4 mt-8">
              <ColoredPieChart data={analytics?.revenueByCategory} height={346} innerRadius={0} outerRadius={100} />
            </div>
          </StatChartCard>
        </div>
        <div className="col-span-2 xl:col-span-1">
          <StatChartCard icon="/icons/report_bar.svg" title="Bookings by Pond Type">
            <div className="space-y-4 mt-8">
              <ColoredBarChart data={analytics?.bookedByPondType} gradientId="chart2Gradient" height={346} yTicks={[0, 50, 100, 150, 200, 250, 300, 350]} />
            </div>
          </StatChartCard>
        </div>
        <div className="col-span-2 xl:col-span-1">
          <StatChartCard icon="/icons/solar-graph.svg" title="Monthly Revenue Trend">
            <div className="space-y-4 mt-8">
              <ColoredAreaChart data={analytics?.revenueByMonthlyTrend} yTicks={[0, 5, 10, 15, 20, 25]} height={346} showGrid={false} />
            </div>
          </StatChartCard>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
