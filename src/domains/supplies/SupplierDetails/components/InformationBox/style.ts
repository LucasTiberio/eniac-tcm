import styled from 'styled-components';

export const Container = styled.section`
  background: white;

  width: 100%;
  height: 100%;
  flex: 1;

  border-radius: 5px;
  padding: 32px;
  margin-bottom: 32px;

  -webkit-box-shadow: 6px 6px 23px -7px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 6px 6px 23px -7px rgba(0, 0, 0, 0.2);
  box-shadow: 6px 6px 23px -7px rgba(0, 0, 0, 0.2);

  &:last-child {
    margin-bottom: 0px;
  }

  @media screen and (max-width: 768px) {
    padding: 16px;
    margin-bottom: 16px;
  }
`;

export const SaveRoundedButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 44px;
  width: 44px;

  border-radius: 100%;

  background: ${({ theme }): string => theme.mainColor};
  color: ${({ theme }): string => theme.fontColor};

  cursor: pointer;
`;

export const Key = styled.div`
  color: #bbb;

  text-align: right;

  width: 80px;
  font-weight: bold;

  font-size: 14px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export const Value = styled.div`
  flex: 1;

  text-align: left;
  margin-left: 40px;
  font-size: 14px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
