import styled from 'styled-components';

export const FloatingModal = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.3);

  min-height: 100vh;
  width: 100vw;
`;

export const WhiteBox = styled.div`
  background: ${({ theme }): string => theme.bodyBackground};

  width: 80%;
  padding: 20px;

  border-radius: 4px;

  -webkit-box-shadow: 6px 6px 23px -7px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 6px 6px 23px -7px rgba(0, 0, 0, 0.2);
  box-shadow: 6px 6px 23px -7px rgba(0, 0, 0, 0.2);
`;
