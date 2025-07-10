'use client'

interface RemoveButtonProps {
  isPending: boolean;
  mutate: () => void;
}

export default function RemoveButton({ isPending, mutate }: RemoveButtonProps) {
  return (
    <button
      disabled={isPending}
      className={`p-2 text-center rounded-sm `}
      onClick={mutate}
    >
      {isPending ? '...' : 'X'}
    </button>
  );
}