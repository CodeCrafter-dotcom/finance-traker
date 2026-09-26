
interface MainProps {
    children: React.ReactNode
}

export default function Main({ children }: MainProps) {

    return(
        <main className="mt-10 px-5">
            {children}
        </main>
    )
}