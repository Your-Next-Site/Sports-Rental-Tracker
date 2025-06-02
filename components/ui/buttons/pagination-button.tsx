import { PaginationButtonProps } from "@/types/types";

export function PaginationButton({ onClick, disabled, children }: PaginationButtonProps) {
    return (
        <button
            className="rounded-md bg-buttoncolormain hover:brightness-90 hover:cursor-pointer select-none w-12 h-12 text-center p-1.5 text-white"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}