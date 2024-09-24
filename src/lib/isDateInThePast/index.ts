export const isDateInThePast = (expiry_time: string | Date): boolean => {
  const currentTime = new Date();
  const expiryTime = new Date(expiry_time);

  return expiryTime < currentTime;
};