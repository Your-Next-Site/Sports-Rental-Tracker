import { auth } from "@/auth";
import AuthButtons from "@/components/ui/buttons/auth-buttons";
import MainContainer from "@/components/ui/containers/main-container";
import PageContainer from "@/components/ui/containers/page-container";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session?.user.employee || session?.user.admin) redirect('/main-rental-page');


  return (
    <PageContainer>
      <MainContainer>
        {session && <p className="w-full text-center">If you are logged in and see this page, you must still contact your manager to be confirmed.</p>}
        <AuthButtons session={session} />
        <div className="mt-auto mx-auto">Please check out
          <Link className="underline" href="/terms-of-service" > Terms of Service </Link>
          and our
          <Link className="underline" href='/privacy-policy'> Privacy Policy.</Link></div>
      </MainContainer>
    </PageContainer>
  );
}