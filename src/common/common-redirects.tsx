export function RedirectTo404()
{
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
}

export function RedirectTo500()
{
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    }
}

export function RedirectToPatreon()
{
    return {
      redirect: {
        destination: '/patreon',
        permanent: false,
      },
    }
}