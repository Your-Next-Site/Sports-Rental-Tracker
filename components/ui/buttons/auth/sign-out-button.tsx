export default function SignOutButton({ onClick }: { onClick: () => void }) {
    return (
        <div className="flex justify-center w-full ">
            <button className='p-4 shadow-sm rounded-sm bg-background border hover:scale-110' onClick={onClick}>Sign Out</button>
        </div>
    );
}
