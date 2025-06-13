export default function InputItemsForm() {
    return (
        <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-300">
            <input
                className="px-4 py-2 w-full h-full"
                placeholder="Unit Number"
                type="number"
                name="unit-number"
                required
            />
        </div>
    );
}