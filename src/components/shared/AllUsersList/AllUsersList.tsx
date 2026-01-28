'use client';
import { FC } from 'react';
import { Button } from '@mui/material';
import { User } from '@/types';

interface AllUsersProps {
  users: User[];
  loading: boolean;
  error: string | null;
  onSelect: (id: number) => void;
}

const AllUsersList: FC<AllUsersProps> = ({
  users,
  loading,
  error,
  onSelect,
}) => {
  if (loading) {
    // Skeleton loading for multiple list items
    return (
      <div className='card bg-base-100 card-border border p-4 shadow-xl'>
        <div className='card-body'>
          <h1 className='card-title mb-2 text-lg font-semibold'>All Users</h1>
          <ul className='space-y-3'>
            {[...Array(5)].map((_, i) => (
              <li
                key={i}
                className='bg-base-200 flex animate-pulse items-center justify-between rounded-lg p-3'
              >
                <div className='w-3/4 space-y-1'>
                  <div className='bg-base-300 skeleton h-4 w-1/2 rounded-md'></div>
                  <div className='bg-base-300 skeleton h-3 w-1/3 rounded-md'></div>
                </div>
                <div className='bg-base-300 skeleton h-8 w-16 rounded-md'></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (error) return <p className='text-error'>Error: {error}</p>;
  if (!users.length) return <p className='text-info'>No users found</p>;

  return (
    <div>
      <ul className='space-y-3'>
        {users.map(user => (
          <li
            key={user.id}
            className='bg-base-200 hover:bg-base-300 flex items-center justify-between rounded-lg p-3 transition-colors'
          >
            <div>
              <p className='font-medium'>{user.name}</p>
              <p className='secondary-text text-sm'>{user.email}</p>
            </div>
            <Button
              variant='contained'
              className='primary-btn-contained btn-xs'
              onClick={() => onSelect(user.id)}
            >
              View
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsersList;
