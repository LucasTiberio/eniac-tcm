import styled from 'styled-components';

export const Container = styled.div`
  overflow-x: auto;
  max-width: 1200px;
  margin: auto;

  table {
    border-collapse: collapse;
    border-spacing: 0;

    width: 100%;

    color: ${({ theme }): string => theme.fontColor};

    tr td {
      padding: 20px 30px;
      border-bottom: 1px solid ${({ theme }): string => theme.fontColor};
    }

    thead tr td {
      &:last-child {
        cursor: pointer;
      }
    }

    tbody {
      tr {
        td {
          &:last-child {
            cursor: pointer;
          }
        }
        &:hover {
          td {
            background: ${({ theme }): string => theme.mainColor};
          }
        }
      }
    }
  }
`;
