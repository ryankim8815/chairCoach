import styled from "styled-components";
import simpleBg from '../../assets/img/stretching_simple_bg.jpg';
import basicBg from '../../assets/img/stretching_basic_bg.jpg';
import deepBg from '../../assets/img/stretching_deep_bg.jpg';

export const ChairCoachCon = styled.div`
  margin-top: 120px;

  h2{
    margin-bottom: 20px;
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.title};
  }
`;

export const StretchingCon = styled.div`
  margin-top: 40px;

  ul{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
`;

export const StretchingItem = styled.li`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transform: translateY(0);
  transition: all .3s;

  &:nth-child(1){
    background: url(${simpleBg}) no-repeat center;
    background-size: cover;
  }
  &:nth-child(2){
    background: url(${basicBg}) no-repeat center;
    background-size: cover;
  }
  &:nth-child(3){
    background: url(${deepBg}) no-repeat center;
    background-size: cover;
  }

  &::before{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(194,172,255,1) 0%, rgba(0,0,0,0) 80%);
    transition: all .3s;
  }

  dl{
    position: relative;
    padding: 64px 40px;
    color: #fff;
    z-index: 10;
  
    dt{
      font-weight: 500;
      font-size: ${({ theme }) => theme.fontSize.subTitle};
    }
  
    dd{
      margin-top: 40px;

      span{
        svg{
          margin-right: 8px;
        }
      }
      
      span+span{
        margin-left: 20px;
        svg{
          margin-right: 5px;
        }
      }
    }
  }

  &:hover{
    /* animation: upDown .6s infinite linear alternate; */
    transform: translateY(-6px);
  }

  @keyframes  upDown {
    0%{
      transform: translateY(0);
    }
    25%{
      transform: translateY(-2px);
    }
    100%{
      transform: translateY(0);
    }
  }
`;