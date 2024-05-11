import { Appliance } from '@/api/services/appliances';
import { DOWNLOADSTATUSCOLOR } from '@/utils/constants';
import {
  Button,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/react';
import { Link } from '@tanstack/react-router';
import { SlidersVertical } from 'lucide-react';
import { FC, useMemo, useState } from 'react';
import { SearchInput } from '../search';

interface AppliancesProps {
  appliances: Appliance[];
}

const headers = [
  { key: 'serialNo', label: 'Device Serial' },
  { key: 'location', label: 'Location' },
  { key: 'bandwidth', label: 'Bandwidth' },
  { key: 'deviceStatus', label: 'Status' },
  { key: 'downloadStatus', label: 'Download Status' },
  { key: 'osVersion', label: 'OS Version' },
  { key: 'view', label: '' },
];

const renderCellContent = (columnKey: string | number, item: Appliance) => {
  switch (columnKey) {
    case 'location':
      return (
        <div className="flex flex-col gap-2">
          <div>{item?.theatreName}</div>
          <div className="text-[#084782]">
            {item?.location?.city}, {item?.location?.state}, {item?.location?.country}
          </div>
        </div>
      );
    case 'downloadStatus':
      return (
        <div className="flex flex-row gap-2 items-center">
          <div className={`w-2.5 h-2.5 rounded ${DOWNLOADSTATUSCOLOR[item.downloadStatus]}`}></div>
          <div className="text-[#084782]">{getKeyValue(item, columnKey)}</div>
        </div>
      );
    case 'deviceStatus':
      return (
        <div className="flex flex-row gap-2 items-center">
          <div className={`w-2.5 h-2.5 rounded ${getKeyValue(item, columnKey) === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <div className="text-[#084782]">{getKeyValue(item, columnKey)}</div>
        </div>
      );
    case 'bandwidth':
      return (
        <div className="flex flex-col gap-2 text-left items-left">
          <div className="text-[#084782]">{getKeyValue(item, columnKey)}</div>
          <div className="text-[#69788C]">{getKeyValue(item, 'avgBandwidth')}</div>
        </div>
      );
    case 'view':
      return (
        <div className="w-vw text-right">
          <Link
            to="/appliances/$applianceId"
            params={{
              applianceId: `${item?.id}`,
            }}
          >
            <Button size="sm" className="bg-[#E6ECF0]">
              View
            </Button>
          </Link>
        </div>
      );
    default:
      return getKeyValue(item, columnKey);
  }
};

const PaginationControl: FC<{ page: number; pages: number; setPage: (page: number) => void }> = ({ page, pages, setPage }) => {
  return <Pagination variant="light" showControls color="secondary" showShadow page={page} total={pages} onChange={(page) => setPage(page)} />;
};

const FilterControls: FC<{
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  rowsPerPageOptions: { value: number; label: string }[];
}> = ({ rowsPerPage, setRowsPerPage, rowsPerPageOptions }) => {
  return (
    <Select
      variant="bordered"
      defaultSelectedKeys={[rowsPerPage.toString()]}
      disabledKeys={[rowsPerPage.toString()]}
      onChange={(e) => setRowsPerPage(+e.target.value)}
      classNames={{
        trigger: ['border-[#CFDCE5]', 'hover:border-[#CFDCE5]'],
        listbox: ['bg-white', 'focus:bg-white'],
      }}
    >
      {rowsPerPageOptions.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};

const Appliances: FC<AppliancesProps> = ({ appliances }) => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredAppliances = useMemo(() => {
    return appliances.filter((appliance) =>
      Object.values(appliance).some((value) => value && typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [appliances, searchQuery]);

  const pages = useMemo(() => Math.ceil(filteredAppliances.length / rowsPerPage), [filteredAppliances, rowsPerPage]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredAppliances.slice(start, end);
  }, [page, filteredAppliances, rowsPerPage]);

  const appliancesLength = Math.ceil(appliances.length / 10);
  const rowsPerPageOptions = useMemo(() => {
    return Array.from({ length: appliancesLength }, (_, i) => ({ value: (i + 1) * 10, label: `${(i + 1) * 10}` }));
  }, [appliancesLength]);

  const handleSearch = (query: string) => {
    setPage(1);
    setSearchQuery(query);
  };

  return (
    <Table
      aria-label="Appliance data"
      topContent={
        <div className="flex w-full justify-between gap-5">
          <div className="flex flex-row gap-3 items-center">
            <SearchInput value={searchQuery} onChange={handleSearch} />
            <Button className="bg-[#CFDCE5]" startContent={<SlidersVertical size={54} />}>
              Filter
            </Button>
          </div>
          {items?.length ? (
            <div className="flex gap-3 justify-between items-center">
              <div className="flex justify-between items-center">
                <label className="flex gap-3 items-center text-default-400 text-small w-32">
                  Show
                  <FilterControls rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} rowsPerPageOptions={rowsPerPageOptions} />
                </label>
              </div>
              <PaginationControl page={page} pages={pages} setPage={setPage} />
            </div>
          ) : null}
        </div>
      }
      classNames={{
        wrapper: ['rounded-lg', 'justify-normal', 'min-h-[700px]'],
        th: ['px-2', 'py-5', 'bg-transparent', 'font-normal', 'text-sm', 'text-[#2D3540]', 'border-b', 'border-divider'],
        td: ['p-2', 'font-normal', 'text-xs'],
      }}
    >
      <TableHeader>
        {headers.map((header) => (
          <TableColumn key={header?.key}>{header?.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody emptyContent={'No appliance found'} items={items}>
        {(item) => <TableRow key={item.serialNo}>{(columnKey) => <TableCell>{renderCellContent(columnKey, item)}</TableCell>}</TableRow>}
      </TableBody>
    </Table>
  );
};

export { Appliances };
