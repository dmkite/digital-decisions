import React from 'react'
import { View, Text, ActionSheetIOS } from 'react-native'
import RadioSelect from '../RadioSelect'
import ITrueFalseProps, { TrueFalse } from './TrueFalseProps'

const TrueFalseQuestions = (props: ITrueFalseProps) => {
  const { dispatch, Action } = props
  return (
    <>
      {Object.keys(TrueFalse).map((key: string, i: number): JSX.Element => {
        return <RadioSelect
          key={i}
          question={TrueFalse[key as keyof typeof TrueFalse]}
          callback={(value: boolean) => {
            dispatch({ type: Action.ENTER_T_F, payload: { field: key, value: Boolean(value) } }
            )
          }}
          answerValues={['true', 'false']}
        />
      })}
    </>
  )
}

export default TrueFalseQuestions
