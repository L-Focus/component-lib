import { useState } from "react";

interface CalendarUncontrolProps {
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

/**
 * 日历非受控组件
 * @param props
 * @returns
 */
const CalendarUncontrol = (props: CalendarUncontrolProps) => {
  const { defaultValue = new Date(), onChange } = props;

  const [value, setValue] = useState(defaultValue);

  const changeValue = (date: Date) => {
    setValue(date);
    onChange?.(date);
  };

  return (
    <div>
      {value.toLocaleDateString()}
      <div
        onClick={() => {
          changeValue(new Date("2024-5-1"));
        }}
      >
        2023-5-1
      </div>
      <div
        onClick={() => {
          changeValue(new Date("2024-5-2"));
        }}
      >
        2023-5-2
      </div>
      <div
        onClick={() => {
          changeValue(new Date("2024-5-3"));
        }}
      >
        2023-5-3
      </div>
    </div>
  );
};

export default CalendarUncontrol;
