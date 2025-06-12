import SimpleSubmitButton from "@/components/ui/buttons/simple-submit-button";
import MainContainer from "@/components/ui/containers/main-container";
import PageContainer from "@/components/ui/containers/page-container";

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

function AddUnitForm() {
    return (
        <form className="flex flex-col min-w-full border border-gray-300">
            <div className="bg-gray-100 w-full border-b border-gray-300">
                <div className="px-4 py-2 text-center font-semibold">Add Unit</div>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-300">
                    <input
                        className="px-4 py-2 w-full h-full"
                        placeholder="Unit Number"
                        type="text"
                        name="unit-number"
                        required
                    />
                </div>
                <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-300">
                    <select
                        className="px-4 py-2 w-full h-full"
                        name="unit-type"
                        required
                    >
                        <option value="">Select Unit Type</option>
                        {['Kayak', 'Canoe', 'Paddleboard', 'Surfboard', 'Jet Ski'].map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="px-4 py-2 flex items-center justify-center">
                    <SimpleSubmitButton />
                </div>
            </div>
        </form>
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