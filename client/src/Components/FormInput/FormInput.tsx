import { UseFormRegister, FieldValues } from "react-hook-form"

interface FormInputProps {
    register: UseFormRegister<FieldValues>,
    inputKey: string,
    type?: string,
    label: string;
    required?: boolean
  }

export const FormInput: React.FC<FormInputProps> = ({ register, inputKey, type, label, required }) => {
    return  <>
                <label  className={"block text-gray-500 font-bold " + (required ? "required" : "")}  htmlFor={inputKey}>{label}</label>
                <input  className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-cyan-500'  
                    type={type ?? ""}  {...register(inputKey, { required: required ?? false })}
                    name={inputKey} />
            </>
}