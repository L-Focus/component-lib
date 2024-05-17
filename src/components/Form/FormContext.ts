import { createContext } from "react";

export interface FormContextProps {
  /** 表单值 */
  values?: Record<string, any>;
  /** 设置表单值 */
  setValues?: (values: Record<string, any>) => void;
  onValueChange?: (key: string, value: any) => void;
  validateRegister?: (name: string, callbackFunc: Function) => void;
}

export default createContext<FormContextProps>({});
