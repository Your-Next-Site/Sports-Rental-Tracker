import Link from "next/link";

export default function LinkButton() {
    return (
        <Link
            href="/"
            className="p-4 rounded-sm  bg-foreground hover:bg-background text-white mt-auto md:w-1/6 text-center mx-auto shadow-lg">
            Go Home
        </Link>
    );
}