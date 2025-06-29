import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

interface WebhookPayload {
    type: string;
    [key: string]: any;
}

export async function POST(request: NextRequest) {
    try {
        const payload: WebhookPayload = await request.json();
        console.log('Received webhook:', payload);
        console.log('Webhook type:', payload.type);

        const { has, orgId, userId } = await auth()

        if (orgId) {
            // Check which plan the org has and set appropriate limit
            if (has({ plan: 'basic_10_people_org' })) {
                // Set limit for basic plan (e.g., 10 users)
                const clerk = await clerkClient()
                await clerk.organizations.updateOrganization(orgId, {
                    maxAllowedMemberships: 10
                })
            }
            else if (has({ plan: 'pro_25_people_org' })) {
                // Set limit for pro plan (e.g., 25 users)
                const clerk = await clerkClient()
                const result = await clerk.organizations.updateOrganization(orgId, {
                    maxAllowedMemberships: 25
                })
                console.log("Result: ", result)
            }
        }


    } catch (error) {
        console.error('Error handling webhook:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}