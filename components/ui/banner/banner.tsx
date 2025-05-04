import Image from "next/image";

export default function Banner() {
    return (
        <div className="relative">
            <Image
                className="absolute top-4 left-0 md:left-4 sm:top-6 sm:left-10 w-1/4 sm:w-1/6  hidden md:block"
                src="/paddle-logo.avif"
                width={800}
                height={800}
                alt="Branding for the Paddle Station"
            />

            <div className="absolute top-1/2 left-1/2 shadow-2xl transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-filter backdrop-blur-lg rounded-md p-2 ">
                <h1 className="text-2xl sm:text-4xl text-bannertext font-bold text-center">
                    Raft Tracker 5000
                </h1>
            </div>

            <Image
                className="w-full h-30 md:h-auto object-cover"
                src="/banner.avif"
                width={800}
                height={800}
                alt="Water Image"
            />
        </div>
    );
}