import styled from "styled-components";

export const ChairCoachLayout = styled.div`
  ${({ theme }) => theme.common.contentMinLayout};
  background: ${({ theme }) => theme.colors.mainLight};
  
  .inner{
    ${({ theme }) => theme.common.inner};
    padding: 120px 0;
  }
`;