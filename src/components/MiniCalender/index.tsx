import React, { Ref, useImperativeHandle, useState } from "react";
import { MONTH_NAMES, WEEK } from "./constant";
import { daysOfMonth, firstDayOfMonth } from "./utils";
import style from "./index.module.css";

export interface MiniCalenderRef {
  getDate: () => Date;
  setDate: (date: Date) => void;
}

interface MiniCalenderProps {
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

const MiniCalender = (props: MiniCalenderProps, ref: Ref<MiniCalenderRef>) => {
  const { defaultValue = new Date(), onChange } = props;

  const [date, setDate] = useState(defaultValue);

  useImperativeHandle(ref, () => {
    return {
      getDate: () => date,
      setDate: (date) => setDate(date),
    };
  });

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const renderDates = (date: Date) => {
    const days = [];

    console.log("render");

    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={style.empty}></div>);
    }

    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    for (let i = 1; i <= daysCount; i++) {
      const clickHandler = () => {
        const curDate = new Date(date.getFullYear(), date.getMonth(), i);
        setDate(curDate);
        onChange?.(curDate);
      };
      if (i === date.getDate()) {
        days.push(
          <div
            key={i}
            className={[style.day, style.selected].join(" ")}
            onClick={clickHandler}
          >
            {i}
          </div>
        );
      } else {
        days.push(
          <div key={i} className={style.day} onClick={clickHandler}>
            {i}
          </div>
        );
      }
    }

    return days;
  };

  return (
    <div className={style.calender}>
      <div className={style.header}>
        <button onClick={handlePrevMonth}>《</button>
        <div>
          {date.getFullYear()}年{MONTH_NAMES[date.getMonth()]}
        </div>
        <button onClick={handleNextMonth}>》</button>
      </div>
      <div className={style.days}>
        {WEEK.map((weekName, index) => (
          <div key={index} className={style.day}>
            {weekName}
          </div>
        ))}
        {renderDates(date)}
      </div>
    </div>
  );
};

const MiniCalenderRefWrapper = React.forwardRef(MiniCalender);
export default MiniCalenderRefWrapper;
