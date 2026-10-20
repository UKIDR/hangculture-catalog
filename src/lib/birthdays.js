// Only display dates that were explicitly approved for PUBLIC publication.
// Never store unauthorized birth dates in the public repository.
export const MONTHS_RU = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

export function isValidBirthday(day, month) {
  if (!Number.isInteger(Number(day)) || !Number.isInteger(Number(month))) return false;
  if (day === null || day === '' || month === null || month === '') return false;
  const d = Number(day), m = Number(month);
  if (m < 1 || m > 12 || d < 1 || d > 31) return false;
  // Allow February 29. The future-day computation skips years without this date.
  const check = new Date(2024, m - 1, d);
  return check.getMonth() === m - 1 && check.getDate() === d;
}

export function publicBirthdays(institutions, enabled) {
  if (!enabled) return [];
  return institutions.filter((item) =>
    !item.demo && item.director_name && item.birthday_public === true
    && isValidBirthday(item.birthday_day, item.birthday_month)
  );
}
