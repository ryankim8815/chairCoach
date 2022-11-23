import styled from "styled-components";

export const SingUpLayout = styled.div`
  ${({ theme }) => theme.common.contentMinLayout};
  ${({ theme }) => theme.common.flexCenter};
  padding: 120px 0;
  flex-direction: column;

  h2{
    font-size: ${({ theme }) => theme.fontSize.title};
  }
`;

export const FormCon = styled.div`
  margin-top: 40px;

  legend{
    text-indent: -9999px;
  }
`

export const InputWrap = styled.div`
  & + *{
    margin-top: 64px;
  }

  p{
    font-weight: 500;
    margin-bottom: 8px;
  }

  input:nth-of-type(2){
    margin-top: 40px;
  }

  /* form fieldset > button{
    margin-top: 64px;
  } */
`;