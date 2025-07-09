'use client '
export default function RemoveButton({ isPending, mutate, itemType }: { isPending: boolean, mutate: (argument: number) => void, itemType: { id: number } }) {
    return (
        <button
            disabled={isPending}
            className="border p-1 text-center rounded-sm hover:bg-gray-300"
            onClick={() => mutate(itemType.id)}
        >X</button>
    );
}