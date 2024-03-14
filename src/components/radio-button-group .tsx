import { UseFormRegisterReturn } from "react-hook-form";
import { radioButtonProperty } from "../constants";
import { Label } from "./label";

interface RadioButtonGroupProps {
  label: string;
  register: UseFormRegisterReturn;
}

export function RadioButtonGroup({ label, register }: RadioButtonGroupProps) {
  return (
    <div className="flex flex-col gap-1 mb-5">
      <Label label={label} />

      <div className="flex gap-4 items-center">
        {radioButtonProperty.map((radio) => (
          <div key={radio.id} className="flex items-center gap-1.5">
            <input
              type="radio"
              id={radio.id}
              className="bg-[#224064] outline-none p-2 text-zinc-300 text-sm px-2 font-medium focus:ring-2 focus:ring-emerald-400"
              {...register}
              value={radio.label}
            />
            <Label htmlFor={radio.id} label={radio.label} />
          </div>
        ))}
      </div>
    </div>
  );
}
