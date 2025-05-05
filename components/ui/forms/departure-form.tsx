const boatOptions = [
    { value: 'single-kayak', label: 'Single Kayak' },
    { value: 'double-kayak', label: 'Double Kayak' },
    { value: 'small-raft', label: 'Small Raft' },
    { value: 'round-raft', label: 'Round Raft' },
    { value: 'medium-raft', label: 'Medium Raft' },
    { value: 'large-raft', label: 'Large Raft' }
];
export default function DepartureForm() {
    return (
        <form className="flex flex-col gap-8  ">
            <h1 className="text-2xl">Show a guests departure </h1>
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    className="border rounded-sm md:w-2/6 p-2"
                    type="text"
                    name="guest-name"
                    placeholder=" Guest Name" />
                <select className="border rounded-sm md:w-1/6">
                    {boatOptions.map(boat => (
                        <option key={boat.value} value={boat.value}>
                            {boat.label}
                        </option>
                    ))}
                </select>
                <button className="bg-buttoncolormain hover:bg-buttoncolorsecend hover:text-white p-4 md:w-1/6 text-center ">Mark Guest on The Water</button>
            </div>
        </form>
    );
}