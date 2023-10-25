export function formatDate(date: Date): string | null {
  if (date instanceof Date && !isNaN(date.getTime())) {
    const options: Intl.DateTimeFormatOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString("ru-RU", options);
  }

  return null;
}

export function timeInMilliseconds(time: Date) {
  const date = new Date(time);
  return date.getTime();
}

export function millisecondsInDate(time: number) {
  const date = new Date(time);
  const options: Intl.DateTimeFormatOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

  return date.toLocaleDateString('en', options);
}