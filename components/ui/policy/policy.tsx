import GoHomeButton from "../buttons/go-home-button";

export default function Policy({ name }: { name: string }) {
    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="bg-foreground w-full md:w-5/6 border h-96 mt-4 p-4 rounded-md shadow-lg">
                <div className="flex flex-col w-full bg-white border h-full  p-8">
                    <h1 className="text-3xl">{name}</h1>
                    <GoHomeButton />
                </div>
            </div>
        </div>
    );
}