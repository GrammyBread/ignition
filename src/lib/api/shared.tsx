import { useRouter } from "next/router";

export const minifyProps = (props: string) => {
    let smallProp = props.replace(/(?:\r\n|\r|\n)/g, '');
    return smallProp;
}

export function GetRequestedResource(): string {
    const router = useRouter();
    const path = router.pathname;
    const pathParts = path.split("/");
    return pathParts[pathParts.length - 1];
}