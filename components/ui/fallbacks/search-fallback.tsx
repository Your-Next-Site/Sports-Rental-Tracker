export default function SearchFallback() {
    return (
        <div className="flex flex-col gap-8 min-h-[416px]">
            <h1 className="text-2xl">Search Trips</h1>
            <div className="flex flex-wrap justify-center gap-4 ">
                <div

                    className="bg-white p-4 rounded shadow-2xl md:w-1/2 lg:w-1/3 xl:w-1/4 w-full"
                >
                    Loading.....
                </div>
            </div>
        </div>
    );
}