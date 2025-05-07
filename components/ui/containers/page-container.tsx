export default function PageContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col p-2 gap-4 pb-20 items-center">
            {children}
        </div>
    );
}