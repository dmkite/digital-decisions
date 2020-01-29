import React, { useReducer } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Picker } from 'react-native'
import { Formik } from 'formik'

enum School {
  MillCreek = "Mill Creek",
  DexterHigh = "Dexter High",
  NotListed = "Not Listed"
}

enum Race {
  White = "White",
  Black = "Black",
  NativeAmerican = "Native American",
  MixedRace = "MixedRace",
  NotListed = "NotListed"
}

interface IFormVals {
  school: School | ''
  zipCode: number | null
  age: number | null
  race: Race | ''
  impact: string
}

interface IFormState extends IFormVals {
  isNotListed: {
    school: boolean,
    gender: boolean
  }
  isRequestingInformation: {
    gender: boolean
    race: boolean
  }
  isSubmitting: false
  isSubmitted: boolean,
  error: boolean
}

const initialState: IFormState = {
  isNotListed: {
    school: false,
    gender: false
  },
  isRequestingInformation: {
    gender: false,
    race: false
  },
  isSubmitting: false,
  isSubmitted: false,
  school: '',
  zipCode: null,
  age: null,
  race: '',
  impact: '',
  error: false
}

interface IFormAction {
  type: string
  payload?: {
    field: string
    value: string | number | boolean
  } | string
}

const reducer = (state: IFormState, action: IFormAction): IFormState => {
  switch(action.type) {
    case Action.SUBMIT:
      return {...state, isSubmitted: true}
    case Action.ENTRY:
      const {field, value} = action.payload ? action.payload : {field: 'error', value: true}
      return {...state, [field]: value}
    default: 
      return state
  }
}

enum Action{
  SUBMIT = 'SUBMIT',
  ENTRY = 'ENTRY',
}

const initialValues: IFormVals = {
  school: '',
  zipCode: null,
  age: null,
  race: '',
  impact: ''
}

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          {/* <Text style={styles.link} >Why do I have to fill out a form?</Text> */}
          <Text style={styles.label}>What school do you go to?</Text>
          <Picker
            selectedValue={state.school || 'Select a school'}
            style={styles.picker}
            onValueChange={value => dispatch({type:Action.ENTRY, payload: {field: 'school', value }})}
          >
            <Picker.Item label = "Select a school" value="Select a school" />
            <Picker.Item label="Mill Creek Middle" value={School.MillCreek} />
            <Picker.Item label="Dexter High" value={School.DexterHigh} />
            <Picker.Item label={School.NotListed} value={School.NotListed} />
          </Picker>
          {
            state.school === School.NotListed
              ?<Text>whoops</Text>
              : null
          }
          <TouchableOpacity onPress={handleSubmit}>
            <Text>
              Submit
            </Text>
          </TouchableOpacity>
        </View>

      )}

    </Formik>
  )
}

const styles = StyleSheet.create({
  link: {
    color: 'teal'
  },
  label: {
    borderWidth: 1
  },
  picker: {
    borderWidth: 1,
    width: 200,
    backgroundColor: 'red'
  }
})


export default Form
