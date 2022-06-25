export async function revalidate(route: string) {
  const res = await fetch(`${process.env.FRONTEND_URL}api/revalidate`, {
    method: 'POST',
    body: JSON.stringify({
      refresh_route: route,
    }),
  });
  return res;
}
