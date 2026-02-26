'use client';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { useAppDispatch, useAppSelector } from '@/redux/Hooks';
import { removeToken } from '@/redux/auth/slice';
import * as routes from '@/routes/Index';
import { useEffect } from 'react';
import { usePage } from '@/providers/pageProvider';
import type { RootState } from '@/redux/Store';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import NextImage from '../ui/nextImage/NextImage';
import { navItems } from './data';

const Logo = () => {
  return (
    <div className="flex w-full py-1">
      <NextImage image="/white-bg-logo.svg" imageWidth="161px" classNames="w-[161px] h-[109px]" />
    </div>
  );
};

export function AppSidebar() {
  const { name } = useAppSelector((state: RootState) => state.authReducer);

  const pathName = useLocation().pathname;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pageInfo, setPageInfo } = usePage();

  const messageCount = 25;
  const logout = () => {
    dispatch(removeToken());
    navigate('/auth/login');
  };

  return (
    //xl:w-[200px] 2xl:w-[300px]
    <Sidebar className="w-none border-sidebar-ring border-r-2 px-3 py-3 bg-primaryShade-700">
      <SidebarHeader className="mb-4 ms-3">
        <Logo />
      </SidebarHeader>
      <SidebarContent className="">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title} className="group/item">
                  <SidebarMenuButton
                    isActive={pathName.includes(item.link)}
                    asChild
                    className={`
                      flex items-center text-base text-normal text-primaryShade-50 font-normal h-[50px] px-4 rounded-xl
                      ${pathName.includes(item.link) ? 'bg-sidebar-accent font-medium' : 'font-medium hover:bg-sidebar-accent'}
                    `}
                  >
                    <Link to={item.link} className="w-full py-5 flex items-center justify-between hover:text-white">
                      <div className="flex items-center gap-2">
                        <Icon
                          icon={pathName.includes(item.link) ? item.iconActive : item.icon}
                          stroke
                          fill={false}
                          className={`
                          transition duration-200
                          ${pathName.includes(item.link) ? 'invert brightness-0' : 'group-hover/item:invert group-hover/item:brightness-0'}
                        `}
                        />

                        {/* <Icon
                          icon={pathName.includes(item.link) ? item.iconActive : item.icon}
                          stroke
                          className={pathName.includes(item.link) ? 'text-white' : 'group-hover/item:text-white'}
                        /> */}
                        <span className={pathName.includes(item.link) ? 'text-white' : 'group-hover/item:text-white'}>{item.title}</span>
                      </div>

                      {/* {item.title === 'Messages' && (
                        <span
                          className="
                            h-6 min-w-[24px]
                            flex items-center justify-center
                            rounded-full 
                            bg-primary text-text-850 
                            text-sm font-medium
                          "
                        >
                          {messageCount}
                        </span>
                      )} */}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="">
        <Link
          to={routes.Settings()}
          // to="#"

          className={`gap-2 flex items-center text-base text-normal text-primaryShade-50 font-normal h-[50px] px-4 rounded-xl ${
            pathName.includes('/dashboard/settings') ? 'bg-sidebar-accent font-medium' : 'font-medium hover:bg-sidebar-accent'
          }  px-4`}
        >
          <SVG src={pathName.includes('/dashboard/setting') ? '/icons/setting.svg' : '/icons/setting.svg'} style={{ width: '24px', height: '24px' }} />
          <span className="text-base">Settings</span>
        </Link>
        <button onClick={logout} type="button" className="text-primaryShade-50 flex justify-start hover:bg-sidebar-accent gap-2 !py-3 rounded-xl h-[50px] px-4">
          <Icon icon={'/icons/logout.svg'} stroke={true} fill={false} className="" />

          <span className="text-sm">Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
