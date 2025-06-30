import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'

export async function POST(req: NextRequest) {
    try {
        const evt = await verifyWebhook(req, {
            signingSecret: process.env.CLERK_WEBHOOK_SIGNING_SECRET,
        })

        console.log(`Received webhook with event type: ${evt.type}`)
        console.log('Webhook payload:', evt.data)

        if (
            evt.type === 'organization.updated' ||
            evt.type === 'organizationMembership.created' ||
            evt.type === 'organizationMembership.deleted' ||
            evt.type === 'organizationMembership.updated') {
            // Get user ID from session data
            let orgId: string | undefined;
            if (evt.type === 'organization.updated') {
                orgId = evt.data.id;
            } else if (
                evt.type === 'organizationMembership.created' ||
                evt.type === 'organizationMembership.deleted' ||
                evt.type === 'organizationMembership.updated'
            ) {
                orgId = evt.data.organization.id;
            }


            console.log("Org Id:", orgId)
            if (orgId) {
                const clerk = await clerkClient();
                const organization = await clerk.organizations.getOrganization({ organizationId: "org_29w9IfBrPmcpi0IeBVaKtA7R94W" });
                console.log("Org: ", organization)
                //     // Access plan from public or private metadata
                // const plan = organization.publicMetadata?.plan || organization.privateMetadata?.plan;
                // console.log("Plan:", plan)
                //     console.log("Plan: ", plan)
                //     if (plan === 'basic_10_people_org') {
                //         await clerk.organizations.updateOrganization(orgId, {
                //             maxAllowedMemberships: 10
                //         });
                //     }
                //     else if (plan === 'pro_25_people_org') {
                //         await clerk.organizations.updateOrganization(orgId, {
                //             maxAllowedMemberships: 25
                //         })
                //     }
            }
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

// import { clerkClient } from '@clerk/nextjs/server';
// import { NextRequest, NextResponse } from 'next/server';

// interface WebhookPayload {
//     type: string;
//     data: {
//         id: string;
//         public_metadata?: any;
//         private_metadata?: any;
//         [key: string]: any;
//     };
// }

// export async function POST(request: NextRequest) {
//     try {
//         const payload: WebhookPayload = await request.json();
//         console.log('Received webhook:', payload);
//         console.log('Webhook type:', payload.type);

//         const orgId = payload.data.id;
//         const clerk = await clerkClient();

//         if (orgId && payload.type === 'organization.updated') {
//             // Get the organization to check its metadata for plan information
//             const organization = await clerk.organizations.getOrganization({
//                 organizationId: orgId
//             });

//             // Access plan from public or private metadata
//             const plan = organization.publicMetadata?.plan || organization.privateMetadata?.plan;

//             if (plan === 'basic_10_people_org') {
//                 await clerk.organizations.updateOrganization(orgId, {
//                     maxAllowedMemberships: 10
//                 });
//             }
//             else if (plan === 'pro_25_people_org') {
//                 await clerk.organizations.updateOrganization(orgId, {
//                     maxAllowedMemberships: 25
//                 })
//             }
//         }

//         return NextResponse.json({ message: 'Webhook processed successfully' });

//     } catch (error) {
//         console.error('Error handling webhook:', error);
//         return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//     }
// }