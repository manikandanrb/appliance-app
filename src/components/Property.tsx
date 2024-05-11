import { FC } from 'react';

interface PropertyProps {
  label: string;
  value: string | undefined;
}

const Property: FC<PropertyProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-[#2D3540] text-xs">{label}</div>
      <div className="text-[#2D3540] text-sm font-medium">{value}</div>
    </div>
  );
};

export { Property };
