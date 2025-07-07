'use client'
import { ItemTypes } from "@/types/types";
import { use } from "react";

export default function DisplayUintTypes({ itemTypesPromise }: { itemTypesPromise: Promise<ItemTypes[]> }) {
  const itemsTypes = use(itemTypesPromise);
  return (
    <div className="mt-4 p-4 ">
      <ul className="flex flex-row flex-wrap gap-2 pl-0">
        {itemsTypes.map((item, index) =>
          <li key={item.id ?? index} className="list-none border rounded px-3 py-1 bg-gray-100">
            {item.label} (Value: {item.value})
          </li>
        )}        
      </ul>
    </div>
  );
}