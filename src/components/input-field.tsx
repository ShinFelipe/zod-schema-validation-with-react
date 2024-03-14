import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  labelText: string;
  id: string;
  type: "text" | "radio" | "checkbox" | "email" | "number";
  placeholder: string;
  register: UseFormRegisterReturn;
}

export function InputField({ id, labelText, type, placeholder, register }: InputFieldProps) {
  return (
    <>
      <label htmlFor={id} className="text-white text-sm font-semibold">
        {labelText}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="bg-[#224064] outline-none p-2 text-zinc-300 text-sm px-2 font-medium focus:ring-2 focus:ring-emerald-400"
        {...register}
      />
    </>
  );
}
