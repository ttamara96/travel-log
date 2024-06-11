import { useEffect, useState } from "react";
import { UseFormRegister, FieldValues, UseFormSetValue } from "react-hook-form"

interface FormInputProps {
    register: UseFormRegister<FieldValues>,
    inputKey: string,
    type?: string,
    label: string,
    required?: boolean,
    value?: string | number;
    setValue?: UseFormSetValue<FieldValues>,
  }

export const FormInput: React.FC<FormInputProps> = ({ register, inputKey, type, label, required, value, setValue }) => {
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
      let newInputValue = inputValue ?? "";
      if(setValue) {
        setValue(inputKey, newInputValue)
      }
  }, [inputValue]);

    return  <>
                <label  className={"block text-gray-500 font-bold " + (required ? "required" : "")}  htmlFor={inputKey}>{label}</label>
                <input  className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-cyan-500'  
                        type={type ?? ""}  {...register(inputKey, { required: required ?? false })}
                        name={inputKey} 
                        value={inputValue}
                        onChange={(event) => {
                            setInputValue(event.target.value)
                        }} 
                        />
            </>
}