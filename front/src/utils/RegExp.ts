// 이메일 : regex(정규식) 확인 (예시: abc@example.com).
export const validateEmail = (email: string) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

// 비밀번호 : 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
export const validatePwd = (password: string) => {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(password);
};

// 닉네임 : 한글+숫자 2~8, 영어+숫자 2~12이여야 합니다.
export const validateNickname = (nickname: string) => {
  return /^([가-힣0-9]{2,8}|[A-Za-z0-9]{2,12})$/.test(nickname);
};