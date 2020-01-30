import React, { useReducer } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Picker, Button, ScrollView } from 'react-native'
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
  error: boolean,
  altSchool: string
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
  error: false,
  altSchool: ''
}

interface IFormAction {
  type: string
  payload?: {
    field: string
    value: string | number | boolean
  } | string
}

const reducer = (state: IFormState, action: IFormAction): IFormState => {
  switch (action.type) {
    case Action.SUBMIT:
      return { ...state, isSubmitted: true }
    case Action.ENTRY:
      const { field, value } = action.payload ? action.payload : { field: 'error', value: true }
      return { ...state, [field]: value }
    default:
      return state
  }
}

enum Action {
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
        <ScrollView style={styles.form}>
          {/* <Text style={styles.link} >Why do I have to fill out a form?</Text> */}
          <View style={styles.section}>
            <Text style={styles.label}>What school do you go to?</Text>
            <View style={styles.hiddenField}>
              <Picker
                selectedValue={state.school || 'Select a school'}
                style={styles.picker}
                onValueChange={value => dispatch({ type: Action.ENTRY, payload: { field: 'school', value } })}
              >
                <Picker.Item label="Select a school" value="Select a school" />
                <Picker.Item label="Mill Creek Middle" value={School.MillCreek} />
                <Picker.Item label="Dexter High" value={School.DexterHigh} />
                <Picker.Item label={School.NotListed} value={School.NotListed} />
              </Picker>
              {
                state.school === School.NotListed
                  ? <TextInput style={styles.input} onChangeText={value => dispatch({type: Action.ENTRY, payload: {field: 'school', value}})} value={state.altSchool}/>
                  : null
              }

            </View>

          </View>
          <Button style={styles.submit} onPress={handleSubmit} title="submit" />

        </ScrollView>

      )}

    </Formik>
  )
}

const styles = StyleSheet.create({
  section: {
    borderWidth: 1,
    marginBottom: 50
  },
  form: {
    padding: 20,
  },
  link: {
    color: 'teal'
  },
  label: {
    fontSize: 18,
    flex: 1,
    backgroundColor: 'green'
  },
  picker: {
    borderWidth: 1,
    borderColor: 'black',
    width: 200,
    height: 50,
  },
  input: {
    borderBottomWidth: 1,
    flex: 1,
    padding:0
  },
  submit: {

  },
  hiddenField: {
    flexDirection: 'row'
  }
})


export default Form
