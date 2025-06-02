import { AuthButtonItemProps } from '@/types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function AuthButton({ icon, label, onClick }: AuthButtonItemProps) {
    return (
        <button
            className="flex items-center border p-2 rounded-sm shadow-lg justify-center hover:scale-110"
            onClick={onClick}
        >
            <FontAwesomeIcon icon={icon} className="mr-2" />
            {label}
        </button>
    );
}