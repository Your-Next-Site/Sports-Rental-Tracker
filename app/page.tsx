import { auth } from "@/auth";
import AuthButtons from "@/components/ui/buttons/auth-buttons";
import MainContainer from "@/components/ui/containers/main-container";
import PageContainer from "@/components/ui/containers/page-container";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  console.log(session?.user)
  return (
    <PageContainer>
      <MainContainer>
        <AuthButtons session={session} />
        {session && <p>If you are logged in and see this page, you must still contact your manager to be confirmed.</p>}
        <div className="mt-auto mx-auto">Please check out
          <Link className="underline" href="/terms-of-service" > Terms of Service </Link>
          and our
          <Link className="underline" href='/privacy-policy'> Privacy Policy.</Link></div>
      </MainContainer>
    </PageContainer>
  );
}