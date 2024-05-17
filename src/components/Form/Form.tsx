import { CSSProperties, FormEvent, ReactNode, useRef, useState } from "react";
import classNames from "classnames";
import FormContext from "./FormContext";

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  className?: string;
  style?: CSSProperties;
  initialValues?: Record<string, any>;
  children?: ReactNode;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (errors: Record<string, any>) => void;
}

const Form = (props: FormProps) => {
  const {
    className,
    style,
    initialValues,
    children,
    onFinish,
    onFinishFailed,
    ...rest
  } = props;
  const validatorMap = useRef(new Map<string, Function>());
  const errors = useRef<Record<string, any>>({});

  const [values, setValues] = useState<Record<string, any>>(
    initialValues || {}
  );

  const onValueChange = (key: string, value: any) => {
    values[key] = value;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    validatorMap.current.forEach((callbackFunc, key) => {
      if (typeof callbackFunc === "function") {
        errors.current[key] = callbackFunc();
      }
    });

    const errorList = Object.keys(errors.current)
      .map((errorKey) => {
        return errors.current[errorKey];
      })
      .filter(Boolean);

    if (errorList.length) {
      onFinishFailed?.(errors.current);
    } else {
      onFinish?.(values);
    }
  };

  const handleValidateRegister = (name: string, callbackFunc: Function) => {
    validatorMap.current.set(name, callbackFunc);
  };

  const cls = classNames("ant-form", className);

  return (
    <FormContext.Provider
      value={{
        values,
        setValues,
        onValueChange,
        validateRegister: handleValidateRegister,
      }}
    >
      <form className={cls} style={style} onSubmit={handleSubmit} {...rest}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;
