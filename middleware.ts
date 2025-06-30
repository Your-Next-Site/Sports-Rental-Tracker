import { clerkClient, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isOrgRoute = createRouteMatcher(['/(.*)'])
const isProtectedRoute = createRouteMatcher(['/main-rental-page(.*)'])

const clerk = await clerkClient()

export default clerkMiddleware(async (auth, req) => {
  const { has, orgId, userId } = await auth()


  if (isProtectedRoute(req) && !userId) {
    const url = req.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }
  // console.log("ORG ID: ", orgId)
  if (isOrgRoute(req)) {
    if (orgId) {
      // Check which plan the org has and set appropriate limit
      if (has({ plan: 'basic_10_people_org' })) {        // Set limit for basic plan (e.g., 10 users)
        // console.log("HasPlan 10 : ", (has({ plan: 'basic_10_people_org' })))
        clerk.organizations.updateOrganization(orgId, {
          maxAllowedMemberships: 10
        })

      }
      else if (has({ plan: 'pro_25_people_org' })) {
        // console.log("HasPlan 25 : ", (has({ plan: 'pro_25_people_org' })))
        clerk.organizations.updateOrganization(orgId, {
          maxAllowedMemberships: 25
        })
      }
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/(protected)(.*)',
  ],
}