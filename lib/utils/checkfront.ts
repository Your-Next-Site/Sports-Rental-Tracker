interface Booking {
  start_date: string;
  time: string;
}

interface BookingData {
  "booking/index": {
    [key: string]: {
      booking_id: number;
      code: string;
    };
  };
}

interface InvoiceData {
  booking: {
    invoice: {
      html: string;
    };
  };
}

export async function fetchBookings(): Promise<{ code: string; time: string }[]> {
  const apiKey = process.env.API_KEY_CHECKFRONT;
  const apiSecret = process.env.API_SECRET_CHECKFRONT;
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

  const startDate = '2025-05-16T00:00:00';
  const endDate = '2025-05-16T23:59:59';

  const response = await fetch(
    `https://thepaddlestation-2025test.checkfront.com/api/3.0/booking?start_date=${startDate}&end_date=${endDate}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
      },
    }
  );

  const data: BookingData = await response.json();

  if (!data["booking/index"]) {
    console.log("No bookings found for the specified date.");
    return [];
  }

  const bookings = Object.values(data["booking/index"]);

  const bookingTimes = await Promise.all(
    bookings.map(async (booking) => {
      const invoiceResponse = await fetch(
        `https://thepaddlestation-2025test.checkfront.com/api/3.0/booking/${booking.booking_id}/invoice`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${auth}`,
          },
        }
      );

      const invoiceData: InvoiceData = await invoiceResponse.json();
      const html = invoiceData.booking.invoice.html;
      // Refined regex to handle potential line breaks
      const timeRegex = /<i class='fa fa-clock-o'><\/i>\s*(.*?)\s*<\/td>/;
      const match = html.match(timeRegex);
      const time = match && match[1] ? match[1].trim() : 'Time not found';
      console.log(invoiceData);
      return { code: booking.code, time };
    })
  );
  console.log("booking times: ", bookingTimes);
  return bookingTimes;
}