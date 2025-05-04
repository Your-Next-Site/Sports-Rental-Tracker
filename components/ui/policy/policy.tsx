import LinkButton from '@/components/ui/buttons/link-button'
import MainContainer from '../containers/main-container'
export default function Policy({ name, text }: { name: string, text: string }) {
    return (
        <div className="flex flex-col gap-4 items-center">
            <MainContainer>
                <h1 className="text-3xl">{name}</h1>
                <p className="indent-4 md:indent-8">{text}</p>
                <LinkButton />
            </MainContainer>
        </div>
    );
}