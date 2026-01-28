'use client';
import { FC } from 'react';
import { User } from '@/types';

interface SelectedUserProps {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const SelectedUserCard: FC<SelectedUserProps> = ({ user, loading, error }) => {
  if (loading) {
    return (
      <div className='card bg-base-200 animate-pulse shadow-xl'>
        <div className='card-body'>
          <div className='bg-base-300 skeleton mb-3 h-6 w-3/4 rounded-md'></div>
          <div className='bg-base-300 skeleton mb-2 h-4 w-5/6 rounded-md'></div>
          <div className='space-y-1'>
            <div className='bg-base-300 skeleton h-4 w-3/4 rounded-md'></div>
            <div className='bg-base-300 skeleton h-4 w-2/3 rounded-md'></div>
            <div className='bg-base-300 skeleton h-4 w-1/2 rounded-md'></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) return <p className='text-error'>Error: {error}</p>;
  if (!user) return <p className='text-info'>No user selected</p>;

  return (
    <div className='card bg-base-200 shadow-lg'>
      <div className='card-body'>
        <h5 className='card-title'>Name: {user.name}</h5>
        <p className='secondary-text'>Email: {user.email}</p>
        <div className='secondary-text'>
          <p className='font-medium'>Address:</p>
          <p className='ml-4'>{user.address.street}</p>
          <p className='ml-4'>{user.address.city}</p>
          <p className='ml-4'>{user.address.zipcode}</p>
        </div>
      </div>
    </div>
  );
};

export default SelectedUserCard;
