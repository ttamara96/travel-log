import { useEffect, useState } from "react";
import { UseFormRegister, FieldValues, UseFormSetValue } from "react-hook-form"

interface FormInputProps {
    register: UseFormRegister<FieldValues>,
    inputKey: string,
    rows?: number,
    label: string,
    required?: boolean,
    value?: string | number,
    setValue?: UseFormSetValue<FieldValues>,
  }

export const FormTextArea: React.FC<FormInputProps> = ({ register, inputKey, rows, label, required, value, setValue }) => {
  const [textAreaValue, setTextAreaValue] = useState(value);
  useEffect(() => {
      let newInputValue = textAreaValue ?? "";
      if(setValue) {
        setValue(inputKey, newInputValue )
      }
  }, [textAreaValue]);
  
    return <>
                <label  className={"block text-gray-500 font-bold " + (required ? "required" : "")} htmlFor={inputKey}>{label}</label>
                <textarea   className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-cyan-500'  
                            rows={rows ?? 3}  {...register(inputKey, { required: required ?? false })} 
                            name={inputKey} 
                            value={textAreaValue}
                            onChange={(event) => {
                              setTextAreaValue(event.target.value)
                            }}  
                />
            </>
}