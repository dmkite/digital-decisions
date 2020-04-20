import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
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
  const handlePress = (field: string, value: string) => {
    props.dispatch({
      type: props.Action.ENTER_MULTI_CHOICE,
      payload: {
        field,
        value
      }
    })
  }
  return (
    <View>
      {Object.keys(multipleChoice).map((q: string, i: number) => {
        const qAndA = multipleChoice[q as keyof typeof multipleChoice]
        return (
          <View style={styles.questionBlock}>
            <Text style={styles.question}>{qAndA.question}</Text>
            {Object.keys(qAndA.answers).map((a: string, i: number) => (
              <TouchableWithoutFeedback key={i} onPress={() => handlePress(q, a)}>
                <View style={styles.radioHolder}>
                  <View style={[styles.radio, props.multiChoice[q as keyof typeof multipleChoice] === a ? styles.filled : null]}></View>
                  <Text style={styles.label}>{qAndA.answers[a]}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        )
      })}
    </View>
  )
}
const styles = StyleSheet.create({
  radio: {
    borderWidth: 1,
    borderRadius: 10,
    height: 20,
    width: 20,
    marginRight: 5
  },
  questionBlock: {
    marginBottom: 30
  },
  radioHolder: {
    flexDirection: 'row',
    marginBottom: 10
  },
  booleanForm: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  filled: {
    backgroundColor: '#555'
  },
  question: {
    fontSize: 18,
    flex: 1,
    marginVertical: 10
  },
  label: {
    marginRight: 20
  }
})

export default MultipleChoice
