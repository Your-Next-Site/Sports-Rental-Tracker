export default function AddActiveTripButton ({ isPending }: { isPending: boolean }) {
    return (
        <button
            disabled={isPending}
            className="bg-buttoncolormain hover:bg-buttoncolorsecend p-2 text-white md:w-2/6 text-center shadow-lg">
            {!isPending ?
                'Begin Guest Trip' : 'pending'
            }
        </button>
    );
}