
export default function MainContainer({ children }: { children: React.ReactNode; }) {
    return (
        <div className="flex bg-foreground w-full  min-h-56 p-4 rounded-b-md shadow-lg">
        {/* <div className="flex bg-foreground w-full border min-h-56 mt-4 p-4 rounded-md shadow-lg"> */}
            <div className="flex flex-col w-full bg-white border gap-2 md: pb-8 p-2">
            {/* <div className="flex flex-col w-full bg-white border gap-4 md:gap-8 pb-8 p-4 md:p-8"> */}
                {children}
            </div>
        </div>
    );
}