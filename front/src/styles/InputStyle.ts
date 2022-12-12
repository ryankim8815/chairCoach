import styled, { css, InputStyle } from "styled-components";

const basicsInputText = css`
  display: block;
  height: 40px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.greyBorder};
  border-radius: 2px;
  font-size: ${({ theme }) => theme.fontSize.text};

  &::placeholder, textarea::placeholder {
    color: ${({ theme }) => theme.colors.greyText};
    opacity: 1; /* Firefox */
  }
  &:-ms-input-placeholder, textarea:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: ${({ theme }) => theme.colors.greyText};
  }
  &::-ms-input-placeholder, textarea::-ms-input-placeholder { /* Microsoft Edge */
    color: ${({ theme }) => theme.colors.greyText};
  }
`;

export const InputText = styled.input<InputStyle>`
  ${basicsInputText}
  width: ${({ length }) => length === "small" ? 'auto' : '400px'};
  margin-bottom: 4px;
`;

export const CheckInputCon = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  gap: 0 4px;
  margin-bottom: 4px;

  position: relative;

  .time{
    position: absolute;
    top: 49%;
    right: 134px;
    transform: translateY(-50%);
    font-size: 12px;
    color: ${({ theme }) => theme.colors.greyText};
  }
`

export const WarningText = styled.span<InputStyle>`
  display: block;
  margin-left: 8px;
  margin-bottom: ${({ lineHeight }) => (lineHeight === "true" ? '-39px' : '-18px')};
  font-weight: 300;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.warning};
  line-height: ${({ lineHeight }) => (lineHeight === "true" ? 1.25 : 1)};
`;