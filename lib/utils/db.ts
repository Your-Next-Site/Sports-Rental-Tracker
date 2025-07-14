import { neon } from "@neondatabase/serverless";
import { schemaAddInventoryItem, schemaAddInventoryItemType, schemaAddRaft, schemaRemoveInventoryItem, schemaRemoveInventoryItemType } from "./zod/schemas";
import { ItemTypes, Items, Trip } from "@/types/types";
import { auth } from "@clerk/nextjs/server";

export async function fetchItemTypes() {
  const { userId, orgId } = await auth.protect()

  const sql = neon(`${process.env.DATABASE_URL}`);
  const result = await sql`
    SELECT * FROM item_types WHERE organization_id = ${orgId || userId};
    `;
  return result as ItemTypes[];
}

export async function fetchItems() {
  const { userId, orgId } = await auth.protect()

  const sql = neon(`${process.env.DATABASE_URL}`);
  const result = await sql`
    SELECT 
      ii.id as id,
      ii.unit_number as unitNumber,
      it.value as type,
      EXISTS (
        SELECT 1 FROM items_rented ir 
        WHERE ir.unit_number = ii.unit_number 
        AND ir.item_type_id = ii.item_type_id 
        AND ir.arrival_time IS NULL
      ) as rented,
      ii.status
    FROM inventory_item ii
    JOIN item_types it ON ii.item_type_id = it.id
    WHERE ii.organization_id = ${orgId || userId};
  `;
  return result as Items[];
}

export async function addInventoryItem(
  validatedFields: typeof schemaAddInventoryItem._type,
  orgId: string
) {
  const sql = neon(`${process.env.DATABASE_URL}`);

  const [result] = await sql`
            INSERT INTO inventory_item (                
                item_type_id,
                unit_number,
                organization_id
            )
            VALUES (               
                (SELECT id FROM item_types WHERE value = ${validatedFields.itemType}),
                ${validatedFields.unitNumber},
                ${orgId}                                
            )
            
            RETURNING *`;
  return [result];
}

export async function removeInventoryItem(
  id: number,
  orgId: string
) {
  const sql = neon(`${process.env.DATABASE_URL}`);

  const [result] = await sql`
    DELETE FROM inventory_item
    WHERE id = ${id} AND organization_id = ${orgId}
    RETURNING *`;
  return [result];
}

export async function addInventoryItemType(
  validatedFields: typeof schemaAddInventoryItemType._type,
  orgId: string
) {
  const sql = neon(`${process.env.DATABASE_URL}`);

  const [result] = await sql`
            INSERT INTO item_types (                
                value,
                label,
                organization_id
            )
            VALUES (               
                ${validatedFields.unitTypeValue},
                ${validatedFields.unitTypeLabel},
                ${orgId}                                
            )
            
            RETURNING *`;
  return [result];
}

export async function
  removeInventoryItemTypeDb(
    itemTypeId: number

  ) {
  const sql = neon(`${process.env.DATABASE_URL}`);

  const [result] = await sql`
    DELETE FROM item_types
    WHERE id = ${itemTypeId}
    RETURNING *;
  `;
  return [result];
}
export async function toggleAvailabilityDb(unitNumber: number, orgId: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const result = await sql`
    UPDATE inventory_item ii
    SET status = CASE WHEN status = true THEN false ELSE true END
    WHERE ii.unit_number = ${unitNumber}
    AND ii.organization_id = ${orgId}
    RETURNING *;
  `;
  return [result];
}
export async function fetchTrips(tripCurrent: boolean, currentPage: number) {
  const { userId, orgId } = await auth.protect()
  const pageSize: number = 10;
  const sql = neon(`${process.env.DATABASE_URL}`);
  const offset = currentPage * pageSize; // Calculate where to start fetching results

  // Fetch paginated trips
  const trips = (await sql`
        SELECT 
            row.id,
            row.guest_name,
            rt.label as item_type_id,
            row.unit_number,
            row.checked_out_by,
            row.organization_id,
            row.departure_time,
            row.arrival_time                
        FROM items_rented row
        JOIN item_types rt ON row.item_type_id = rt.id
        WHERE departure_time > NOW() - INTERVAL '24 hours'
        AND row.organization_id = ${orgId || userId}
        ${tripCurrent
      ? sql`AND row.arrival_time IS NULL`
      : sql`AND row.arrival_time IS NOT NULL`
    }
        ORDER BY row.departure_time DESC
        LIMIT ${pageSize} OFFSET ${offset}`) as Trip[];

  // Fetch total trip count to determine if there are more pages
  const totalTripsResult = await sql`
        SELECT COUNT(*) FROM items_rented
        WHERE departure_time > NOW() - INTERVAL '24 hours'
        ${tripCurrent
      ? sql`AND arrival_time IS NULL`
      : sql`AND arrival_time IS NOT NULL`
    }
  `;
  const totalTrips = Number(totalTripsResult[0].count);
  const hasMore = offset + pageSize < totalTrips;
  const totalPages = Math.ceil(Number(totalTripsResult[0].count) / pageSize);

  return { trips, hasMore, totalPages };
}

