import React from 'react'
import RadioSelect from '../RadioSelect'
import {View, StyleSheet} from 'react-native'
import ITrueFalseProps, { TrueFalse } from './TrueFalseProps'

const TrueFalseQuestions = (props: ITrueFalseProps) => {
  const { dispatch, Action } = props
  return (
    <View style={styles.wrapper}>
      {Object.keys(TrueFalse).map((key: string, i: number): JSX.Element => {
        return <RadioSelect
          key={i}
          question={TrueFalse[key as keyof typeof TrueFalse]}
          callback={(value: boolean | string) => {
            const bool = value === 'true'
            dispatch({ type: Action.ENTER_T_F, payload: { field: key, value: bool } }
            )
          }}
          answerValues={['true', 'false']}
        />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20
  }
})


export default TrueFalseQuestions
