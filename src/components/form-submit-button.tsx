import { useFormStatus } from "react-dom";

interface FormSubmitProps {
    label?: string;
}

export const FormSubmitButton = ({
    label,
}: FormSubmitProps) => {
    const { pending } = useFormStatus();

    const handleClick = (event: any) => {
        if (pending) {
            event.preventDefault();
        }
    }

    return (
        <button aria-disabled={pending} type="submit" onClick={handleClick}>
            {label}
        </button>
    )
}