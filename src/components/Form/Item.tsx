import { CSSProperties, ReactElement, ReactNode, useState } from "react";

export interface ItemProps {
  className?: string;
  style?: CSSProperties;
  label?: ReactNode;
  name?: string;
  valuePropName?: string;
  rules?: Record<string, any>[];
  children?: ReactElement;
}

const Item = (props: ItemProps) => {
  const { className, label, children, style, name, valuePropName, rules } =
    props;

  const [value, setValue] = useState();

  // 例如：当传入的是 button 时，不需要包装，直接返回即可
  if (!name) {
    return children;
  }




  return <></>;
};

export default Item;
