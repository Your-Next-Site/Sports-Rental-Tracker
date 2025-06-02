import { auth } from "@/auth";
import AuthButtons from "@/components/ui/buttons/auth/auth-buttons";
import PageContainer from "@/components/ui/containers/page-container";
import Tab from "@/components/ui/tabs/tab";

export default async function Page() {

    const session = await auth();

    return (
        <PageContainer>
            <Tab />
            <AuthButtons session={session} />
        </PageContainer>
    );
}
