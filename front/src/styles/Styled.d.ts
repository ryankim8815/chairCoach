import "styled-components";
import { ColorsTypes, FontSizeTypes, CommonTypes } from "./Theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ColorsTypes;
    fontSize: FontSizeTypes;
    common: CommonTypes;
  }

  export interface BtnStyle {
    hover?: string;
    check?: string;
    size?: string;
  }

  export interface InputStyle {
    lineHeight?: string;
    length?: string;
  }
}