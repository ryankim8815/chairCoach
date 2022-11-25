import { useState, useEffect } from 'react';

// style
import * as S from './SignUpStyle';
import * as B from '../../styles/BtnStyle';
import * as F from '../../styles/InputStyle';
import * as Api from '../../api/api'

interface LoginData {
  email: string;
  password: string;
	nickname: string;
  code: number;
  [key: string]: string | number;
}

// 이메일 : regex(정규식) 확인 (예시: abc@example.com).
const validateEmail = (email:string) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

// 비밀번호 : 숫자+영문자+특수문자 조합으로 8자리 이상 입력
const validatePwd = (password:string) => {
  return password
    .toLowerCase()
    .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/);
};

// 닉네임 : 한글+숫자 2~8, 영어+숫자 2~12이여야 합니다.
const validateNickname = (nickname:string) => {
  return nickname.match(/^([가-힣0-9]{2,8}|[A-Za-z0-9]{2,12})$/);
}


const SingUp = () => {
    const [email, setEmail] = useState("");
    const isEmailValid = validateEmail(email);

    const [codeDisabled, setCodeDisabled] = useState(true);
    const [code, setCode] = useState(0);
    const [code2, setCode2] = useState(0);
    const [checkCode, setCheckCode] = useState(true);

    const [password, setPassword] = useState("");
    const [pwDisabled, setpwDisabled] = useState(true);
    const [password2, setPassword2] = useState("");
    const isPwdValid = validatePwd(password);

    const [nickname, setNickname]= useState("");
    const [checkNickname, setCheckNickname]= useState(true);
    const isNicknameValid = validateNickname(nickname);

    useEffect(()=>{
      Api.get('users').then((res)=>{
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
    }, []);


    const handlerCodeClick = async(e: React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault();
      setCodeDisabled(false);

      const res:any = await Api.post('user/mail',{
        email: email
      });
      console.log(res)
      // console.log(res.data.code); //number
      setCode(res.data.code);
    }


    const handlerCheckCodeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if(code === code2){
        setCheckCode(true);
        setpwDisabled(false);
      }else setCheckCode(false);

      console.log(code === code2 ? 'Yes' : 'No');
    }

  return (
    <S.SingUpLayout>
      <h2>회원가입</h2>

      <S.FormCon>
        <form action="">
          <fieldset>
            <legend>회원가입</legend>

            <S.InputWrap>
              <p>이메일</p>
              <F.CheckInputCon>
                <F.InputText length='small' type="text" value={email} placeholder='이메일을 입력해주세요.' onChange={e => setEmail(e.target.value)} />
                <B.InputCheckBtn onClick={handlerCodeClick}>인증번호 요청</B.InputCheckBtn>
                {
                  email.length === 0 || isEmailValid ? null : <F.WarningText>이메일 형식이 아닙니다.</F.WarningText>
                }
              </F.CheckInputCon>

              <F.CheckInputCon>
                <F.InputText length='small' type="text" disabled={codeDisabled} placeholder='인증번호를 입력해주세요.' onChange={e => setCode2(Number(e.target.value))} />
                <B.InputCheckBtn onClick={handlerCheckCodeClick}>인증번호 확인</B.InputCheckBtn>
                {
                  checkCode ? null : <F.WarningText>인증번호가 틀렸습니다.</F.WarningText>
                }
              </F.CheckInputCon>
            </S.InputWrap>

            <S.InputWrap>
              <div>
                <p>비밀번호</p>
                <F.InputText type="password" value={password} disabled={pwDisabled} placeholder='영문, 숫자, 특수문자 포함 8자 이상입력해주세요.' onChange={e => setPassword(e.target.value)} />
                {
                  password.length === 0 || isPwdValid ? null : <F.WarningText>영어,숫자,특수문자를 포함한 8글자 이상이여야 합니다.</F.WarningText>
                }
              </div>

              <div>
                <p>비밀번호 확인</p>
                <F.InputText type="password" disabled={!isPwdValid} placeholder='비밀번호를 다시 입력해주세요.' onChange={e => setPassword2(e.target.value)} />
                {
                  password2.length === 0 || password === password2 ? null : <F.WarningText>비밀번호를 다시 확인해주세요.</F.WarningText>
                }
              </div>
            </S.InputWrap>

            <S.InputWrap>
              <p>닉네임</p>
              <F.InputText type="text" value={nickname} disabled={false} placeholder='닉네임을 입력해주세요.' onChange={e => setNickname(e.target.value)} />
              {
                nickname.length === 0 || isNicknameValid ? null : 
                <F.WarningText lineHeight='true'>
                  영어+숫자로 2~12자 구성 <br />
                  한글, 한글+숫자로 2~8자 구성 (초성 및 모음은 허가하지 않음)
                </F.WarningText>
              }

              {/* <F.WarningText>중복된 닉네임 입니다.</F.WarningText> */}
            </S.InputWrap>

            <B.InputBtn disabled={true}>가입하기</B.InputBtn>
          </fieldset>
        </form>
      </S.FormCon>
    </S.SingUpLayout>
  );
};

export default SingUp;