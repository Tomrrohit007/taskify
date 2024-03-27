"use client";

import { deleteBoard } from "@/actions/delete-board";
import { DeleteBoard } from "@/actions/delete-board/schema";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/user-actions";
import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";

type BoardOptionsProps = {
  id: string;
};

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError(error) {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='p-2 size-auto' variant='transparent'>
          <MoreHorizontal className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='py-3 px-0' side='bottom' align='start'>
        <div className='pb-4 text-sm font-medium text-center text-neutral-600'>
          Board actions
        </div>
        <PopoverClose asChild>
          <Button
            className='absolute top-2 right-2 p-2 size-auto text-neutral-600'
            variant='ghost'
          >
            <X className='size-4' />
          </Button>
        </PopoverClose>
        <Button
          variant='ghost'
          onClick={onDelete}
          disabled={isLoading}
          className='justify-start p-2 px-5 text-sm font-normal rounded-none size-full'
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
