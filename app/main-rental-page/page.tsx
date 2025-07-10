import PageContainer from "@/components/ui/containers/page-container";
import Tab from "@/components/ui/tabs/tab";
import { fetchItemTypes } from "@/lib/utils/db";

export default async function Page() {
const itemTypesPromise = fetchItemTypes();
    return (
        <PageContainer>
            <Tab itemTypesPromise={itemTypesPromise}/>
        </PageContainer>
    );
}
