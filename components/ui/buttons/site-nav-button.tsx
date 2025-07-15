import Link from "next/link";

export default function SiteNavButton({ text, path }: { text: string, path: string }) {
    return (
        <Link href={path} className=" p-4 rounded-sm shadow-lg bg-foreground hover:bg-background text-white">{text}</Link>
    );
}