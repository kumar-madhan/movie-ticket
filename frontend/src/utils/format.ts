export const formatCurrency = (value: number): string => {
  return `$${value.toFixed(2)}`;
};

export const formatDateTime = (dateStr?: string) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return isNaN(date.getTime())
    ? "Invalid Date"
    : date.toLocaleString();
};