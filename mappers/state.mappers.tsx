export enum PublishStatus {
    Published,
    Unpublished
}

export default function DeterminePublishStatus(status: string): PublishStatus {
    return status.toLowerCase() === "published" ? PublishStatus.Published : PublishStatus.Unpublished;
}