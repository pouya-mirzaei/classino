export default function useCalendar() {
  const date = new Date();

  let weekDay = date.toLocaleDateString('fa', { weekday: 'long' });
  let day = date.toLocaleDateString('fa', { day: 'numeric' });
  let month = date.toLocaleDateString('fa', { month: 'long' });

  return { day, weekDay, month };
}
