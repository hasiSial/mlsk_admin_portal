import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: any[];
  height?: number;
  yTicks?: number[];
  showGrid?: boolean;
  showTooltip?: boolean;
}

const ColoredMultiLineChart = ({ data, height = 250, yTicks = [0, 20, 40, 60, 80, 100], showGrid = true, showTooltip = true }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: isMobile ? 10 : 20,
          left: isMobile ? -10 : 0,
          bottom: 0,
        }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#444" />}

        {/* X-Axis */}
        <XAxis
          dataKey="name"
          stroke="#ccc"
          tickLine={false}
          axisLine={{ stroke: '#ccc' }}
          interval={isMobile ? 'preserveStartEnd' : 0}
          tick={({ x, y, payload }) => (
            <text
              x={x}
              y={y}
              dy={12}
              textAnchor="middle"
              fill="#ccc" // visible label color
              fontSize={isMobile ? 10 : 12}
            >
              {payload.value}
            </text>
          )}
        />

        {/* Y-Axis */}
        <YAxis
          ticks={yTicks}
          stroke="#ccc"
          tickLine={false}
          axisLine={{ stroke: '#ccc' }}
          width={isMobile ? 30 : 40}
          tick={({ x, y, payload }) => (
            <text x={x} y={y} dy={4} textAnchor="end" fill="#ccc" fontSize={isMobile ? 10 : 12}>
              {payload.value}
            </text>
          )}
        />

        {showTooltip && <Tooltip cursor={{ stroke: '#666' }} />}

        {/* NEW LINE */}
        <Line type="monotone" dataKey="new" stroke="#3B82F6" strokeWidth={2} dot={false} />

        {/* COMPLETE LINE */}
        <Line type="monotone" dataKey="complete" stroke="#10B981" strokeWidth={2} dot={false} />

        {/* CANCEL LINE */}
        <Line type="monotone" dataKey="cancel" stroke="#EF4444" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ColoredMultiLineChart;
