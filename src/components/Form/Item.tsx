import React, {
  CSSProperties,
  ChangeEvent,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Schema from "async-validator";
import FormContext from "./FormContext";
import classNames from "classnames";

export interface ItemProps {
  className?: string;
  style?: CSSProperties;
  label?: ReactNode;
  name?: string;
  valuePropName?: string;
  rules?: Record<string, any>[];
  children?: ReactElement;
}

const getValueFromEvent = (e: ChangeEvent<HTMLInputElement>) => {
  const { target } = e;

  if (target.type === "checkbox") {
    return target.checked;
  } else if (target.type === "radio") {
    return target.value;
  } else {
    return target.value;
  }
};

const Item = (props: ItemProps) => {
  const { className, label, children, style, name, valuePropName, rules } =
    props;

  const { values, onValueChange, validateRegister } = useContext(FormContext);

  const [value, setValue] = useState<string | number | boolean>();
  const [error, setError] = useState("");

  const nameVal = useMemo(() => {
    if (!name || !values) return undefined;

    return values[name];
  }, [values, name]);

  useEffect(() => {
    if (value !== nameVal) {
      setValue(nameVal);
    }
  }, [nameVal]);

  const handleValidate = (value: any) => {
    let errorMsg = null;

    if (name && Array.isArray(rules) && rules.length) {
      const validator = new Schema({
        [name]: rules.map((rule) => ({ type: "string", ...rule })),
      });

      validator.validate({ [name]: value }, (errors) => {
        if (errors) {
          if (errors.length) {
            setError(errors[0].message!);
            errorMsg = errors[0].message;
          }
        } else {
          setError("");
          errorMsg = null;
        }
      });
    }

    return errorMsg;
  };

  useEffect(() => {
    name && validateRegister?.(name, () => handleValidate(value));
  }, [value, name]);

  const propsName: Record<string, any> = {};
  if (valuePropName) {
    propsName[valuePropName] = value;
  } else {
    propsName.value = value;
  }

  const childEle =
    children && React.Children.toArray(children).length > 1
      ? children
      : React.cloneElement(children!, {
          ...propsName,
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            const inputValue = getValueFromEvent(e);
            setValue(inputValue);
            name && onValueChange?.(name, inputValue);

            handleValidate(inputValue);
          },
        });

  const cls = classNames("ant-form-item", className);

  return (
    <>
      {name ? (
        <div className={cls} style={style}>
          <div>{label && <label>{label}</label>}</div>
          <div>
            {childEle}
            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>
        </div>
      ) : (
        <>
          {/* 例如：当传入的是 button 时，name不存在，不需要包装，直接返回即可 */}
          {children}
        </>
      )}
    </>
  );
};

export default Item;
