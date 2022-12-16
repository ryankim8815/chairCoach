## 포즈 인식 및 예측 모델
---
**목차**  
1. Movenet, XGBoost를 이용한 모델 학습
2. Fastapi를 이용한 포즈 예측 API   
   
</br>

### 1. Movenet과 XGBoost를 이용한 모델 학습
---
**Data set**  
- Custom data
    - device : 개인 로컬 웹캠
    - 수집방법 : zoom 화면 녹화
    - 촬영 방법 : 카메라 각도, 배경, 의상 변경
    - 데이터 
        - Total data : 1179 + 187 (over sample)
        - 13가지의 동작
        - 총 7명 인물 참여   

</br>

- Data set 폴더 구조
```
./model/
├─data
│  ├─csvs
│  └─images
│      ├─arms_up
│      ├─arm_left
│      ├─arm_right
│      ├─hands_up
│      ├─neck_down
│      ├─neck_down_left
│      ├─neck_down_right
│      ├─neck_left
│      ├─neck_right
│      ├─neck_up
│      ├─neck_up_left
│      ├─neck_up_right
│      └─shoulder
├─ ...
```
</br>

**학습 과정**  
1.1 Movenet을 이용한 keypoint 좌표 추출   
1.2 XGBoost를 하여 포즈에 대한 좌표 학습

1.2 XGBoost (xgboost 논문) https://arxiv.org/pdf/1603.02754.pdf


</br>

### Fastapi를 이용한 포즈 예측 API
---
