// export default Icon;
import { type FC } from 'react';
import SVG from 'react-inlinesvg';

interface Props {
  icon: string;
  className?: string;
  fill?: boolean;
  stroke?: boolean;
}

const Icon: FC<Props> = ({ icon, className, fill = false, stroke = false }) => {
  return (
    <SVG
      src={icon}
      className={className}
      preProcessor={(code) => {
        let modified = code;

        if (fill || (!fill && !stroke)) {
          modified = modified.replaceAll(/fill=".*?"/g, 'fill="currentColor"');
        }

        if (stroke || (!fill && !stroke)) {
          modified = modified.replace(/stroke=".*?"/g, 'stroke="currentColor"');
        }

        return modified;
      }}
    />
  );
};

export default Icon;
