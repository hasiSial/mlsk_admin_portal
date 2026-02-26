// import React from 'react';

// interface CalendarViewProps {
//   year?: number;
//   month?: number;
//   bookedDates?: string[];
//   blockedDates?: string[];
// }

// const CalendarView: React.FC<CalendarViewProps> = ({ year, month, bookedDates = [], blockedDates = [] }) => {
//   const today = new Date();
//   const displayYear = typeof year === 'number' ? year : today.getFullYear();
//   const displayMonth = typeof month === 'number' ? month : today.getMonth();

//   const startOfMonth = new Date(displayYear, displayMonth, 1);
//   const endOfMonth = new Date(displayYear, displayMonth + 1, 0);
//   const daysInMonth = endOfMonth.getDate();
//   const startWeekday = startOfMonth.getDay();

//   const bookedSet = new Set(bookedDates);
//   const blockedSet = new Set(blockedDates);

//   const monthLabel = startOfMonth.toLocaleString(undefined, {
//     month: 'long',
//     year: 'numeric',
//   });

//   const weekdayShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

//   const formatDateKey = (date: Date | null): string | null => {
//     if (!date) return null;
//     const y = date.getFullYear();
//     const m = String(date.getMonth() + 1).padStart(2, '0');
//     const d = String(date.getDate()).padStart(2, '0');
//     return `${y}-${m}-${d}`;
//   };

//   const todayKey = formatDateKey(today);

//   const bookedColor = '#CFFFDB';
//   const blockedColor = '#FFBDC2';
//   const availableColor = '#EFEFEF';

//   const cells: (Date | null)[] = [];

//   for (let i = 0; i < startWeekday; i++) cells.push(null);
//   for (let d = 1; d <= daysInMonth; d++) {
//     cells.push(new Date(displayYear, displayMonth, d));
//   }
//   while (cells.length % 7 !== 0) cells.push(null);

//   return (
//     <div className="max-w-md mx-auto">
//       <h3 className="text-lg font-semibold text-primary mb-3">{monthLabel}</h3>

//       {/* Weekdays */}
//       <div className="grid grid-cols-7 text-center">
//         {weekdayShort.map((w, i) => (
//           <div key={i} className="py-2 font-medium text-textSecondary text-sm">
//             {w}
//           </div>
//         ))}
//       </div>

//       {/* Calendar */}
//       <div className="grid grid-cols-7 gap-1 mt-2">
//         {cells.map((cell, idx) => {
//           if (!cell) return <div key={idx} className="h-10" />;

//           const key = formatDateKey(cell)!;
//           const isToday = key === todayKey;

//           let bg = availableColor;
//           let status: 'available' | 'booked' | 'blocked' = 'available';

//           if (blockedSet.has(key)) {
//             bg = blockedColor;
//             status = 'blocked';
//           } else if (bookedSet.has(key)) {
//             bg = bookedColor;
//             status = 'booked';
//           }

//           return (
//             <button
//               key={idx}
//               type="button"
//               className={`h-10 rounded-md flex items-center justify-center border border-transparent`}
//               style={{ background: bg }}
//               title={`${key} - ${status}`}
//             >
//               <span className="text-sm font-medium">{cell.getDate()}</span>
//             </button>
//           );
//         })}
//       </div>

//       {/* Legend */}
//       <div className="flex justify-center gap-4 mt-4 border-t border-input pt-3 text-sm text-gray-600">
//         <Legend color={bookedColor} label="Booked" />
//         <Legend color={blockedColor} label="Blocked" />
//         <Legend color={availableColor} label="Available" />
//       </div>
//     </div>
//   );
// };

// const Legend = ({ color, label }: { color: string; label: string }) => (
//   <div className="flex items-center gap-1 text-primary">
//     <span className="h-4 w-4 rounded inline-block" style={{ background: color }} />
//     <span>{label}</span>
//   </div>
// );

// export default CalendarView;

import React from 'react';

interface CalendarViewProps {
  bookedDates?: string[];
  blockedDates?: string[];
  daysToShow?: number; // ✅ default 30
}

const CalendarView: React.FC<CalendarViewProps> = ({ bookedDates = [], blockedDates = [], daysToShow = 30 }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const bookedSet = new Set(bookedDates);
  const blockedSet = new Set(blockedDates);

  const formatKey = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const weekdayShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // 🔥 Generate rolling dates (today → next N days)
  const dates: Date[] = [];
  for (let i = 0; i < daysToShow; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }

  // 🔥 Align first week day
  const cells: (Date | null)[] = [];
  const startWeekday = dates[0].getDay();
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  cells.push(...dates);

  while (cells.length % 7 !== 0) cells.push(null);

  const bookedColor = '#CFFFDB';
  const blockedColor = '#FFBDC2';
  const availableColor = '#EFEFEF';

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-primary mb-3">{today.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</h3>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center">
        {weekdayShort.map((w) => (
          <div key={w} className="py-2 text-sm font-medium text-textSecondary">
            {w}
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-1 mt-2">
        {cells.map((cell, idx) => {
          if (!cell) return <div key={idx} className="h-10" />;

          const key = formatKey(cell);

          let bg = availableColor;
          let status = 'available';

          if (blockedSet.has(key)) {
            bg = blockedColor;
            status = 'blocked';
          } else if (bookedSet.has(key)) {
            bg = bookedColor;
            status = 'booked';
          }

          return (
            <button key={idx} className="h-10 rounded-md flex items-center justify-center text-sm font-medium" style={{ background: bg }} title={`${key} - ${status}`}>
              {cell.getDate()}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-4 border-t pt-3 text-sm">
        <Legend color={bookedColor} label="Booked" />
        <Legend color={blockedColor} label="Blocked" />
        <Legend color={availableColor} label="Available" />
      </div>
    </div>
  );
};

const Legend = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-1">
    <span className="h-4 w-4 rounded inline-block" style={{ background: color }} />
    <span>{label}</span>
  </div>
);

export default CalendarView;
