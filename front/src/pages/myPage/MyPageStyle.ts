import styled from "styled-components";

interface MyPageStyleProps {
  fontWeight?: number;
  fontSize?: number;
}
export const MyPageLayout = styled.div`
  background: ${({ theme }) => theme.colors.mainLight};
  .inner {
    ${({ theme }) => theme.common.inner};
    padding: 120px 0;
    flex-direction: column;
  }
`;
