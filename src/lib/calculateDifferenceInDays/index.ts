export function CalculateDifferenceInDays({ startDate, endDate } : { startDate: Date, endDate: Date }) : number {
  const diffInMs = endDate.getTime() - startDate.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays;
}