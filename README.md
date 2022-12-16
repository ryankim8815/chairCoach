# CHAIR COACH

# **1. 프로젝트 소개**

### 서비스 설명

> 현대인들의 신체 건강은 점점 악화되고 있습니다. 
장시간 근무, 야근 등 오랜 시간 동안 같은 자세로 근무하는 현대인들이 많아짐에 따라, 허리 디스크, 목 디스크와 같은 질병 환자 수는 2016년 193만명에서 2019년 206만명으로 3년만에 7%정도 증가한 추이를 보이고 있습니다.
> 
> 
> 저희 **CHAIR COACH**는 현대인들의 신체 건강 악화를 막기 위해, 앉은 자세에서도 쉽게 할 수 있는 AI 스트레칭 자세를 제공합니다.
> 인공지능의 분석과 함께, 사용자에게 보다 정확한 스트레칭 자세를 제공하며, 알림 기능을 통해 지속적으로 관리를 해주어 사용자들의 신체 건강 향상을 돕는 역할을 수행하고자 합니다.
> 

### 팀 구성원과 역할

| 이름 | 역할 |
| --- | --- |
| 박근혁 | 💜FE  🙋‍♂️Team Leader |
| 유민지 | 💚FE |
| 지수빈 | 💙FE |
| 김병용 | ❤️BE |
| 김민아 | 🖤AI |

### 기술 스택

| Front-end | Back-end | AI |
| --- | --- | --- |
| Typescript | Typescript | python |
| React | Express.js | Flask |
| Styled-component | Node.js | Gunicorn |
| Recoil | mySQL |  |

### 데이터 셋 및 AI 기술 스택

- 데이터 셋 및 전처리
    - Custom dataset, keypoints labeling
    
- 라이브러리 및 알고리즘
    - Tensorflow, XGBoost, Sklearn, LSTM : pose classification
        
        (테스트 후 가장 성능이 좋은 것으로 사용할 예정)
        
    - Yolov7 : pose estimation
- 유사 인공지능 기반 서비스의 활용 사례 및 참고 논문
    - github: [yolov7](https://github.com/WongKinYiu/yolov7)
    - 논문 : [Yoga-82: A New Dataset for Fine-grained Classification of Human Poses](https://arxiv.org/pdf/2004.10362.pdf)
- 학습 과정
    
    [전체 학습 과정](https://www.notion.so/1f677f2be8ff46268815d4e2e4fd529c)
    

# 2. 메인 기능

- 메인 서비스
    - 컴퓨터 웹캠을 통한 AI 자세 인식(상체 중심)
        - 운동 자세 코칭
            - 목, 어깨, 허리, 올인원
        - 타이머
        - 다음 동작 알림
    - 시작 전 웹캠의 위치 맞추기
- 회원가입/로그인
    - 간편 로그인
    - 이메일 인증
- MyPage
    - DashBoard
        - 주간 운동 시간
        - 거북목 진단 결과
- 소개페이지
    - 간략한 서비스 소개
- 플로우차트
    - 플로우차트
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4cc75466-9319-45c8-905b-986fe177f590/Untitled.png)
        

### 서브기능

- 알람 설정 기능
    - 시간을 정해 놓고, 알람 형식으로 유저에게 전달( ex: 매 정시 마다 목 스트레칭 관련 알람)
- 운동 시간 체크
    - 단위 기간별로, 유저의 총 운동 시간 보여주기
- 거북목 진단
    - 웹캠을 통한 목과 어깨사이의 각도를 통해 간단한 거북목 진단 서비스

**프로젝트만의 차별점 및 기대 효과**

- 인공지능을 통한 정확한 자세 전달
- 컴퓨터를 자주 이용하는 고객에게 포커싱하여, 의자에 앉아서 간단하게 할 수 있는 니즈 충족
- 알람 기능을 통한, 이용 유저의 지속적인 사용 유도
- 무료 거북목 진단 서비스를 통한 고객 체험 강화
