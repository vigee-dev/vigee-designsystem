'use client';

import { useQueryState } from 'nuqs';
import { Select } from '../Select/Select';
import { cn } from '../lib/utils';
import { useEffect } from 'react';

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

  const allowedValues = status.map((opt) => opt.value);
  useEffect(() => {
    if (queryState && !allowedValues.includes(queryState)) {
      setQueryState(defaultValue ?? null);
    }
  }, [queryState, allowedValues, defaultValue]);

  const handleChange = (value: string | undefined) => {
    setQueryState(value || null);
  };

  const displayValue =
    queryState && allowedValues.includes(queryState)
      ? queryState
      : defaultValue;

  return (
    <div className={cn('flex items-center', classNameWrapper)}>
      {' '}
      {icon && <span className='mr-1 flex items-center'>{icon}</span>}
      <Select
        className={cn('w-full md:w-auto', className)}
        onChange={handleChange}
        defaultValue={defaultValue}
        value={displayValue}
        placeholder={placeholder}
        options={status}
        clearable={clearOnDefault}
      />
    </div>
  );
};

export default SelectSearchParam;
