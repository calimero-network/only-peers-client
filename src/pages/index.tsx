import {useRouter} from "next/router";
import {useEffect} from "react";

export default function Index() {
    const router = useRouter();
    const clientPrivateKey = typeof window !== 'undefined' ? localStorage.getItem("client-key") : undefined;

    useEffect(() => {
        if (!clientPrivateKey) {
            router.push("/auth");
        } else {
            router.push("/feed");
        }
    }, [clientPrivateKey, router]);

    return (
        <>
        </>
    );

}
