import dayjs from 'dayjs';

export const BASE_URL = 'https://d2sqm65ghqrxbu.cloudfront.net/';

export function truncateText(text: string, maxLength = 100) {
  if (!text) return '';
  if (text?.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

export function getInitials(name: string) {
  if (!name) return '';
  const words = name.split(' ');
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return words.map((word) => word.charAt(0).toUpperCase()).join('');
}

export function capitalizeFirstLetter(string: string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function capitalizeLastLetter(string: string) {
  if (!string) return '';
  return string.charAt(0).toLowerCase() + string.slice(1).toLowerCase();
}

export const getDateRangeFilter = (filter: string, customStart?: string, customEnd?: string) => {
  const today = dayjs();

  switch (filter) {
    case 'today':
      return {
        start: today.startOf('day').format('YYYY-MM-DD'),
        end: today.endOf('day').format('YYYY-MM-DD'),
      };

    case 'month':
      return {
        start: today.startOf('month').format('YYYY-MM-DD'),
        end: today.endOf('month').format('YYYY-MM-DD'),
      };

    case 'year':
      return {
        start: today.startOf('year').format('YYYY-MM-DD'),
        end: today.endOf('year').format('YYYY-MM-DD'),
      };

    case 'custom':
      return {
        start: customStart || '',
        end: customEnd || '',
      };

    default:
      return { start: '', end: '' };
  }
};

export const formatTo12Hour = (time: string) => {
  if (!time) return '';
  const [hour, minute] = time.split(':');
  const h = parseInt(hour);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const formattedHour = h % 12 || 12;
  return `${formattedHour.toString().padStart(2, '0')}:${minute} ${ampm}`;
};

export const useFormatDate = (date?: string | Date | null, format: 'YYYY-MM-DD' | 'DD-MM-YYYY' | 'DD/MM/YYYY' | 'MMM DD, YYYY' = 'YYYY-MM-DD'): string => {
  if (!date) return '';

  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  switch (format) {
    case 'DD-MM-YYYY':
      return `${day}-${month}-${year}`;

    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;

    case 'MMM DD, YYYY':
      return `${monthsShort[d.getMonth()]} ${day}, ${year}`;

    case 'YYYY-MM-DD':
    default:
      return `${year}-${month}-${day}`;
  }
};
