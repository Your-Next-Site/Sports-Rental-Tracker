import { Trip } from "@/types/types";
import { ReactElement } from "react";


interface PaginationProps {
  setPage:  React.Dispatch<React.SetStateAction<number>>;
  page: number;
  data:{ trips: Trip[]; hasMore: boolean; totalPages: number; };
  isPlaceholderData: boolean;
}

export default function PaginationBar({
  setPage,
  page,
  data,
  isPlaceholderData,
}: PaginationProps): ReactElement {

  // console.log("data.totalPages")
  // console.log(data.totalPages)
  return (
    <>
      <div className="flex gap-3 text-2xl m-2 justify-center items-center ">
        <button
          className="rounded-md bg-buttoncolormain hover:brightness-90 hover:cursor-pointer select-none w-12 h-12 text-center p-1.5 text-white"
          onClick={() => setPage(0)}
          disabled={page === 0}
        >
          «
        </button>
        <button
          className="rounded-md bg-buttoncolormain hover:brightness-90 hover:cursor-pointer select-none w-12 h-12 text-center p-1.5 text-white"
          onClick={() => setPage((old: number) => Math.max(old - 1, 0))}
          disabled={page === 0}
        >
          ‹
        </button>
        <span className="text-xl select-none">
          {page + 1} / {data?.totalPages}
        </span>
        <button
          className="rounded-md bg-buttoncolormain hover:brightness-90 hover:cursor-pointer select-none w-12 h-12 text-center p-1.5 text-white"
          onClick={() => {
            if (!isPlaceholderData && data?.hasMore) {
              setPage((old: number) => old + 1);
            }
          }}
          disabled={isPlaceholderData || !data?.hasMore}
        >
          ›
        </button>
        <button
          className="rounded-md bg-buttoncolormain hover:brightness-90 hover:cursor-pointer select-none w-12 h-12 text-center p-1.5 text-white"
          onClick={() => {
            if (!isPlaceholderData) {
              setPage(data?.totalPages -1);
            }
          }}
          disabled={isPlaceholderData || !data?.hasMore}
        >
          »
        </button>
      </div>
    </>
  );
}
