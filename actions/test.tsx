'use server'
import { clerkClient } from "@clerk/nextjs/server"

export async function getOrg(organizationId: string) {
  
  const clerk = await clerkClient();
  const response = await clerk.organizations.getOrganization({ organizationId });
  console.log("Response : ", response)
}

