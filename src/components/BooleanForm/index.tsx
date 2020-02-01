import React, {useState} from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'

interface IProps {
  question: string
  callback: (response: boolean) => void
}

const index = (props: IProps): JSX.Element => {
  const [answer, setAnswer] = useState<boolean | null>(null)
  return (
    <View style={styles.booleanForm}>
      <Text style={styles.question}>{props.question}</Text>

      <View style={styles.radioHolder}>
        <TouchableWithoutFeedback onPress={() => setAnswer(true)}>
          <View style={[styles.radio, answer === true ? styles.filled : null]}></View>
        </TouchableWithoutFeedback>
        <Text>True</Text>
      </View>

      <View style={styles.radioHolder}>
        <TouchableWithoutFeedback onPress={() => setAnswer(false)}>
          <View style={[styles.radio, answer === false ? styles.filled : null]}></View>
        </TouchableWithoutFeedback>
        <Text>False</Text>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  radio: {
    borderWidth: 1,
    borderRadius: 10,
    height: 20,
    width: 20
  },
  radioHolder: {
    flexDirection: 'row',
  },
  booleanForm: {
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  filled: {
    backgroundColor: 'black'
  },
  question: {
    borderWidth: 1,
    flex: 0.9
  }
})


export default index
