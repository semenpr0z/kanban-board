// helpers/dateFormatting.js

export function formatRelativeDate(date) {
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Сегодня";
  } else if (diffDays === 1) {
    return "Вчера";
  } else if(diffDays <= 3) {
    return `${diffDays} дня назад`;
  } else{
    return date.toLocaleDateString()
  }
}
