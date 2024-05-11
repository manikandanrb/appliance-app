import { Breadcrumbs } from '@nextui-org/react';
import { ReactNode } from 'react';

const Breadcrumb = ({ children }: { children: ReactNode }) => {
  return <Breadcrumbs classNames={{ base: ['p-6'], separator: ['px-4', 'text-[#69788C]'] }}>{children}</Breadcrumbs>;
};

export { Breadcrumb };
