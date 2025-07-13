import Link from "next/link";


export default function PaginationBar({ page, currentTab, hasMore, totalPages, pathName }:
  {
    page: number,
    currentTab: string,
    hasMore: boolean,    
    totalPages: number,
    pathName: string
  }) {
  return (
    <div className="flex gap-3 text-2xl m-2 justify-center items-center ">
      <Link
        className={`rounded-md bg-buttoncolormain hover:brightness-90 hover:cursor-pointer select-none w-12 h-12 text-center p-1.5 hover:bg-buttoncolorsecend text-white ${page === 0 ? "opacity-50 pointer-events-none" : ""
          }`}
        href={{
          pathname: `${pathName}`,
          query: { currentTab: currentTab, rentedOutPage: Math.max(page - 1, 0) }
        }}>
        ‹
      </Link>
      <span className="text-xl select-none">
        {page + 1} / {totalPages}
      </span>
      <Link
        className={`rounded-md bg-buttoncolormain hover:brightness-90 hover:cursor-pointer select-none w-12 h-12 text-center p-1.5 hover:bg-buttoncolorsecend text-white ${!hasMore ? "opacity-50 pointer-events-none" : ""
          }`}
        href={{
          pathname: `${pathName}`,
          query: { currentTab: currentTab, rentedOutPage: page + 1 }
        }}>
        ›
      </Link>
    </div>
  );
}


// import { PaginationProps, Trip } from "@/types/types";
// import { ReactElement } from "react";
// import { PaginationButton } from "../buttons/pagination-button";

// export default function PaginationBar({
//   setPage,
//   page,
//   data,
//   isPlaceholderData,
// }: PaginationProps): ReactElement {
//   return (
//     <div className="flex gap-3 text-2xl m-2 justify-center items-center ">
//       <PaginationButton
//         onClick={() => setPage(0)}
//         disabled={page === 0}
//       >
//         «
//       </PaginationButton>
//       <PaginationButton
//         onClick={() => setPage((old: number) => Math.max(old - 1, 0))}
//         disabled={page === 0}
//       >
//         ‹
//       </PaginationButton>
//       <span className="text-xl select-none">
//         {page + 1} / {data?.totalPages}
//       </span>
//       <PaginationButton
//         onClick={() => {
//           if (!isPlaceholderData && data?.hasMore) {
//             setPage((old: number) => old + 1);
//           }
//         }}
//         disabled={isPlaceholderData || !data?.hasMore}
//       >
//         ›
//       </PaginationButton>
//       <PaginationButton
//         onClick={() => {
//           if (!isPlaceholderData) {
//             setPage(data?.totalPages - 1);
//           }
//         }}
//         disabled={isPlaceholderData || !data?.hasMore}
//       >
//         »
//       </PaginationButton>
//     </div>
//   );
// }
