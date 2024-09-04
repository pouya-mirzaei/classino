export default function useCalendar(date) {
  let weekDay = date.toLocaleDateString('fa', { weekday: 'long' });
  let day = date.toLocaleDateString('fa', { day: 'numeric' });
  let month = date.toLocaleDateString('fa', { month: 'long' });
  let year = date.toLocaleDateString('fa', { year: 'numeric' });
  let hours = date.getHours().toLocaleString('fa-ir', { minimumIntegerDigits: 2, useGrouping: false });
  let minutes = date.getMinutes().toLocaleString('fa-ir', { minimumIntegerDigits: 2, useGrouping: false });

  const displayFullDate = () => {
    return `${weekDay} ${day} ${month} ${year} ساعت ${hours}:${minutes}`;
  };

  return { day, weekDay, month, year, hours, minutes, displayFullDate };
}
