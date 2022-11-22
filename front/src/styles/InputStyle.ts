import styled, { InputStyle } from "styled-components";

export const InputText = styled.input` 
  display: block;
  width: 400px;
  height: 40px;
  margin-bottom: 8px;
  padding: 0 20px;
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

export const WarningText = styled.span<InputStyle>`
  display: block;
  margin-left: 8px;
  margin-bottom: ${({ lineHeight }) => (lineHeight === "true" ? '-35px' : '-15px')};
  font-weight: 300;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.warning};
  line-height: ${({ lineHeight }) => (lineHeight === "true" ? 1.25 : 1)};
`;