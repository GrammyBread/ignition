import { ItemStatus } from "../../mappers/availability/state.mappers";

export default function RedirectBasedOffStatus(status: ItemStatus | undefined, header: string) {
    if (status == undefined || status == ItemStatus.Unpublished) {
        return {
            redirect: {
                destination: '/404',
                permanent: false
            },
        }
    }

    if (status == ItemStatus.PatreonOnly) {
        return {
            redirect: {
                destination: '/Patreon',
                permanent: false
            },
        }
    }
}