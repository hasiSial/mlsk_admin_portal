'use client';
import { usePage } from '@/providers/pageProvider';
import { SidebarTrigger } from '@/components/ui/sidebar';
import SVG from 'react-inlinesvg';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import NextImage from '@/components/ui/nextImage/NextImage';
import { Input } from '@/components/ui/input';
import UserNav from './userNav';

interface HeaderProps {
  showExpandButton?: boolean;
}

// const Header = ({ showExpandButton = true }: HeaderProps) => {
//   const { pageInfo } = usePage();
//   return (
//     // <div
//     //   className="
//     //     fixed top-0 left-0 right-0
//     //     w-full bg-secondary
//     //     max-h-[80px]
//     //     py-4 px-4 md:px-10
//     //     flex justify-between items-center
//     //     border
//     //     z-50
//     //   "
//     // >
//     //   {showExpandButton && (
//     //     <SidebarTrigger className="sm:hidden cursor-pointer border-2 rounded-[4px] border-textLight-25">
//     //       {/* <SVG src="/icons/bars.svg" style={{ width: '24px', height: '24px' }} /> */}
//     //       <Icon icon="/icons/bars.svg" className="text-primary-25" fill={true} />
//     //     </SidebarTrigger>
//     //   )}

//     //   <div className="hidden md:block">
//     //     {/* <PageHeader /> */}
//     //     <NextImage image="/images/main-logo-bg-white.svg" imageWidth="276px" classNames="w-[267px] h-[43px]" />
//     //   </div>
//     //   <div className="w-full xl:w-auto flex">
//     //     <Input className="w-full h-[44px] rounded-[10px] border border-white" value="" placeholder="Search Here" icon={<SVG src="/icons/search-bar.svg" />} iconPosition="left" />
//     //   </div>
//     //   <UserNav />
//     // </div>
//     <div
//       className="
//         fixed top-0 left-0 right-0
//         w-full bg-secondary
//         max-h-[80px]
//         py-4 px-4 md:px-10
//         flex items-center gap-4 xl:gap-60
//         border
//         z-50
//       "
//     >
//       {showExpandButton && (
//         <SidebarTrigger className="sm:hidden cursor-pointer border-2 rounded-[4px] border-white">
//           <Icon icon="/icons/bars.svg" className="" fill={true} />
//         </SidebarTrigger>
//       )}

//       <div className="hidden md:block shrink-0">
//         <NextImage image="/images/main-logo-bg-white.svg" imageWidth="276px" classNames="w-[267px] h-[43px]" />
//       </div>

//       {/* 🔥 Search bar full width */}
//       <div className="flex-1">
//         <Input
//           className="w-full h-[44px] rounded-[10px] border border-white text-white"
//           value=""
//           placeholder="Search Here"
//           icon={<SVG src="/icons/search-bar.svg" />}
//           iconPosition="right"
//         />
//       </div>

//       <UserNav />
//     </div>
//   );
// };
const Header = ({ showExpandButton = true }: HeaderProps) => {
  const { pageInfo } = usePage();

  return (
    <div className="flex items-center justify-end  h-[80px] px-4 md:px-10 bg-white border-b border-text-200">
      {showExpandButton && (
        <SidebarTrigger className="sm:hidden cursor-pointer border-2 rounded-[4px] border-white">
          <Icon icon="/icons/bars.svg" fill={true} />
        </SidebarTrigger>
      )}

      {/* <div className="shrink-0 hidden md:block">
        <NextImage image="/images/main-logo-bg-white.svg" imageWidth="276px" classNames="w-[267px] h-[43px]" />
      </div> */}
      <div className="w-[48px] h-[48px] border border-text-400 rounded-xl flex items-center justify-center">
        <Icon icon="/icons/notification.svg" stroke={true} fill={false} />
      </div>

      <UserNav />
    </div>
  );
};

export default Header;
