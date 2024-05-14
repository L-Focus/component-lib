import React, { useCallback, useEffect, useRef, useState } from "react";

function isFunction(value: unknown): value is Function {
  return typeof value === "function";
}

export default function useMergedState<T>(
  defaultStateValue: T,
  props?: {
    defaultValue?: T;
    value?: T;
    onChange?: (value: T) => void;
  }
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const { defaultValue, value: propsValue, onChange } = props || {};

  const isFirstRender = useRef<boolean>(true);
  const initPropsValue = useRef<T | undefined>(propsValue);

  const [stateValue, setStateValue] = useState<T>(() => {
    if (propsValue !== undefined) {
      return propsValue;
    } else if (defaultValue !== undefined) {
      return defaultValue;
    } else {
      return defaultStateValue;
    }
  });

  // propsValue 为 undefined，说明组件是非受控组件，使用内部维护的状态值
  // propsValue 不为 undefined，说明组件是受控组件，使用传入组件的状态值
  // mergedValue 其实仅作为组件内部数据展示用
  const mergedValue = propsValue === undefined ? stateValue : propsValue;

  useEffect(() => {
    // 如果是第一次渲染，直接使用初始值
    // 不管受控不受控都是使用初始值
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // initPropsValue.current !== propsValue 是自己加的
    // 不加的话， 在非受控组件模式下。
    // useEffect执行两次，会将初始化好的 stateValue 变为 undefined

    // 如果 propsValue 变为了 undefined，且不是初次渲染
    // 说明组件从 受控组件 变为了 非受控组件 了
    // 所以需要调用 setStateValue 自己维护状态
    if (
      initPropsValue.current !== propsValue &&
      propsValue === undefined &&
      !isFirstRender.current
    ) {
      setStateValue(propsValue!);
    }
  }, [propsValue]);

  // 只有当 stateValue 变化时
  // 也就是组件由受控组件切换为非受控组件时
  // 需要重新返回新的函数（因为闭包）
  // 组件受控时与非受控时，setState 函数不一样
  const setState = useCallback(
    (value: React.SetStateAction<T>) => {
      // 问题：这里为什么是 stateValue，而不是 mergedValue
      // https://juejin.cn/book/7294082310658326565/section/7363322372784390196?enter_from=course_center&utm_source=course_center
      // 受控模式下 stateValue 为 propsValue 
      // 非受控模式下 stateValue 历程： defaultValue -> 变化后的 stateValue
      const res = isFunction(value) ? value(stateValue) : value;

      // 组件受控时，也就是 propsValue 有值时，不需要组件自己维护状态
      // propsValue 为 undefined，说明组件是非受控组件
      // 组件需要自己维护状态
      if (propsValue === undefined) {
        console.log("组件非受控");
        setStateValue(res);
      }

      onChange?.(res);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stateValue]
  );

  return [mergedValue, setState];
}
