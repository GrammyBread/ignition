export function RedirectTo404()
{
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
      revalidate: 3600
    }
}

export function RedirectToPatreon()
{
    return {
      redirect: {
        destination: '/patreon',
        permanent: false,
      },
      revalidate: 3600
    }
}