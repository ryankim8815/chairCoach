import styled, {css} from "styled-components";

const flexSpaceBetween = css`
  ${({ theme }) => theme.common.flexCenter};
  justify-content: space-between;
  
`;

export const HeaderCon = styled.header`
  height: 64px;
  .inner{
    ${({ theme }) => theme.common.flexCenter};
    max-width: 1180px;
    margin: 0 auto;

    nav{
      ul{
        ${flexSpaceBetween}
        li{}
      }
    }

    .login{
      ul{
        ${flexSpaceBetween}
      }
    }
  }
`;