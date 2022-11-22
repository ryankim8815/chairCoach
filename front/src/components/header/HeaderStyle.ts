import styled from "styled-components";

const HeaderStyle = styled.header`
  position: fixed;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyBorder};
  background: #fff;

  .inner{
    ${({ theme }) => theme.common.flexCenter};
    justify-content: space-between;
    max-width: 1180px;
    height: 100%;
    margin: 0 auto;

    .left{
      ${({ theme }) => theme.common.flexCenter};
    }
  }
`;

export default HeaderStyle;