import useMergedState from "../../hooks/useMergedState";

interface SimpleCalenderWithHookProps {
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
const SimpleCalenderWithHook = (props: SimpleCalenderWithHookProps) => {
  const { value: propsValue, defaultValue, onChange } = props;

  const [mergedValue, setState] = useMergedState(new Date("2024-5-1"), {
    value: propsValue,
    defaultValue,
    onChange,
  });

  return (
    <div>
      {mergedValue?.toLocaleDateString()}
      <div
        onClick={() => {
          setState(new Date("2024-5-1"));
        }}
      >
        2023-5-1
      </div>
      <div
        onClick={() => {
          setState(new Date("2024-5-2"));
        }}
      >
        2023-5-2
      </div>
      <div
        onClick={() => {
          setState(new Date("2024-5-3"));
        }}
      >
        2023-5-3
      </div>
    </div>
  );
};

export default SimpleCalenderWithHook;
