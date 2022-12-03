import styled from "styled-components";



export const InspectionLayout=styled.div`
width:100%;
height:100%;
background:#000000;
display:flex;
flex-direction:column;
`
export const MainCont=styled.div`
width:100%;
margin:0 3% 5% 3%;
display:flex;
`
export const CameraCont=styled.video`
width:45%;
height:60vh;
object-fit: fill;
margin-left:4%;
`
export const ImgCont=styled.img`
width:45%;
height:60vh;
`
export const UpperCont=styled.div`
margin-top:64px;
width:100%;
height:150px;
display:flex;
align-items:center;
`
export const Title = styled.span`
  font-size: ${({ theme }) => theme.fontSize.title};
  font-weight: 500;
`;
export const Btn= styled.button`
background:${({ theme }) => theme.colors.main};
width:231px;
height:54px;
color:#FFFFFF;
margin-left:calc(39% - 100px);
`
