import { auth } from "@/auth";
import AuthButtons from "@/components/ui/buttons/auth/auth-buttons";
import PageContainer from "@/components/ui/containers/page-container";
import EmployeeList from "@/components/ui/employee-list/employee-list";

export default async function Page() {
    const session = await auth();
    return (
        <PageContainer>
            <EmployeeList />
            <AuthButtons session={session} />
        </PageContainer>
    );
}



