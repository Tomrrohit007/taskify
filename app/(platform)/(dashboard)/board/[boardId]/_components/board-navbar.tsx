import { Board } from "@prisma/client";
import { BoardTitleForm } from "./board-title-form";
import { BoardOptions } from "./board-options";

type BoardNavbarProps = {
  data: Board;
};

export const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  return (
    <div className="flex fixed top-14 gap-x-4 items-center px-6 w-full h-14 text-white z-[40] bg-black/50">
      <BoardTitleForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} />
      </div>
    </div>
  );
};
