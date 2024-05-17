/**
 * 获取当前月内的天数
 * @param year
 * @param month
 * @returns
 */
export const daysOfMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * 当前月第一天是星期几
 * @param year
 * @param month
 * @returns
 */
export const firstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};
