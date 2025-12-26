export const formatCurrency = (value: number): string => {
  return `$${value.toFixed(2)}`;
};

export const formatDateTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString();
};
