import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppSelector } from '@/redux/Hooks';
import type { RootState } from '@/redux/Store';
import SVG from 'react-inlinesvg';

const UserNav = () => {
  const { avatar, name, role } = useAppSelector((state: RootState) => state.authReducer);
  return (
    <div className="flex items-center gap-6">
      <div className="cursor-pointer">
        <SVG src="/icons/ring.svg" style={{ width: '24px', height: '24px' }} />
      </div>

      <div className="flex items-center gap-2">
        <span className="cursor-pointer">
          <Avatar className="rounded-xl">
            <AvatarImage src="/profile.jpg" alt="user" className="w-[48px] h-[48px] object-cover rounded-xl" />
          </Avatar>
          {/* <Avatar className="rounded-[12px] w-[44px] h-[44px]">
            {avatar && avatar !== 'null' ? (
              <AvatarImage src={avatar} alt="user" className="object-cover rounded-full" />
            ) : (
              <AvatarFallback className="rounded-[12px] bg-text-700 text-text-25 border border-text-500">{getInitials(name ?? '')}</AvatarFallback>
            )}
          </Avatar> */}
        </span>
        {/* <div className="hidden sm:block">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-paragraph">{role}</p>
        </div> */}
      </div>
    </div>
  );
};

export default UserNav;
