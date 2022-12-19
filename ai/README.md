## 포즈 인식 및 예측 모델
---
**목차**  
[1. Movenet, XGBoost를 이용한 모델 학습](#1-movenet과-xgboost를-이용한-모델-학습)  
[2. Fastapi를 이용한 포즈 예측 API](#fastapi를-이용한-포즈-예측-api)   
   
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

1.0 이미지 전처리 과정  
1.1 Movenet을 이용한 keypoint 좌표 추출   
1.2 XGBoost를 하여 포즈에 대한 좌표 학습

---
</br>

1.0 이미지 전처리 과정
- [동영상 프레임별 자르기](./model/utils/video_cap.py)
- [이미지 이름 정렬](./model/utils/sort_files.py)
- [resizing (option)](./model/utils/resizer.py)   
- [좌표 normalization](./model/Scripts/kpts_normalization.ipynb)

</br>


1.1 Movenet을 이용한 keypoint 좌표 추출  
[Movenet human pose tutorial](https://www.tensorflow.org/hub/tutorials/movenet)  

1.2 XGBoost 학습 과정   
Decision Tree를 조합해서 사요하는 앙상블 알고리즘  
XGBoost는 회귀 분석뿐만 아니라 분류 모델에도 뛰어난 성능을 갖고있기에 XGBoost Classifier 선택하였다.  
</br>

![XGBoost](./xgboost%20model.png)

[XGBoost 논문](https://arxiv.org/pdf/1603.02754.pdf)


</br>

**학습 순서**  
1. train, test data set 나누기 ([train_test_split.py](./model/train_test_split.py))  
2. xgboost 모델을 이용한 모델 학습 ([xgb_train.py](./model/train_xgb.py))  
3. 파라미터 결정
4. [cross validation]() & [over sample(SMOTE)](./model/Scripts/over_sampling.ipynb) 적용

</br>

### Fastapi를 이용한 포즈 예측 API
---
기술 스택
- FastAPI
- Nginx
- Anaconda

실행 방법
1. 가상환경 실행  

    ```
    conda activate 가상환경 이름
    ```
2. 필요 패키지 설치  

    ```
    pip install -r requirements.txt
    ```
2. run 파일 실행  

    ```
    python run.py
    ```

vm에서 자동 실행하기  
`~/home/elice` 위치에 쉘스크립트 파일 생성 후 크론탭을 이용해 실행

`aibootup.sh`  
```
#!/bin/bash

BASE_DIR="파이썬 파일 위치 경로"
conda_act() {
        source /home/elice/anaconda3/etc/profile.d/conda.sh
        source /home/elice/anaconda3/bin/activate 가상환경 이름
        }

conda_act
cd $BASE_DIR
~/anaconda3/envs/가상환경 이름/bin/python 실행파일.py
```

