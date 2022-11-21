import styled from "styled-components";

export const SurveyContainer=styled.div`
height: 100vh;
width: 100%;
display:flex;
justify-content:center;
align-items:center;
background: ${({theme})=>theme.colors.mainLight};
flex-direction:column;
`

export const ContentBox=styled.div`
width:800px;
height:588px;
background-color:white;
display:flex;
flex-direction:column;
align-items:center;

`


export const TitleBox=styled.div`
width:800px;
height: auto;
display:flex;
justify-content: space-between;
align-items: center;
margin-bottom: 10px;
`


export const Title=styled.span`
font-size:${({theme})=>theme.fontSize.title}px;
font-weight:500;
`
export const SubTitle=styled.span`
font-size:${({theme})=>theme.fontSize.subTitle}px;
font-weight:500;
`



export const Page=styled.span`
font-size:${({theme})=>theme.fontSize.text}px;
font-weight:600;
`



export const TextBox=styled.div`
display:flex;
flex-direction:column;
width: 459px;
height: auto;
margin-top: 40px;
`


export const Img=styled.img`
width: 320px;
height: 240px;
margin-top:40px;
border:none;
`

export const Btn=styled.button`
width:440px;
height:48px;
background:${({theme})=>theme.colors.greyBtnBg};
margin-top:48px;
&:hover{
    background:${({theme})=>theme.colors.main};
}
`
