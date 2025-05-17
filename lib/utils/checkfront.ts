import { Booking, BookingWithTime, InvoiceData } from "@/types/types";

export async function fetchBookings(): Promise<BookingWithTime[]> {
  const apiKey = process.env.API_KEY_CHECKFRONT;
  const apiSecret = process.env.API_SECRET_CHECKFRONT;
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

  const startDate = '2025-05-16T12:30:00';

  const response = await fetch(
    `https://thepaddlestation-2025test.checkfront.com/api/3.0/booking?start_date=${startDate}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
      },
      next: { revalidate: 1800 }
    },
  );

  const data: any = await response.json();

  if (!data["booking/index"]) {
    console.log("No bookings found for the specified date.");
    return [];
  }

  const bookings = Object.values(data["booking/index"]) as Booking[];

  const bookingTimes = await Promise.all(
    bookings.map(async (booking: Booking) => {
      const invoiceResponse = await fetch(
        `https://thepaddlestation-2025test.checkfront.com/api/3.0/booking/${booking.booking_id}/invoice`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${auth}`,
          },
          next: { revalidate: 1800 }
        }
      );

      const invoiceData: InvoiceData = await invoiceResponse.json();
      const html = invoiceData.booking.invoice.html;
      const timeRegex = /<i class='fa fa-clock-o'><\/i>\s*(.*?)\s*<\/td>/;
      const match = html.match(timeRegex);
      const time = match && match[1] ? match[1].trim() : 'Time not found';
      return { booking, time };
    })
  );

  const targetTime = startDate.split('T')[1].substring(0, 5);
  const start = convertTimeToMinutes(targetTime) - 30;
  const end = convertTimeToMinutes(targetTime) + 30;


  const filteredBookings: BookingWithTime[] = bookingTimes
    .filter((booking) => {
      const bookingTime = convertTimeToMinutes(booking.time);
      return bookingTime >= start && bookingTime <= end;
    })
    .map((booking) => ({
      ...booking.booking, // booking is of type Booking
      time: booking.time,
    }));
  //   console.log("booking times:", bookingTimes.map((booking) => ({ code: booking.booking.code, time: booking.time })))
  // console.log("bookings within time range: ", filteredBookings)
  return filteredBookings;
}


function convertTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map((val) => parseInt(val.replace(' AM', '').replace(' PM', '')));
  let totalMinutes = hours * 60 + minutes;
  if (time.includes(' PM') && hours !== 12) {
    totalMinutes += 12 * 60;
  } else if (time.includes(' AM') && hours === 12) {
    totalMinutes -= 12 * 60;
  }
  return totalMinutes;
}