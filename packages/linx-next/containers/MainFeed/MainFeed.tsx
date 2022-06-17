import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './MainFeed.styled';
import { LinkGroup } from '@prisma/client';
import LynxInfoPanel from '../../components/LynxInfoPanel';
import { default as LinkGroupContainer } from '../../components/LinkGroupDisplay';
import { getGroups } from '../../api/linkgroup';

interface serverSideLinkGroupData {
  currentPage: string;
  groups: (LinkGroup & {
    _count: {
      links: number;
    };
  })[];
}

const MainFeed = ({
  linkGroupData,
}: {
  linkGroupData?: serverSideLinkGroupData;
}) => {
  const initialGroups = linkGroupData?.groups ? [...linkGroupData.groups] : [];
  const [linkGroups, setLinkGroups] = useState(initialGroups);
  const [areAllListsFetched, setAllListsFetched] = useState(false);
  const [currentPage, setPage] = useState(parseInt(linkGroupData.currentPage));
  const [observedElement, setObservedElement] = useState<HTMLDivElement | null>(
    null
  );
  const intersectionObserver = useRef(null);
  const showDeadEnd = () => {
    if (!areAllListsFetched) return null;
    return (
      <LynxInfoPanel
        text={
          "Seems like You've gone so far that sadly we have nothing else to show You"
        }
      />
    );
  };
  const endFetching = useCallback(() => {
    intersectionObserver.current.unobserve(observedElement);
    setAllListsFetched(true);
  }, [observedElement]);

  const loadData = useCallback(async () => {
    const res = await getGroups(4, currentPage + 1, 7);
    if (!res?.groups) return;
    if (res.groups.length === 0) return endFetching();
    const updatedList = [...linkGroups, ...res.groups];
    setLinkGroups(updatedList);
  }, [linkGroups, setLinkGroups, currentPage, endFetching]);
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
