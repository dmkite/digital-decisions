import React from 'react'
import { View, Text } from 'react-native'
import IMultiChoiceProps, { IMultiChoiceQuestions } from './MultiChoiceProps'


const multipleChoice: IMultiChoiceQuestions = {
  q1: {
    question: 'What is your digital reputation?',
    answers: {
      a: 'The amount of time you spend online',
      b: 'What people think of you online',
      c: 'How many friends or followers you have on social media'
    }
  },
  q2: {
    question: 'If you receive a sexting picture, what should you do?',
    answers: {
      a: 'Show it to your friends',
      b: 'Screenshot it',
      c: 'Report it to a parent or trusted adult'
    }

  }
}
const MultipleChoice = (props: IMultiChoiceProps) => {
  return (
    <View>
      <Text>Hi</Text>
      {Object.keys(multipleChoice).map((q: string, i: number)=> {
        return <Text>{multipleChoice[q as keyof typeof multipleChoice].question}</Text>
      })}
    </View>
  )
}

export default MultipleChoice
