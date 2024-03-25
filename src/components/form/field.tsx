interface FIeldProps {
  children: React.ReactNode;
}

export function Field({ children }: FIeldProps) {
  return <div className="flex flex-col flex-1 gap-3">{children}</div>;
}
