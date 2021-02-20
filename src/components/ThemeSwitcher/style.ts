import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 74px;
  height: 36px;

  background: #eeeeee;

  border-radius: 128px;

  cursor: pointer;
`;

interface SwitcherBallI {
  active: boolean;
}
export const SwitcherBall = styled.div<SwitcherBallI>`
  position: absolute;

  left: ${({ active }): string => (active ? 'auto' : '3px')};
  right: ${({ active }): string => (active ? '3px' : 'auto')};

  top: 50%;
  transform: translateY(-50%);

  height: 28px;
  width: 28px;

  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.24);

  border-radius: 100%;

  transition: all 0.1s linear;
`;

const defaultTextCss = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  font-size: 8px;
  font-weight: bold;
  text-align: center;

  pointer-events: none;
  transition: all 0.1s linear;
`;

export const LightText = styled.p`
  ${defaultTextCss};
  left: calc(100% - 12px - 28px);
`;

export const DarkText = styled.p`
  ${defaultTextCss};
  left: 12px;
`;
