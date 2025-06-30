import { OrganizationSwitcher, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Banner() {
    return (
        <div className="shadow-2xl bg-white/20 backdrop-filter backdrop-blur-lg rounded-md p-3 md:p-8">
            <header className="flex justify-between items-center p-4 gap-4 h-16">
                <div className="md:flex-1 "></div>
                <h1 className="bg-blue-200 w-full text-2xl sm:text-4xl text-bannertext font-bold text-center flex-2 md:flex-[1]">
                    Sports Rental Tracker
                </h1>
                <div className="flex gap-4 justify-end flex-1">
                    <SignedOut>
                        <SignInButton />
                        <SignUpButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                        <OrganizationSwitcher />
                    </SignedIn>
                </div>
            </header>
        </div>
    );
}