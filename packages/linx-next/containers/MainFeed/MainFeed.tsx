import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './MainFeed.styled';
import { LinkGroup } from '@prisma/client';

interface serverSideLinkGroupData {
  currentPage: string;
  groups: LinkGroup[];
}

const MainFeed = ({
  linkGroupData,
}: {
  linkGroupData?: serverSideLinkGroupData;
}) => {
  const [linkGroups, setLinkGroups] = useState<LinkGroup[]>([
    ...linkGroupData.groups,
  ]);
  const [currentPage, setPage] = useState(parseInt(linkGroupData.currentPage));
  const [observedElement, setObservedElement] = useState<HTMLLIElement | null>(
    null
  );
  const intersectionObserver = useRef(null);

  const loadData = useCallback(async () => {
    const res = await (
      await fetch(
        `${process.env.FRONTEND_URL}/api/linkgroup/4/${currentPage + 1}`
      )
    ).json();
    if (res.groups.length === 0)
      intersectionObserver.current.unobserve(observedElement);
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
    <ul>
      {linkGroups?.length > 0 &&
        linkGroups.map((linkgroup, i) => {
          return i === linkGroups.length - 1 ? (
            <li
              className="vvvv active"
              key={linkgroup.id}
              ref={setObservedElement}
            >
              <span>{linkgroup.name}</span>
            </li>
          ) : (
            <li className="vvvv" key={i}>
              <span>{linkgroup.name}</span>
            </li>
          );
        })}
    </ul>
  );
};

export default MainFeed;
