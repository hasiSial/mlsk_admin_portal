import { Fragment, type FC } from 'react';
import SVG from 'react-inlinesvg';

interface Props {
  icon: string;
  title: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  iconBg?: string;
  iconTextColor?: string;
}

const StatChartCard: FC<Props> = ({ icon, title, actions, children, iconBg, iconTextColor }) => {
  return (
    <div className="shadow rounded-[10px] p-3 xl:p-4 bg-white gap-6">
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-2 items-center">
          <SVG
            src={icon}
            className={iconTextColor ? iconTextColor : 'text-secondary'}
            preProcessor={(code) => {
              return code.replaceAll(/fill=".*?"/g, 'fill="currentColor"');
            }}
          />
          <h2 className="text-cardHeading">{title}</h2>
        </div>
        <div>{actions}</div>
      </div>
      {/* <Separator className="mt-3" /> */}
      <div>{children}</div>
    </div>
  );
};

export default StatChartCard;
