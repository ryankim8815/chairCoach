import styled from "styled-components";

export const ResultLayout = styled.div`
  ${({ theme }) => theme.common.contentMinLayout};
  background: ${({ theme }) => theme.colors.mainLight};
  flex-direction: column;
  .inner {
    ${({ theme }) => theme.common.inner};
    padding: 120px 0;
  }
`;
export const Title = styled.span`
  font-size: ${({ theme }) => theme.fontSize.title};
`;

export const SubTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize.subTitle};
  font-weight: 500;
`;
export const Text = styled.span`
  margin-top: 20px;
`;
export const MainCont= styled.div`
width:1180px;
height:560px;
margin:0 auto;
background:#FFFFFF;
margin-top:20px;
padding:40px;
display:flex;
`
export const Image=styled.img`
width:480px;
height:480px;
`
export const TextBox=styled.div`
width:580px;
height:392px;
text-align: center;
margin:40px;
line-height:1.25;
display:flex;
align-items:center;
justify-content:center;
`
export const Btn=styled.button`
width:208px;
height:48px;
background: ${({ theme }) => theme.colors.main};
margin:0 auto;
color:#FFFFFF;
`
export const RightCont=styled.div`
display:flex;
flex-direction:column;
`
