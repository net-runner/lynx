import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  width: 80rem;
  min-height: 22rem;
  margin: 1rem 0 3rem;
  border-radius: 2rem;
  background: ${({ theme }) => theme.backgroundSecondary};
  border: 0.3rem solid ${({ theme }) => theme.backgroundSecondary};

  & > * {
    z-index: 3;
  }
  & p {
    opacity: 0.6;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  min-height: 10rem;
  padding: 3rem 2rem;
  border-radius: 2rem 2rem 0 0;
  background: ${({ theme }) => theme.backgroundSecondary};

  & > * {
    display: inline-block;
    font-family: 'Segoe UI', serif;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & > a:nth-child(1) {
    font-weight: 200;
    font-size: 3rem;
    max-width: 15rem;
  }
  & > input {
    font-weight: bold;
    font-size: 3rem;
    max-width: 320rem;
  }
`;

export const BodyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 2rem 2rem;
  border-radius: 0 0 2rem 2rem;
  background: ${({ theme }) => theme.background};
`;

export const Input = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: start;
  width: auto;
  align-self: flex-start;
  background: transparent;
  color: #f9f9f9;
  font-weight: 500;
  font-size: 1.6rem;
  font-family: 'Poppins', sans-serif;
  white-space: nowrap;
`;

export const TitleDivider = styled.div`
  font-family: 'Segoe UI', serif;
  margin-top: 0.3rem;
  text-align: center;
  font-weight: normal;
  font-size: 2.5rem;
`;

export const Description = styled.textarea`
  height: auto;
  width: 100%;
  line-height: 160%;
  margin: 2rem 1rem;
  padding: 0.5rem 1rem;
  background: transparent;
  resize: none;
  color: #f9f9f9;
  font-size: 1.8rem;
  font-weight: normal;
  border: 0.1rem solid ${({ theme }) => theme.backgroundTertiary};
  border-radius: 0.4rem;
`;

export const UrlRow = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  align-content: center;
  text-align: center;
  flex-direction: row;
  margin-bottom: 1.75rem;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > button {
    margin-right: 1.4rem;
  }
`;

export const IconWrapper = styled.div<{ isvisible?: boolean }>`
  display: ${({ isvisible }) => (isvisible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: auto;
  transform: translateY(0.5rem);

  & > p {
    margin-right: 1rem;
  }

  & > svg {
    width: 4rem;
    height: 4rem;
    transition: tranform 0.3s ease-in-out;
  }

  &:hover > svg {
    transform: scale(1.1);
  }
  &:hover > p {
    color: ${({ theme }) => theme.white};
  }
`;
