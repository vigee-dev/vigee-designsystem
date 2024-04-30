interface Props {
  children: React.ReactNode;
}

export function RoundedContainer({ children }: Props) {
  return (
    <div className="bg-white rounded-md shadow-sm p-8 max-w-7xl justify-center mx-auto">
      {children}
    </div>
  );
}
