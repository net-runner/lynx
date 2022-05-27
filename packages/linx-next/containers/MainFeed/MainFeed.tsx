import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './MainFeed.styled';
import { useRouter } from 'next/router';
import { getgroup } from '../../api/linkgroup';

const MainFeed = ({ linkGroupData }: { linkGroupData? }) => {
  const [users, setUsers] = useState([]);
  const observedElement = useRef<HTMLLIElement | null>(null);
  const router = useRouter();

  const triggerFetch = () => {
    const query = router.query;
    query.page = (parseInt(linkGroupData.currentPage) + 1).toString();
    router.push({
      pathname: router.pathname,
      query: query,
    });
  };

  // Set users from linkGroupData
  useEffect(() => {
    console.log(linkGroupData)
    // if (linkGroupData?.groups?.length !== 0) {
    //   setUsers(linkGroupData?.groups);
    // }
  }, [linkGroupData]);

  useEffect(() => {
    const cachedRef = observedElement.current;
    if (!cachedRef) return;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const first_entry = entries[0];
        first_entry.isIntersecting && triggerFetch();
      },
      { threshold: 0.5 }
    );
    intersectionObserver.observe(cachedRef);
    return () => intersectionObserver.unobserve(cachedRef);
  });

  return (
    <>
      <ul className="user-list">
        {users.length > 0 &&
          users.map((user, i) => {
            return (
              <li
                className="user"
                key={i}
                ref={i === users.length - 1 && observedElement}
              >
                <span>{user.name}</span>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default MainFeed;
