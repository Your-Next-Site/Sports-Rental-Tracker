import { auth } from "@/auth";
import AuthButtons from "@/components/ui/buttons/auth-buttons";
import MainContainer from "@/components/ui/containers/main-container";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  console.log(session?.user.employee) 
  return (
    <div className="flex flex-col items-center h-screen p-2 pb-20 font-[family-name:var(--font-geist-sans)]">
      <MainContainer>
        <AuthButtons session={session} />
        <div className="mt-auto mx-auto">Please check out
          <Link className="underline" href="/terms-of-service" > Terms of Service </Link>
          and our
          <Link className="underline" href='/privacy-policy'> Privacy Policy.</Link></div>
      </MainContainer>
    </div>
  );
}