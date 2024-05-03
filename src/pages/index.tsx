import {useRouter} from "next/router";
import {useEffect} from "react";
import {getStorageClientKey} from "src/lib/storage";

export default function Index() {
    const router = useRouter();
    const clientKey = getStorageClientKey();

    useEffect(() => {
        if (!clientKey) {
            router.push("/auth");
        } else {
            router.push("/feed");
        }
    }, [clientKey, router]);

    return (
        <></>
    );

}
