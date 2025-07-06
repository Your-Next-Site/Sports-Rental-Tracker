export default function FormHeader({ title }: { title: string }) {
  return (
    <div className="bg-gray-100 w-full border-b border-gray-300">
      <div className="px-4 py-2 text-center font-semibold">{title}</div>
    </div>
  );
}