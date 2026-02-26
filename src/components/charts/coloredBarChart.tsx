import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

interface ChartProps {
  data: any[];
  dataKey?: string;
  height?: number;
  yTicks?: number[];
  showGrid?: boolean;
  showTooltip?: boolean;
  showLabel?: boolean;
  gradientId?: string;
}

const ColoredBarChart: React.FC<ChartProps> = ({
  data,
  dataKey = 'value',
  height = 300,
  yTicks = [0, 50, 100, 150, 200, 250, 300, 350],
  showGrid = true,
  showTooltip = true,
  showLabel = true,
  gradientId = 'barGradient',
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return (
    <div style={{ background: '#ffffff' }}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          {/* Gradient */}
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#19354D" stopOpacity={1} />
              <stop offset="100%" stopColor="#19354D" stopOpacity={0.6} />
            </linearGradient>
          </defs>

          {showGrid && <CartesianGrid stroke="#E0E0E080" strokeDasharray="3 3" />}

          {/* X Axis */}
          <XAxis dataKey="name" tick={{ fill: '#19354D', fontSize: isMobile ? 10 : 12 }} />

          {/* Y Axis */}
          <YAxis ticks={yTicks} domain={[Math.min(...yTicks), Math.max(...yTicks)]} tick={{ fill: '#19354D', fontSize: isMobile ? 10 : 12 }} />

          {showTooltip && (
            <Tooltip
              formatter={(value: number) => `${value}`}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E0E0E080',
              }}
            />
          )}

          <Bar dataKey={dataKey} fill={`url(#${gradientId})`}>
            {showLabel && <LabelList dataKey={dataKey} position="top" fill="#19354D" fontSize={isMobile ? 10 : 12} />}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ColoredBarChart;
