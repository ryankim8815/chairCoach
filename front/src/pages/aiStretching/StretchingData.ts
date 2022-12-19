//각 동작 설명입니다 params로 explains.params[state] 이렇게 뽑아서 넣어주세요
export const explains = {
  beginner: [
    "가볍게 기지개 켜듯 양손을 귀에 붙이고\n 위로 최대한 뻗어주세요.",
    "오른쪽 손으로 왼쪽 옆머리를 잡고, \n목 오른쪽을 늘려주세요.",
    "왼쪽 손으로 오른쪽 옆머리를 잡고, \n목 왼쪽을 늘려주세요.",
    "오른쪽 팔을 귀에 붙인 후,\n 몸 오른쪽을 늘려주세요.",
    "왼쪽 팔을 귀에 붙인 후,\n 몸 왼쪽을 늘려주세요.",
  ],
  middleclass: [
    "가볍게 기지개 켜듯 양손을 귀에 붙이고\n 위로 최대한 뻗어주세요.",
    "오른쪽 손으로 왼쪽 옆머리를 잡고, \n목 오른쪽을 늘려주세요.",
    "왼쪽 손으로 오른쪽 옆머리를 잡고, \n목 왼쪽을 늘려주세요.",
    "오른쪽 팔을 귀에 붙인 후,\n 몸 오른쪽을 늘려주세요.",
    "왼쪽 팔을 귀에 붙인 후,\n 몸 왼쪽을 늘려주세요.",
    "양손을 깍지 끼고 뒤통수에 올린 후,\n 목 뒤쪽을 늘려주세요.",
    "목을 왼쪽 대각선 위쪽 방향으로 들어 \n 목 앞쪽을 늘려주세요.",
    "목을 오른쪽 대각선 위쪽 방향으로 들어 \n 목 앞쪽을 늘려주세요.",
    "오른쪽 어깨 끝을 바라본 후,\n 오른쪽 손을 뒷통수에 대고 뒤쪽을 늘려주세요.",
    "왼쪽 어깨 끝을 바라본 후,\n 왼쪽 손을 뒷통수에 대고 뒤쪽을 늘려주세요.",
  ],
  highclass: [
    "가볍게 기지개 켜듯 양손을 귀에 붙이고\n 위로 최대한 뻗어주세요.",
    "오른쪽 손으로 왼쪽 옆머리를 잡고, \n목 오른쪽을 늘려주세요.",
    "왼쪽 손으로 오른쪽 옆머리를 잡고, \n목 왼쪽을 늘려주세요.",
    "오른쪽 팔을 귀에 붙인 후,\n 몸 오른쪽을 늘려주세요.",
    "왼쪽 팔을 귀에 붙인 후,\n 몸 왼쪽을 늘려주세요.",
    "양손을 깍지 끼고 뒤통수에 올린 후,\n 목 뒤쪽을 늘려주세요.",
    "목을 왼쪽 대각선 위쪽 방향으로 들어 \n 목 앞쪽을 늘려주세요.",
    "목을 오른쪽 대각선 위쪽 방향으로 들어 \n 목 앞쪽을 늘려주세요.",
    "오른쪽 어깨 끝을 바라본 후,\n 오른쪽 손을 뒷통수에 대고 뒤쪽을 늘려주세요.",
    "왼쪽 어깨 끝을 바라본 후,\n 왼쪽 손을 뒷통수에 대고 뒤쪽을 늘려주세요.",
    "손을 양옆으로 드세요.\n손높이는 귀높이에 맞추고 가슴을 열어주세요.",
    "어깨가 시작되는 지점에\n 손을 올리고 돌려주세요.",
    "목 뒤에 손을 살짝 얹고,\n 고개를 위로 젖혀주세요.",
  ],
};
export const stretchingName = {
  beginner: ["arms_up", "neck_left", "neck_right", "arm_right", "arm_left"],
  middleclass: [
    "arms_up",
    "neck_left",
    "neck_right",
    "arm_right",
    "arm_left",
    "neck_down",
    "neck_up_right",
    "neck_up_left",
    "neck_down_left",
    "neck_down_right",
  ],
  highclass: [
    "arms_up",
    "neck_left",
    "neck_right",
    "arm_right",
    "arm_left",
    "neck_down",
    "neck_up_right",
    "neck_up_left",
    "neck_down_left",
    "neck_down_right",
    "hands_up",
    "shoulder",
    "neck-up",
  ],
};
//기초, 중급, 심화 단계별 총 시간입니다. 마찬가지로 파람스로 뽑아주세요
export const totalTime = [50, 100, 130];
// 기초, 중급, 심화 단계별 동작 갯수입니다. 마찬가지로 파람스로 뽑아주세요
export const stepOfStretching = {
  beginner: 5,
  middleclass: 10,
  highclass: 13,
};
// 민지님이 이미지로 할까요 라고 하셔서 일단 만들어놨습니다. 파람스, 내부 state로 뽑아먹어야합니다. 0에는 기초 단계 이미지 5개, 1에는 중급 10개, 2에는 심화 15개입니다.
export const stretchingImage = {
  beginner: ["이미지5개"],
  middleclass: ["이미지10개"],
  highclass: ["이미지15개"],
};
// 동영상으로 할경우입니다. 이미지랑 같은 방법으로 뽑아먹어야합니다.
export const stretchingVideo = {
  beginner: ["동영상5개"],
  middleclass: ["동영상10개"],
  highclass: ["동영상15개"],
};
