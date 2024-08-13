export default function AuthLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 dark:bg-blue-800">
            {children}
        </div>
    )
}