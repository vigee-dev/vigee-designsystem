'use client';

import { useQueryState } from 'nuqs';
import { Select } from '../Select/Select';
import { cn } from '../lib/utils';

interface Props {
  searchParam: string;
  placeholder?: string;
  status: { label: string; value: string; icon?: React.ReactNode }[];
  className?: string;
  classNameWrapper?: string;
  shallow?: boolean;
  defaultValue?: string;
  clearOnDefault?: boolean;
  icon?: React.ReactNode;
}

const SelectSearchParam = ({
  searchParam,
  status,
  placeholder,
  className,
  classNameWrapper,
  shallow = true,
  defaultValue,
  clearOnDefault = true,
  icon,
}: Props) => {
  const [queryState, setQueryState] = useQueryState(searchParam, {
    ...(defaultValue ? { defaultValue } : {}),
    clearOnDefault,
    shallow,
  });

  const handleChange = (value: string | undefined) => {
    setQueryState(value || null);
  };

  return (
    <div className={cn('flex items-center', classNameWrapper)}>
      {' '}
      {icon && <span className='mr-1 flex items-center'>{icon}</span>}
      <Select
        className={cn('w-full md:w-auto', className)}
        onChange={handleChange}
        defaultValue={defaultValue}
        value={queryState || undefined}
        placeholder={placeholder}
        options={status}
        clearable={clearOnDefault}
      />
    </div>
  );
};

export default SelectSearchParam;
