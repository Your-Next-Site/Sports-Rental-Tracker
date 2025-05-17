
export default function PageContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col p-2 md:p-8 gap-8 pb-10 items-center">
            {children}
        </div>
    );
}