import React from 'react'
import { useLocation } from 'react-router-dom'

const SurveyResult = () => {
    const location=useLocation();
    const point=location.state.point

    console.log('여기서나와야함',point)
  return (
    <div>
      result
    </div>
  )
}

export default SurveyResult
