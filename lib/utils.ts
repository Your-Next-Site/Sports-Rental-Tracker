import { auth } from "@clerk/nextjs/server"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function showInventoryFunction() {
  const { orgId, sessionClaims } = await auth.protect()  
  if (orgId && sessionClaims.orgRole === 'org:admin') return true
  if (!orgId) return true
  return false
}