'use client'
import { useRemoveInventoryType } from "@/mutations/mutations";
import { ItemTypes } from "@/types/types";
import { use } from "react";

export default function DisplayUintTypes({ itemTypesPromise }: { itemTypesPromise: Promise<ItemTypes[]> }) {
  const itemsTypes = use(itemTypesPromise);
  const { mutate, isPending, isError } = useRemoveInventoryType();
  return (
    <div className="mt-4 p-4 ">
      <ul className="flex flex-row flex-wrap gap-2 pl-0">
        {itemsTypes.map((itemType, index) =>
          <li key={itemType.id ?? index} className="list-none border rounded p-2 bg-gray-100">
            {itemType.label} (Value: {itemType.value})
            {"  "}
            <button
              disabled={isPending}
              className=" border p-1 text-center rounded-sm hover:bg-gray-300"
              onClick={() => mutate(itemType.id)}
            >X</button>
          </li>
        )}
        {isError && <h1 className="text-red-500">Error removing Item Type</h1>}
      </ul >
    </div >
  );
}
