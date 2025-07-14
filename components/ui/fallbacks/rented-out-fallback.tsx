import MainContainer from "../containers/main-container";

export default function RentedOutFallback() {
    return (
        <MainContainer>
            <div className="flex flex-col gap-8">
                <h1 className="text-2xl">Guests with rented equipment</h1>
                <div className="flex flex-wrap justify-center gap-4 ">
                    <div className="bg-white p-4 rounded shadow-2xl md:w-1/2 lg:w-1/3 xl:w-1/4 w-full">
                        <h2 className="text-lg">Loading Trips...</h2>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
}