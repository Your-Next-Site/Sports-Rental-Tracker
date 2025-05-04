import LinkButton from '@/components/ui/buttons/link-button'
export default function Policy({ name, text }: { name: string, text: string }) {
    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="flex bg-foreground w-full md:w-5/6 border min-h-96 mt-4 p-4 rounded-md shadow-lg">
                <div className="flex flex-col w-full bg-white border gap-4 md:gap-8 p-8">
                    <h1 className="text-3xl">{name}</h1>
                    <p className="indent-4 md:indent-8">{text}</p>
                    <LinkButton />
                </div>
            </div>
        </div>
    );
}