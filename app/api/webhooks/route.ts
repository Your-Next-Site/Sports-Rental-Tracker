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

    } catch (error) {
        console.error('Error handling webhook:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}