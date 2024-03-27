'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CardWithList } from '@/types';
import { Copy, Trash } from 'lucide-react';

import { useAction } from '@/hooks/user-actions';
import { CopyCard } from '@/actions/copy-card/schema';
import { copyCard } from '@/actions/copy-card';
import { deleteCard } from '@/actions/delete-card';
import { useParams } from 'next/navigation';
import { useCardModal } from '@/hooks/use-card-modal';
import { toast } from 'sonner';

type ActionsProps = {
  data: CardWithList;
};

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams();

  const cardModal = useCardModal();

  const { isLoading: isLoadingCopy, execute: executeCopyCard } = useAction(
    copyCard,
    {
      onSuccess(data) {
        toast.success(`Card "${data.title}" copied`);
        cardModal.onClose();
      },
      onError(error) {
        toast.error(error);
      },
    }
  );
  const { isLoading: isLoadingDelete, execute: executeDeleteCard } = useAction(
    deleteCard,
    {
      onSuccess(data) {
        toast.success(`Card "${data.title}" deleted`);
        cardModal.onClose();
      },
      onError(error) {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;
    executeCopyCard({ id: data.id, boardId });
  };
  const onDelete = () => {
    const boardId = params.boardId as string;
    executeDeleteCard({ id: data.id, boardId });
  };

  return (
    <div className='space-y-2 mt-2'>
      <p className='text-xs font-semibold'>Actions</p>
      <Button
        size='inline'
        onClick={onCopy}
        disabled={isLoadingCopy}
        className='w-full justify-start'
        variant='gray'>
        <Copy className='size-4 mr-2' />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        size='inline'
        className='w-full justify-start'
        variant='gray'>
        <Trash className='size-4 mr-2' />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className='space-y-2 mt-2'>
      <Skeleton className='w-20 h-4 bg-neutral-200' />
      <Skeleton className='w-full h-8 bg-neutral-200' />
      <Skeleton className='w-full h-8 bg-neutral-200' />
    </div>
  );
};
