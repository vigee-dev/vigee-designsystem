'use client';
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Select } from '../../components/Select/Select';
import { cn } from '../lib/utils';

interface Props {
  statusName: string;
  placeholder?: string;
  status: { label: string; value: string; icon?: React.ReactNode }[];
  className?: string;
  classNameWrapper?: string;
  defaultValue?: string;
  icon?: React.ReactNode;
}

export const SelectFilter = ({
  statusName,
  status,
  placeholder,
  className,
  classNameWrapper,
  defaultValue,
  icon,
}: Props) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useCallback(
    (status: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', '1');

      if (
        status === undefined ||
        status === searchParams.get(statusName) ||
        status === '' ||
        status === 'all'
      ) {
        params.delete(statusName);
      } else {
        params.set(statusName, status);
      }

      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, statusName]
  );

  return (
    <div className={cn('flex items-center', classNameWrapper)}>
      {icon && <span className='mr-1 flex items-center'>{icon}</span>}
      <Select
        className={cn('w-full md:w-auto', className)}
        onChange={handleSearch}
        defaultValue={defaultValue ?? searchParams.get(statusName) ?? ''}
        placeholder={placeholder ?? ''}
        options={status}
      />
    </div>
  );
};
