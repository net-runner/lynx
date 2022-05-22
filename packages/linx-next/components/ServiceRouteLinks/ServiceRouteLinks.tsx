import Link from 'next/link';
import * as S from './ServiceRouteLinks.styled';

const ServiceRouteLinks = () => (
  <S.Container>
    <Link href={'/_offline'}>Offline</Link>
    <Link href={'/404'}>404</Link>
    <Link href={'/500'}>500</Link>
  </S.Container>
);
export default ServiceRouteLinks;
