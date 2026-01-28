// src/components/ui/feedback/PageLoading.tsx
import Spinner from './BigSpinner';

export default function PageLoading() {
  return (
    <div className='flex min-h-[60vh] items-center justify-center'>
      <Spinner />
    </div>
  );
}
