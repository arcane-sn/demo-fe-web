import Dayjs from "dayjs";

export const LocalGMT = () => {
  // 1. Create a Day.js object for the current local time
  const localTime = Dayjs();

  // 2. Get the UTC offset in minutes
  const offsetMinutes = localTime.utcOffset();

  // 3. Convert minutes to a formatted offset string (e.g., "+07:00")
  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
  const offsetMins = Math.abs(offsetMinutes) % 60;
  const sign = offsetMinutes >= 0 ? "+" : "-";

  const formattedOffset = `${sign}${String(offsetHours).padStart(2, "0")}`;

  return formattedOffset;
};
