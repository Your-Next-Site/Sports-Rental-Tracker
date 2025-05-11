import { Children } from "react";

export default function MainContainer({ children }: { children: React.ReactNode; }) {
    return (
        <div className="flex bg-foreground w-full md:w-5/6 border min-h-56 mt-4 p-4 rounded-md shadow-lg">
            <div className="flex flex-col w-full bg-white border gap-4 md:gap-8 pb-8 p-4 md:p-8">
                {children}
            </div>
        </div>
    );
}