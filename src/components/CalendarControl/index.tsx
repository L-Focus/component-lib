interface CalendarControlProps {
  value: Date;
  onChange?: (date: Date) => void;
}

/**
 * 日历受控组件
 * 受调用方控制，数据不处理直接返回
 * @param props
 * @returns
 */
const CalendarControl = (props: CalendarControlProps) => {
  const { value, onChange } = props;

  const changeValue = (date: Date) => {
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

export default CalendarControl;
