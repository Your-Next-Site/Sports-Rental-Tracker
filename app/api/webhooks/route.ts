import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
// import { clerkClient } from '@clerk/nextjs/server'

function isSubscriptionItem(data: any): data is { plan: { slug: string } } {
    return 'plan' in data && 'slug' in data.plan;
}

export async function POST(req: NextRequest) {
    try {
        const evt = await verifyWebhook(req, {
            signingSecret: process.env.CLERK_WEBHOOK_SIGNING_SECRET,
        })

        console.log(`Received webhook with event type: ${evt.type}`)
        console.log('Webhook payload:', evt.data)

        if (
            (evt.type as string) === 'subscriptionItem.active'
            // (evt.type as string) === 'subscription.updated' ||
            // (evt.type as string) === 'subscriptionItem.active' ||
            // (evt.type as string) === 'subscriptionItem.ended'
        ) {
            const orgId = evt.data.id
            // const plan = evt.data.plan.slug
            if (isSubscriptionItem(evt.data)) {
                const plan = evt.data.plan.slug;
                console.log(plan);
            }





            //     console.log("Org Id:", orgId)
            //     if (orgId) {
            //         const clerk = await clerkClient();
            //         const organization = await clerk.organizations.getOrganization({ organizationId: orgId });
            //         console.log("Org: ", organization)
            //         //     // Access plan from public or private metadata
            //         const plan = organization.publicMetadata?.plan || organization.privateMetadata?.plan;
            //         console.log("Plan:", plan)
            //         console.log("Plan: ", plan)
            //         if (plan === 'basic_10_people_org') {
            //             await clerk.organizations.updateOrganization(orgId, {
            //                 maxAllowedMemberships: 10
            //             });
            //         }
            //         else if (plan === 'pro_25_people_org') {
            //             await clerk.organizations.updateOrganization(orgId, {
            //                 maxAllowedMemberships: 25
            //             })
            //         }
            //     }
        }

        return new Response('Webhook received', { status: 200 })
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error :', err.message)
        } else {
            console.error('Error :', err)
        }
        return new Response('Error', { status: 400 })
    }
}
