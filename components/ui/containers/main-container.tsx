
export default function MainContainer({ children }: { children: React.ReactNode; }) {
    return (
        <div className="flex bg-foreground w-full  min-h-56 p-4 rounded-b-md shadow-lg">
            <div className="flex flex-col w-full bg-white border gap-2 md: pb-8 p-2">
                {children}
            </div>
        </div>
    );
}