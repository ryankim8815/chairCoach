import styled from "styled-components";


export const ResultContainer=styled.div`
height: 100vh;
width: 100%;
display:flex;
justify-content:center;
align-items:center;
background: ${({theme})=>theme.colors.mainLight};
flex-direction:column;
`


export const Title=styled.span`
font-size:${({theme})=>theme.fontSize.title}px;
`
export const SubTitle=styled.span`
font-size:${({theme})=>theme.fontSize.subTitle}px;
`


export const TitleBox=styled.div`
width:800px;
height: auto;
display:flex;
align-items: center;
margin-bottom: 10px;
`


export const ResultBox=styled.div`
width:800px;
height:280px;
background-color:#FFFFFF;
display:flex;
margin-top:20px;
`


export const RecommendBox=styled.div`
width:600px;
height:270px;
display:flex;
flex-direction:column;
background-color:#FFFFFF;
margin-top:40px;
align-items:center;
justify-content:space-evenly;
`


export const BtnBox=styled.div`
display:flex;
justify-content:center;

`
export const HalfBox=styled.div`
width:400px;
height:280px;
display:flex;
flex-direction:row-reverse;
align-items:center;
`
export const TextBox=styled.div`
width:262px;
height:105px;
line-height: 1.25;
`
export const Percent=styled.span`
color:${({theme})=>theme.colors.main};
font-weight:600;
`

export const IconImg=styled.img`
width:160px;
height:160px;
`

export const BoldLetter=styled.span`
font-weight:600;
`