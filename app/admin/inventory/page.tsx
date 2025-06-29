import MainContainer from "@/components/ui/containers/main-container";
import PageContainer from "@/components/ui/containers/page-container";
import AddUnitForm from "@/components/ui/forms/add-unit-form";

const dummyData = [
    { unitNumber: '001', type: 'Kayak', rented: 'Yes', email: 'john@example.com' },
    { unitNumber: '002', type: 'Canoe', rented: 'No', email: '-' }
]

export default function Page() {
    return (
        <PageContainer>
            <MainContainer>
                <div className="flex flex-col gap-4 p-4">
                    <h1>Inventory List</h1>
                    <AddUnitForm />
                    {/* Desktop view (md and above) */}
                    <table className="hidden md:table min-w-full border-collapse border border-gray-300">
                        <TableHead />
                        <tbody>
                            {dummyData.map((item, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{item.unitNumber}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.type}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.rented}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Mobile view (below md breakpoint) */}
                    <div className="md:hidden block">
                        {dummyData.map((item, index) => (
                            <div key={index} className="border-b border-gray-300 p-4">
                                <div><span className="font-bold">Unit Number:</span> {item.unitNumber}</div>
                                <div><span className="font-bold">Type:</span> {item.type}</div>
                                <div><span className="font-bold">Rented:</span> {item.rented}</div>
                                <div><span className="font-bold">Renter Email:</span> {item.email}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </MainContainer>
        </PageContainer>
    );
}


function TableHead() {
    return (
        <thead className="w-full">
            <tr className="bg-gray-100 w-full">
                <th className="border border-gray-300 px-4 py-2">Unit Number</th>
                <th className="border border-gray-300 px-4 py-2">Type</th>
                <th className="border border-gray-300 px-4 py-2">Rented</th>
                <th className="border border-gray-300 px-4 py-2">Renter Email</th>
            </tr>
        </thead>
    );
}