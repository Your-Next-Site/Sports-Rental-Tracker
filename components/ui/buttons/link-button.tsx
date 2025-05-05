import Link from "next/link";

export default function LinkButton() {
    return (
        <Link
            href="/"
            className="bg-buttoncolormain hover:bg-buttoncolorsecend hover:text-white p-4 mt-auto md:w-1/6 text-center mx-auto">
            Go Home
        </Link>
    );
}