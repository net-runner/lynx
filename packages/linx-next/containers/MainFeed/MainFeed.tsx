import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './MainFeed.styled';
import { GroupTag, LinkGroup, Tag } from '@prisma/client';
import LynxInfoPanel from '../../components/LynxInfoPanel';
import { default as LinkGroupContainer } from '../../components/LinkGroupDisplay';
import { getGroups } from '../../api/linkgroup';
import { useUser } from '../../context/user.context';

interface serverSideLinkGroupData {
  currentPage: string | null;
  groups: (LinkGroup & {
    tags: GroupTag[];
    _count: {
      links: number;
    };
  })[];
}

interface Props {
  linkGroupData: serverSideLinkGroupData;
  tags: (Tag & { _count: { Groups: number } })[];
  mainFeedLocation?: 'explore' | 'user_profile';
  user?: string;
}

const MainFeed = ({ linkGroupData, tags, mainFeedLocation, user }: Props) => {
  const initialGroups = linkGroupData?.groups ? [...linkGroupData.groups] : [];
  const { user: currentUserInstance } = useUser();
  const currentUserName = currentUserInstance?.username;
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
    if (!observedElement) return;
    intersectionObserver.current.unobserve(observedElement);
    setAllListsFetched(true);
  }, [observedElement]);

  const loadData = useCallback(async () => {
    if (currentPage === null) return;
    const requestedGroupsCount = 4;
    const handleResponse = (response) => {
      if (!response?.groups) return;
      const updatedList = [...linkGroups, ...response.groups];
      setLinkGroups(updatedList);
      if (response.groups.length < requestedGroupsCount) endFetching();
    };
    switch (mainFeedLocation) {
      case 'user_profile': {
        const includePrivateLinkGroup = currentUserName === user;
        if (currentUserName !== undefined && !includePrivateLinkGroup)
          endFetching();
        if (!includePrivateLinkGroup) return;
        const res = await getGroups(
          requestedGroupsCount,
          currentPage + 1,
          0,
          6,
          currentUserName
        );
        handleResponse(res);
        break;
      }
      case 'explore': {
        const requestedGroupsCount = 4;
        const res = await getGroups(requestedGroupsCount, currentPage + 1, 7);
        handleResponse(res);
        break;
      }
    }
  }, [
    mainFeedLocation,
    currentUserName,
    user,
    currentPage,
    endFetching,
    linkGroups,
  ]);
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
    triggerFetch.current();
  }, [currentUserName]);

  useEffect(() => {
    linkGroupData?.groups && setLinkGroups([...linkGroupData.groups]);
  }, [linkGroupData]);

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
              tags={tags}
            />
          ) : (
            <LinkGroupContainer
              data={linkgroup}
              key={linkgroup.id}
              tags={tags}
            />
          );
        })}
      {showDeadEnd()}
    </S.Wrapper>
  );
};

export default MainFeed;
