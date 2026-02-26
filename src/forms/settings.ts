import type { SettingUserInfo } from '@/pages/dashboard/settings/types';

export interface SettingsFormTypes {
  avatar: string;
  userName: string;
  email: string;
  role: number | null;
}

export interface SettingDisciplineFormTypes {
  disciplineId?: number | null;
  disciplineName: string;
  icon: string;
}

export const SettingsFormDefaultValues: SettingsFormTypes = {
  avatar: '',
  userName: '',
  email: '',
  role: null,
};

export const SetSettingsFormDefaultValues = (settings: any) => {
  return {
    avatar: settings.avatar,
    userName: settings.name,
    email: settings.email || '',
    role: settings?.role?.name || '',
  };
};

export const SettingsDisciplineFormDefaultValues: SettingDisciplineFormTypes = {
  disciplineId: null,
  disciplineName: '',
  icon: '',
};

export const SetSettingsDisciplineFormDefaultValues = (settings: SettingDisciplineFormTypes) => {
  return {
    disciplineId: settings?.disciplineId,
    disciplineName: settings?.disciplineName ?? '',
    icon: settings?.icon ?? '',
  };
};
