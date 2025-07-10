export default function SimpleSubmitButton() {
    return (
        <div className="px-4 py-2 flex items-center justify-center">
            <button
                type="submit"
                className="bg-buttoncolormain hover:bg-buttoncolorsecend text-white p-4 mt-auto text-center mx-auto shadow-lg"
            >
                Add Unit
            </button>
        </div>
    );
}