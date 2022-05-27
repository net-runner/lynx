import { useHotkeys } from 'react-hotkeys-hook';
import * as S from './SearchBar.styled';

const SearchBar = () => {
  //Capute pressing / or CTRL+K for focus
  useHotkeys('/, ctrl+k, command+k', () => {
    return;
  });

  return <>Sb</>;
};
export default SearchBar;
