import MainContainer from "@/components/ui/containers/main-container";
import PageContainer from "@/components/ui/containers/page-container";
import AddUnitForm from "@/components/ui/forms/add-unit-form";
import AddItemHeader from "@/components/ui/header/add-item-header";
import InputItemsForm from "@/components/ui/inputs/input-items-form";
import MobileItemsView from "@/components/ui/table-components/mobile-items-view";
import TableBodyItems from "@/components/ui/table-components/table-body-items";
import { TableHeadItems } from "@/components/ui/table-components/table-head-items";

export default function Page() {
    return (
        <PageContainer>
            <MainContainer>
                <div className="flex flex-col gap-4 p-4">
                    <h1 className="text-2xl font-semibold" >Inventory List</h1>
                    <AddUnitForm
                        child1={<AddItemHeader />}
                        child2={<InputItemsForm />}
                        child3={<SimpleSubmitButton />}
                    />
                    {/* Desktop view (md and above) */}
                    <table className="hidden md:table min-w-full border-collapse border border-gray-300">
                        <TableHeadItems />
                        <TableBodyItems />
                    </table>
                    {/* Mobile view (below md breakpoint) */}
                    <MobileItemsView />
                </div>
            </MainContainer>
        </PageContainer>
    );
}


