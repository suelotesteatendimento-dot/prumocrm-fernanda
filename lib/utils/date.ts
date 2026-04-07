const dateOnlyFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
});

export function formatDateOnly(dateValue: string) {
  const [year, month, day] = dateValue.split("-").map(Number);

  if (!year || !month || !day) {
    return dateValue;
  }

  return dateOnlyFormatter.format(new Date(year, month - 1, day));
}

export function getTodayDateOnly() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
