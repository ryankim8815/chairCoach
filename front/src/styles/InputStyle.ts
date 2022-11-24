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
  margin-bottom: ${({ length }) => length === "small" ? 0 : '8px'};
`;

export const CheckInputCon = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  gap: 4px;
`

export const WarningText = styled.span<InputStyle>`
  display: block;
  margin-left: 8px;
  margin-bottom: ${({ lineHeight }) => (lineHeight === "true" ? '-35px' : '-14px')};
  font-weight: 300;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.warning};
  line-height: ${({ lineHeight }) => (lineHeight === "true" ? 1.25 : 1)};
`;