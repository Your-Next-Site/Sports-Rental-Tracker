export async function fetchBookings() {
    const apiKey = process.env.API_KEY_CHECKFRONT;
    const apiSecret = process.env.API_SECRET_CHECKFRONT;
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    const response = await fetch('https://thepaddlestation-2025test.checkfront.com/api/3.0/booking', {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${auth}`
        }
    });
    return await response.json();
}