import MainContainer from "@/components/ui/containers/main-container";
import PageContainer from "@/components/ui/containers/page-container";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  return (
    <PageContainer>
      <MainContainer>
        <div className="flex md:flex-row flex-col text-center justify-center items-center gap-4">
          <Image className="md:w-2/6 rounded-sm" src="/sports.jpg" height={1200} width={1200} alt={"Sports Image"} />
          <div className="flex flex-col  gap-4 ">
            <p className="border bg-white text-lg p-4 rounded-lg shadow-lg">
              With Sports Rental Tracker, you can effortlessly track the status of your inventory and rental items,
              including trip length, customer name, unit number, unit type, and departure time for all past and current trips.
              This powerful tool helps you stay organized, reduce errors, and improve customer satisfaction.
            </p>
            <p className=" border text-lg   bg-white backdrop-blur-md p-8 rounded-lg shadow-lg">
              Getting started is easy! Personal accounts are completely free and allow you to track up to 50 items.
              This is perfect for small businesses or individuals who want to manage their rentals without any hassle.
              If you need to manage a larger inventory or want your staff to access the site, simply click the icon in the top right-hand corner to create an organization.
            </p>
          </div>
        </div>
        <div className="flex md:flex-row  flex-col text-center justify-center items-center gap-4">
          <p className=" border bg-white text-lg backdrop-blur-md p-8 rounded-lg shadow-lg">
            Our pricing plans are designed to fit your needs. A 10-person organization subscription costs just $50 per month,
            while a 75-person subscription is only $100 per month. With our affordable plans, you can focus on growing your business
            without breaking the bank.
          </p>
          <Image className="md:w-2/6 rounded-sm" src="/rental.jpg" height={1200} width={1200} alt={"Sports Image"} />
        </div>
        <footer className="border mt-auto mx-auto text-center  bg-white p-4 rounded-lg shadow-lg">
          <span>By using Sports Rental Tracker, you agree to our </span>
          <Link className="underline" href="/terms-of-service">Terms of Service</Link>
          <span> and </span>
          <Link className="underline" href="/privacy-policy">Privacy Policy</Link>
          <span>. Please review them carefully.</span>
        </footer>

      </MainContainer>
    </PageContainer>
  );
}