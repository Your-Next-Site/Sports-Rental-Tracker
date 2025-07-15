// InventoryLink.js
import SiteNavButton from "@/components/ui/buttons/site-nav-button";
import { showInventoryFunction } from "@/lib/utils";

export default async function InventoryLink() {
  const showInventoryLink = await showInventoryFunction();

  if (!showInventoryLink) return null;

  return (    
      <SiteNavButton text="Go to Inventory Page" path="/admin/inventory" />    
  );
}