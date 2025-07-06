import SimpleSubmitButton from "@/components/ui/buttons/simple-submit-button";
import MainContainer from "@/components/ui/containers/main-container";
import PageContainer from "@/components/ui/containers/page-container";
import AddUnitForm from "@/components/ui/forms/add-unit-form";
import AddUnitTypeForm from "@/components/ui/forms/add-unit-type-form";
import FormHeader from "@/components/ui/header/form-header";
import InputFormElement from "@/components/ui/inputs/input-form-element";
import MobileItemsView from "@/components/ui/table-components/mobile-items-view";
import TableBodyItems from "@/components/ui/table-components/table-body-items";
import { TableHeadItems } from "@/components/ui/table-components/table-head-items";

export default function Page() {
    return (
        <PageContainer>
            <MainContainer>
                <div className="flex flex-col gap-4 p-4">
                    <h1 className="text-2xl font-semibold" >Inventory List</h1>
                    <AddUnitTypeForm                       
                        child1={<FormHeader title="Add Unit Type" />}
                        child2={<InputFormElement placeholder="Unit Type Value" type="text" name="unit-type-value" />}
                        child3={<InputFormElement placeholder="Unit Type Label" type="text" name="unit-type-label" />}
                        child4={<SimpleSubmitButton />}
                    />
                    <AddUnitForm
                        child1={<FormHeader title='Add Unit' />}
                        child2={<InputFormElement placeholder="Unit Number" type="number" name="unit-number" />}
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


