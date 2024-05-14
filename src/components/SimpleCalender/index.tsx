import { useEffect, useRef, useState } from "react";

interface SimpleCalenderProps {
  /** 展示日期 */
  value?: Date;
  /** 默认展示的日期 */
  defaultValue?: Date;
  /** 日期变化回调 */
  onChange?: (date: Date) => void;
}

/**
 * 简单的日历组件（受控和非受控）
 * 通过判断传入组件的 value 是不是 undefined 来区分受控组件和非受控组件
 * 如果 value 不为 undefined，组件为受控模式，组件内部的数据显示使用传入进来的 value
 * 如果 value 为 undefined，组件为非受控模式，组件内部的数据显示使用内部状态值
 *
 * tips：
 * 1. 组件内部调用 setInnerValue 说明是非受控模式
 * @param props
 * @returns
 */
const SimpleCalender = (props: SimpleCalenderProps) => {
  const { value: propsValue, defaultValue, onChange } = props;

  /** 是否为第一次渲染 */
  const isFirstRender = useRef<boolean>(true);

  const [innerValue, setInnerValue] = useState<Date | undefined>(() => {
    if (propsValue !== undefined) {
      return propsValue;
    } else {
      return defaultValue;
    }
  });

  /** 渲染时，判断用那个值 */
  const mergedValue = propsValue === undefined ? innerValue : propsValue;

  const changeValue = (date: Date) => {
    // propsValue 为 undefined，说明是组件非受控（组件自己维护内部状态）
    if (propsValue === undefined) {
      // 自己维护内部状态
      setInnerValue(date);
    }

    onChange?.(date);
  };

  useEffect(() => {
    // 如果是第一次渲染，初始化 innerValue
    // 不需要判断是否需要 setInnerValue
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // 如果 propsValue 为 undefined 且不是第一次渲染
    // 组件由受控模式切换为非受控模式
    if (propsValue === undefined && !isFirstRender.current) {
      // 更新内部状态值
      // 组件在内部自己维护状态值
      setInnerValue(propsValue);
    }
  }, [propsValue]);

  return (
    <div>
      {mergedValue?.toLocaleDateString()}
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

export default SimpleCalender;
