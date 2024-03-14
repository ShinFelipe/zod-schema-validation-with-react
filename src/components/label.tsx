interface LabelProps {
  label: string;
  htmlFor?: string;
}

export function Label({ label, htmlFor }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-white text-sm font-semibold">
      {label}
    </label>
  );
}
