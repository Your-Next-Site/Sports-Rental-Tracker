
import MainContainer from "@/components/ui/containers/main-container";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen p-2 pb-20 font-[family-name:var(--font-geist-sans)]">
      <MainContainer>
        <div className="mt-auto mx-auto">Please check out
          <Link className="underline" href="/terms-of-service" > Terms of Service </Link>
          and our
          <Link className="underline" href='/privacy-policy'> Privacy Policy.</Link></div>
      </MainContainer>
    </div>
  );
}


