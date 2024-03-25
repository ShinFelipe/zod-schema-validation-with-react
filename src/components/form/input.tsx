import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function Input(props: InputProps) {
  const { register } = useFormContext();
  return (
    <input
      className="bg-[#224064] outline-none p-2 text-zinc-300 text-sm px-2 font-medium focus:ring-2 focus:ring-emerald-400"
      {...props}
      {...register(props.name)}
    />
  );
}
