import Link from "next/link";

export default function GoHomeButton() {
    return (
        <Link
            href="/"
            className="bg-buttoncolormain hover:bg-buttoncolorsecend hover:text-white p-4 mt-auto w-1/6 text-center mx-auto">
            Go Home
        </Link>
    );
}