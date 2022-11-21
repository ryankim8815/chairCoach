import styled from "styled-components";

export const WholePage=styled.div`
height: 1815px;
width: 100%;
background: ${({theme})=>theme.colors.mainLight};
display:flex;
flex-direction:column;
align-items:center;
`

export const TitleBox=styled.div`
margin-top:184px;
`


export const Title=styled.span`
font-size:${({theme})=>theme.fontSize.title}px;
`

export const Bold=styled.span`
font-weight:600;
`