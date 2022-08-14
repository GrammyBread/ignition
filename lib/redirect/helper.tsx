import { ItemStatus } from "../../mappers/availability/state.mappers";

export default function RedirectBasedOffStatus(status: ItemStatus | undefined, header: string) {
    if(status == undefined) {
        return {
          redirect: {
            destination: '/404',
            permanent: false
          },
        }
      }
}