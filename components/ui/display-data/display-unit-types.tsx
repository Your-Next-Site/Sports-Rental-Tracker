'use client'
import { useRemoveInventoryType } from "@/mutations/mutations";
import { ItemTypes } from "@/types/types";
import { use } from "react";
import RemoveButton from "../buttons/remove";
import { Button } from "../button";
import { AlertDialogComponent } from "../alerts/alert";

export default function DisplayUnitTypes({ itemTypesPromise }: { itemTypesPromise: Promise<ItemTypes[]> }) {
  const itemTypes = use(itemTypesPromise);
  const { mutate, isError } = useRemoveInventoryType();


  return (
    <div className="mt-4 p-4 ">
      <ul className="flex flex-row flex-wrap gap-2 pl-0">
        {itemTypes.map((itemType) => (
          <li key={itemType.id} className="flex gap-2 list-none border rounded p-2 bg-gray-100">
            {itemType.label} (Value: {itemType.value})
            {"  "}
            <AlertDialogComponent
              text="X"
              func={() => mutate(itemType.id)}
              id={itemType.id}
            />
          </li>
        ))}
        {isError && <h1 className="text-red-500">Error removing Item Type</h1>}
      </ul>
    </div>
  );
}