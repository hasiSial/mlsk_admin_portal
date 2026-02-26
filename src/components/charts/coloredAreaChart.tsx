import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartProps {
  data: any[];
  dataKey?: string;
  height?: number;
  yTicks?: number[];
  showGrid?: boolean;
  showTooltip?: boolean;
  gradientId?: string;
}

const ColoredAreaChart: React.FC<ChartProps> = ({
  data,
  dataKey = 'value',
  height = 250,
  yTicks = [0, 10, 15, 20, 25],
  showGrid = true,
  showTooltip = true,
  gradientId = 'areaGradient',
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: isMobile ? 10 : 20,
          left: isMobile ? -10 : -15,
          bottom: 0,
        }}
      >
        {/* Gray gradient under line */}
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9CA3AF" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#9CA3AF" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        {showGrid && <CartesianGrid stroke="#E0E0E080" strokeDasharray="3 3" />}

        {/* X Axis */}
        <XAxis dataKey="name" tick={{ fill: '#19354D', fontSize: isMobile ? 10 : 12 }} />

        {/* Y Axis */}
        <YAxis ticks={yTicks} domain={[Math.min(...yTicks), Math.max(...yTicks)]} tick={{ fill: '#19354D', fontSize: isMobile ? 10 : 12 }} />

        {showTooltip && <Tooltip />}

        {/* Area */}
        <Area type="monotone" dataKey={dataKey} stroke="#19354D" strokeWidth={2} fill={`url(#${gradientId})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ColoredAreaChart;
