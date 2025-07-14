import SimpleSubmitButton from "@/components/ui/buttons/simple-submit-button";
import MainContainer from "@/components/ui/containers/main-container";
import DisplayUintTypes from "@/components/ui/display-data/display-unit-types";
import AddUnitForm from "@/components/ui/forms/add-unit-form";
import AddUnitTypeForm from "@/components/ui/forms/add-unit-type-form";
import FormHeader from "@/components/ui/forms/form-header";
import InputFormElement from "@/components/ui/inputs/input-form-element";
import MobileItemsView from "@/components/ui/table-components/mobile-items-view";
import TableBodyItems from "@/components/ui/table-components/table-body-items";
import { TableHeadItems } from "@/components/ui/table-components/table-head-items";
import { fetchItemTypes, fetchItems } from '@/lib/utils/db'
import { Suspense } from "react";

export default async function Page() {
    const itemTypesPromise = fetchItemTypes();
    const itemPromise = fetchItems();
    return (
        <MainContainer>
            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-2xl font-semibold" >Inventory List</h1>
                <AddUnitTypeForm
                    child1={<FormHeader title="Add Unit Type" />}
                    child2={<InputFormElement placeholder="Unit Type Value" type="text" name="unit-type-value" />}
                    child3={<InputFormElement placeholder="Unit Type Label" type="text" name="unit-type-label" />}
                    child4={<SimpleSubmitButton />}
                />
                {/* Dummy list of unit types */}

                <div className="flex flex-1 flex-col min-w-full border border-gray-300">
                    <div className="w-full border-b border-gray-300">
                        <FormHeader title="Unit Types" />
                    </div>
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <DisplayUintTypes itemTypesPromise={itemTypesPromise} />
                    </Suspense>
                </div>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <AddUnitForm
                        itemTypesPromise={itemTypesPromise}
                        child1={<FormHeader title='Add Unit' />}
                        child2={<InputFormElement placeholder="Unit Number" type="number" name="unit-number" />}
                        child3={<SimpleSubmitButton />}
                    />
                </Suspense>
                {/* Desktop view (md and above) */}
                <table className="hidden md:table min-w-full border-collapse border border-gray-300">
                    <TableHeadItems />
                    <Suspense fallback={<FallBackTableBody />}>
                        <TableBodyItems itemPromise={itemPromise} />
                    </Suspense>
                </table>
                {/* Mobile view (below md breakpoint) */}
                <Suspense fallback={<h1 className="md:hidden block">Loading...</h1>}>
                    <MobileItemsView itemPromise={itemPromise} />
                </Suspense>
            </div>
        </MainContainer>
    );
}

function FallBackTableBody() {
    return (
        <tbody>
            <tr>
                <td className="border border-gray-300 px-4 py-2 text-center" colSpan={4}>
                    Loading inventory...
                </td>
            </tr>
        </tbody>
    );
}