export async function addRentalStartDB(
  validatedFields: typeof schemaAddRaft._type,
  userId: string | null | undefined,
  orgId: string
) {
  const sql = neon(`${process.env.DATABASE_URL}`);

  const [result] = await sql`
            INSERT INTO items_rented (
                guest_name,
                item_type_id,
                unit_number,
                checked_out_by,
                organization_id,
                departure_time
            )
            VALUES (
                ${validatedFields.guestName},
                (SELECT id FROM item_types WHERE value = ${validatedFields.itemType}),
                ${validatedFields.unitNumber},
                ${userId},
                ${orgId},
                NOW()
                )
                RETURNING *;
                `;
  return [result];
}

export async function endRentalDB(
  rentedUnitId: number,
  userId: string | null | undefined,
  orgId: string
) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const [result] = await sql`
        UPDATE items_rented 
        SET arrival_time = NOW(),
            checked_in_by = ${userId}
        WHERE id = ${rentedUnitId}
        AND organization_id  =${orgId}
        RETURNING *;
        `;
  return [result];
}

export async function searchTripsDB(
  guestName: string,
  departureTime: Date | string,
  currentPage: number,
) {
  const { userId, orgId } = await auth.protect()

 
  const pageSize: number = 10;
  const offset = currentPage * pageSize;

  const sql = neon(`${process.env.DATABASE_URL}`);

  const date = new Date(departureTime);
  const dateCondition = !isNaN(date.getTime());
  
  try {
    const trips = await (sql`
            SELECT 
            ir.id,
            ir.guest_name,
            it.label as item_type_id,
            ir.unit_number,
            ir.checked_out_by,
            ir.departure_time,
            ir.arrival_time                
        FROM items_rented ir
        JOIN item_types it ON ir.item_type_id = it.id
        WHERE 
            LOWER(ir.guest_name) LIKE LOWER(${"%" + guestName + "%"})
            AND ir.organization_id = ${orgId || userId}
            ${dateCondition
        ? sql`AND DATE(ir.departure_time) = DATE(${date})`
        : sql``
      }
        ORDER BY ir.departure_time DESC
        LIMIT ${pageSize} OFFSET ${offset}`) as Trip[]

    const totalTripsResult = await sql`
        SELECT COUNT(*) FROM items_rented ir
        WHERE 
            LOWER(ir.guest_name) LIKE LOWER(${"%" + guestName + "%"})
            AND ir.organization_id = ${orgId || userId}
            ${dateCondition
        ? sql`AND DATE(ir.departure_time) = DATE(${date})`
        : sql``
      }`

    const totalTrips = Number(totalTripsResult[0].count);
    const hasMore = offset + pageSize < totalTrips;
    const totalPages = Math.ceil(totalTrips / pageSize);

  
    return { trips, hasMore, totalPages };
  } catch (error) {
    console.error("Error fetching trips: ", error);
    throw error;
  }
}