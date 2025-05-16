export async function fetchBookings() {
    const response = await fetch('https://thepaddlestation-2025test.checkfront.com/api/3.0/booking', {
        method: 'GET',
        headers: {
            'API-Key': `${process.env.API_KEY_CHECKFRONT}`,
            'API-Secret': `${process.env.API_SECRET_CHECKFRONT}`
        }
    });
    return await response.json();
}