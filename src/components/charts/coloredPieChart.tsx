import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface PieData {
  name: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieData[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  showLabel?: boolean;
}

const RADIAN = Math.PI / 180;

// Custom label inside pie slice (white color)
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="#FFFFFF" fontSize={12} fontWeight="bold" textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ColoredPieChart: React.FC<PieChartProps> = ({ data, height = 250, innerRadius = 50, outerRadius = 100, showLabel = true }) => {
  // sort largest slice to appear on right-bottom (startAngle, endAngle change direction)
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  const total = sortedData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="w-full flex flex-col lg:flex-row items-center gap-4">
      {/* Custom Legend */}
      <div className="mt-4 flex flex-col justify-center gap-4">
        {sortedData.map((entry) => {
          const percent = ((entry.value / total) * 100).toFixed(0);
          return (
            <div key={entry.name} className="flex items-center space-x-2">
              <span className="inline-block w-3 h-3 rounded" style={{ backgroundColor: entry.color }}></span>
              <span className="text-sm font-medium">
                {entry.name} - {percent}%
              </span>
            </div>
          );
        })}
      </div>

      {/* Pie Chart */}
      <ResponsiveContainer width="60%" height={height}>
        <PieChart>
          <Pie
            data={sortedData}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            dataKey="value"
            startAngle={90} // rotates chart → largest slice to bottom-right
            endAngle={-270}
            labelLine={false}
            label={showLabel ? renderCustomizedLabel : false}
          >
            {sortedData.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ColoredPieChart;
