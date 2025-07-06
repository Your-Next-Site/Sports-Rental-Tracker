export default function AddUnitTypeForm({
    child1,
    child2,
    child3,
}: {
    child1: React.ReactNode;
    child2: React.ReactNode;
    child3: React.ReactNode;
}) {
    return (
        <form
            // action={'use() => { }}
            className="flex flex-1 flex-col md:flex-row min-w-full border border-gray-300">
            <div className="w-full flex-1 border-b md:border-b-0 md:border-r border-gray-300">
                {child1}
                {child2}
            </div>
            <div className="md:ml-auto">
                {child3}
            </div>
        </form>

    );
}