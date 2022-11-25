import * as S from '../signUp/SignUpStyle';
import * as B from '../../styles/BtnStyle';
import * as F from '../../styles/InputStyle'

const UserInfoChange = () => {
  return (
    <S.SingUpLayout>
    <h2>회원정보 변경</h2>

      <S.FormCon>
        <form action="">
          <fieldset>
            <legend>회원정보 변경</legend>

            <S.InputWrap>
              <p>닉네임</p>
              <F.InputText type="text" name="" id="" placeholder='닉네임을 입력해주세요.' />
              <F.WarningText>한글+숫자 2~8, 영어+숫자 2~12이여야 합니다.</F.WarningText>
            </S.InputWrap>

            <S.InputWrap>
              <div>
                <p>비밀번호 확인</p>
                <F.InputText type="text" name="" id="" placeholder='비밀번호를 다시 입력해주세요.' />
                <F.WarningText>비밀번호를 다시 확인해주세요.</F.WarningText>
              </div>

              <div>
                <p>새 비밀번호</p>
                <F.InputText type="text" name="" id="" placeholder='영문, 숫자, 특수문자 포함 8자 이상입력해주세요.' />
                <F.WarningText>영어,숫자,특수문자를 포함한 8글자 이상이여야 합니다.</F.WarningText>
              </div>

              <div>
                <p>새 비밀번호 확인</p>
                <F.InputText type="text" name="" id="" placeholder='비밀번호를 다시 입력해주세요.' />
                <F.WarningText>비밀번호를 다시 확인해주세요.</F.WarningText>
              </div>
            </S.InputWrap>

            <B.InputBtn>가입하기</B.InputBtn>
          </fieldset>
        </form>
      </S.FormCon>
    </S.SingUpLayout>
  );
};

export default UserInfoChange;