import { Button } from '@nextui-org/react';
import { FileText, TrendingUp } from 'lucide-react';
import { FC } from 'react';

const StatusButton: FC = () => {
  return (
    <div className="flex gap-3">
      <Button className="bg-[#CFDCE5]" startContent={<TrendingUp size={15} />}>
        Speedtest
      </Button>
      <Button className="bg-[#CFDCE5]" startContent={<FileText size={15} />}>
        Logs
      </Button>
    </div>
  );
};

export { StatusButton };
