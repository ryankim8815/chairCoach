import styled from "styled-components";

export const OutTimer=styled.div`
width:80px;
height:80px;
border-radius:50px;
margin-left: 3%;
background:${({ theme }) => theme.colors.main};
${({ theme }) => theme.common.flexCenter};

`
export const InnerTimer=styled.div`
width:64px;
height:64px;
background:#FFFFFF;
border-radius:50px;
${({ theme }) => theme.common.flexCenter};
`
export const Title = styled.span`
  font-size: ${({ theme }) => theme.fontSize.title};
  font-weight: 500;
`;