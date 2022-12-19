import styled, { css, InputStyle } from "styled-components";

const basicsInputText = css`
  display: block;
  height: 40px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.greyBorder};
  border-radius: 2px;
  font-size: ${({ theme }) => theme.fontSize.text};

  &::placeholder,
  textarea::placeholder {
    color: ${({ theme }) => theme.colors.greyText};
    opacity: 1; /* Firefox */
  }
  &:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${({ theme }) => theme.colors.greyText};
  }
  &::-ms-input-placeholder,
  textarea::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${({ theme }) => theme.colors.greyText};
  }
`;

const positionTopCenter = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const Inputcontent = styled.div`
  position: relative;

  svg {
    ${positionTopCenter}
    right: 18px;
    color: #3cce9a;
  }
`;

export const CheckInputCon = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  gap: 0 4px;
  position: relative;

  .time {
    ${positionTopCenter}
    right: 134px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.greyText};
  }

  svg {
    ${positionTopCenter}
    right: 142px;
    color: #3cce9a;
  }
`;

export const InputText = styled.input<InputStyle>`
  ${basicsInputText}
  width: ${({ length }) => (length === "small" ? "auto" : "400px")};
`;

export const WarningText = styled.span<InputStyle>`
  display: block;
  margin: 4px 0
    ${({ lineHeight }) => (lineHeight === "true" ? "-39px" : "-18px")} 8px;
  font-weight: 300;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.warning};
  line-height: ${({ lineHeight }) => (lineHeight === "true" ? 1.25 : 1)};
`;
