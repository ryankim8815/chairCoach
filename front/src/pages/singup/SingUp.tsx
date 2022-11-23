import * as S from './SingUpStyle';
import * as B from '../../styles/BtnStyle';
import * as F from '../../styles/InputStyle'

const SingUp = () => {
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
                <F.InputText length='small' type="text" name="" id="" placeholder='이메일을 입력해주세요.' />
                <B.InputCheckBtn>인증번호 요청</B.InputCheckBtn>
                <F.WarningText>이메일 형식이 아닙니다.</F.WarningText>
              </F.CheckInputCon>

              <F.CheckInputCon>
                <F.InputText length='small' type="text" name="" id="" placeholder='인증번호를 입력해주세요.' />
                <B.InputCheckBtn>인증번호 확인</B.InputCheckBtn>
                <F.WarningText>인증번호가 틀렸습니다.</F.WarningText>
              </F.CheckInputCon>
            </S.InputWrap>

            <S.InputWrap>
              <p>비밀번호</p>
              <F.InputText type="text" name="" id="" placeholder='영문, 숫자, 특수문자 포함 8자 이상입력해주세요.' />
              <F.WarningText>영어,숫자,특수문자를 포함한 8글자 이상이여야 합니다.</F.WarningText>

              <F.InputText type="text" name="" id="" placeholder='비밀번호를 다시 입력해주세요.' />
              <F.WarningText>비밀번호를 다시 확인해주세요.</F.WarningText>
            </S.InputWrap>

            <S.InputWrap>
              <p>닉네임</p>
              <F.InputText type="text" name="" id="" placeholder='닉네임을 입력해주세요.' />
              <F.WarningText>한글+숫자 2~8, 영어+숫자 2~12이여야 합니다.</F.WarningText>
            </S.InputWrap>

            <B.InputBtn>가입하기</B.InputBtn>
          </fieldset>
        </form>
      </S.FormCon>

    </S.SingUpLayout>
  );
};

export default SingUp;