export default function AddActiveTripButton ({ isPending }: { isPending: boolean }) {
    return (
        <button
            disabled={isPending}
            className="bg-foreground hover:bg-background rounded-sm p-2 text-white md:w-2/6 text-center shadow-lg">
            {!isPending ?
                'Begin Guest Trip' : 'pending'
            }
        </button>
    );
}