import React from 'react';
import * as S from "./ChairCoachStyle";

import Alarm from '../../components/chairCoach/Alarm';
import Stretching from '../../components/chairCoach/Stretching';

const ChairCoach = () => {
  return (
    <S.ChairCoachLayout>
      <div className='inner'>
        <Alarm/>
        <Stretching/>
      </div>
    </S.ChairCoachLayout>
  );
};

export default ChairCoach
