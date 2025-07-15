import SiteNavButton from "@/components/ui/buttons/site-nav-button";
import { auth } from "@clerk/nextjs/server";

export async function showInventoryFunction() {
  const { userId, orgId, sessionClaims } = await auth()
  if (orgId && sessionClaims.orgRole === 'org:admin') return true
  if (!orgId && userId) return true
  return false
}

export default async function InventoryLink() {
  const showInventoryLink = await showInventoryFunction();

  if (!showInventoryLink) return null;

  return (
    <SiteNavButton text="Go to Inventory Page" path="/admin/inventory" />
  );
}