interface ButtonProps {
    text: string
}

export default function Button ({ text }: ButtonProps) {
    return (
        <div>
            <button className="btn-primary">{text}</button>
        </div>
    );
}