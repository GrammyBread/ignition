export interface CosmicResponse<Type>
{
    data: Data<Type>;
}

export interface Data<Type>
{
    getObjects: GetObjects<Type>;
}

export interface GetObjects<Type>
{
    objects: Type[];
}

