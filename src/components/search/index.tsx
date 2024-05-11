import { SearchIcon } from '@/resources/icons/search';
import { Input } from '@nextui-org/react';
import { debounce } from 'lodash';
import { FC, useEffect, useState } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = (props) => {
  const { value, onChange } = props;
  const [inputValue, setInputValue] = useState(value);

  // Debounce the onChange function
  const debouncedOnChange = debounce(onChange, 500);

  // Update the debounced function whenever the value changes
  useEffect(() => {
    inputValue != value && debouncedOnChange(inputValue);

    // Cleanup function to cancel debouncing on unmount
    return () => {
      debouncedOnChange.cancel();
    };
  }, [inputValue, value, debouncedOnChange]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Input
      radius="lg"
      classNames={{
        label: 'text-black/50 dark:text-white/90',
        input: ['bg-transparent', 'text-black/90 dark:text-white/90', 'placeholder:text-default-700/50 dark:placeholder:text-white/60'],
        innerWrapper: 'bg-transparent',
        inputWrapper: [
          'outline',
          'outline-[#CFDCE5]',
          'bg-white',
          'rounded-md',
          'dark:bg-default/60',
          'backdrop-blur-xl',
          'backdrop-saturate-200',
          'hover:bg-white',
          'dark:hover:bg-default/70',
          'data-[hover=true]:bg-white[data-hover=true]',
          'group[data-focus=true] group-data-[focus=true]:bg-white',
          '!cursor-text',
        ],
      }}
      placeholder="Search"
      value={inputValue}
      onChange={handleChange}
      fullWidth={true}
      isClearable={true}
      onClear={() => setInputValue('')}
      startContent={<SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />}
    />
  );
};

export { SearchInput };
