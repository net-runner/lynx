import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './MainFeed.styled';
import { LinkGroup } from '@prisma/client';
import AllListsFetchedPanel from '../../components/AllListsFetchedPanel';
import { default as LinkGroupContainer } from '../../components/LinkGroupDisplay';

interface LinkGroupWithUserName extends LinkGroup {
  userId: {
    name: string;
  };
}
interface serverSideLinkGroupData {
  currentPage: string;
  groups: LinkGroupWithUserName[];
}

const MainFeed = ({
  linkGroupData,
}: {
  linkGroupData?: serverSideLinkGroupData;
}) => {
  const initialGroups = linkGroupData?.groups ? [...linkGroupData.groups] : [];
  const [linkGroups, setLinkGroups] =
    useState<LinkGroupWithUserName[]>(initialGroups);
  const [areAllListsFetched, setAllListsFetched] = useState(false);
  const [currentPage, setPage] = useState(parseInt(linkGroupData.currentPage));
  const [observedElement, setObservedElement] = useState<HTMLDivElement | null>(
    null
  );
  const intersectionObserver = useRef(null);
  const showDeadEnd = () => {
    if (!areAllListsFetched) return null;
    return <AllListsFetchedPanel />;
  };
  const endFetching = () => {
    intersectionObserver.current.unobserve(observedElement);
    setAllListsFetched(true);
  };

  const loadData = useCallback(async () => {
    const res = await (
      await fetch(
        `${process.env.FRONTEND_URL}/api/linkgroup/4/${currentPage + 1}/7`
      )
    ).json();
    if (!res?.groups) return;
    if (res.groups.length === 0) return endFetching();
    const updatedList = [...linkGroups, ...res.groups];
    setLinkGroups(updatedList);
  }, [linkGroups, setLinkGroups, currentPage, observedElement]);
  const triggerFetch = useRef(loadData);

  useEffect(() => {
    intersectionObserver.current = new IntersectionObserver(
      (entries) => {
        const first_entry = entries[0];
        if (first_entry.isIntersecting) {
          setPage((page) => page + 1);
          triggerFetch.current();
        }
      },
      { threshold: 0.5 }
    );
  }, []);

  useEffect(() => {
    triggerFetch.current = loadData;
  }, [loadData]);

  useEffect(() => {
    const currentObserver = intersectionObserver.current;

    if (!observedElement || !currentObserver) return;

    currentObserver.observe(observedElement);
    return () => currentObserver.unobserve(observedElement);
  }, [observedElement]);

  return (
    <S.Wrapper>
      {linkGroups?.length > 0 &&
        linkGroups.map((linkgroup, i) => {
          return i === linkGroups.length - 1 ? (
            <LinkGroupContainer
              data={linkgroup}
              key={linkgroup.id}
              forwardedRef={setObservedElement}
            />
          ) : (
            <LinkGroupContainer data={linkgroup} key={linkgroup.id} />
          );
        })}
      {showDeadEnd()}
    </S.Wrapper>
  );
};

export default MainFeed;
