import {useRouter} from "next/router"

const BackButton = () => {
    const router = useRouter()

    return (
        <>
            <button
                className="bg-blue-200 p-5 rounded-xl w-32"
                onClick={() => router.back()}>Back</button>
        </>
    )
}

export default BackButton