export default function InputFormElement({ placeholder, type, name }: { placeholder: string, type: string, name: string }) {
    return (
        <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-300">
            <input
                className="px-4 py-2 w-full h-full"
                placeholder={placeholder}
                type={type}
                name={name}
                required
            />
        </div>
    );
}