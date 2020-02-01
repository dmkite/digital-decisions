import React, { useReducer } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Picker, Button, ScrollView } from 'react-native'
import { Formik } from 'formik'
import BooleanForm from '../components/BooleanForm'

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

enum Gender {
  male = "Male",
  female = "Female",
  notListed = "Not Listed"
}

interface IFormVals {
  // impact: string
  // trueOrFalse: {
  //   onlinePredator: boolean | null
  //   resources: boolean | null
  // }
  demographics: {
    school: School | ''
    zipCode: string
    age: string
    race: Race | ''
    gender: Gender | '',
    altSchool: string | null
    altRace: string | null
    altGender: string | null
  }
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
  demographics: {
    school: '',
    zipCode: '',
    age: '',
    race: '',
    gender: '',
    altSchool: '',
    altGender: '',
    altRace: ''
  },
  isSubmitting: false,
  isSubmitted: false,
  // impact: '',
  error: false,

  // trueOrFalse: {
  //   onlinePredator: null
  // }


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

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
<>
        <ScrollView style={styles.form}>
          {/* <Text style={styles.link} >Why do I have to fill out a form?</Text> */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Demographics</Text>
            <Text style={styles.label}>What school do you go to?</Text>
            <View style={styles.hiddenField}>
              <Picker
                selectedValue={state.school || 'Select a school'}
                style={styles.picker}
                onValueChange={value => dispatch({ type: Action.ENTRY, payload: { field: 'school', value } })}
              >
                <Picker.Item label="Select a school" value="Select a school" />
                {Object.keys(School).map((key: string, i: number): JSX.Element => {
                  return <Picker.Item key={i} label={School[key]} value={School[key]} />
                })}
              </Picker>
              {
                state.school === School.NotListed
                  ? <TextInput 
                      style={styles.input} 
                      onChangeText={value => dispatch({type: Action.ENTRY, payload: {field: 'school', value}})} 
                      value={state.demographics.altSchool || 'Enter school'}/>
                  : null
              }

            </View>

            {/* <View style={StyleSheet.section}>
              <Text style={styles.sectionTitle}>True or False</Text>
              <BooleanForm question={"I know what to do if I am approached by an online predator"} callback={value => dispatch({})}/>
            </View> */}
          </View>
          <Button style={styles.submit}  title="submit" />
        </ScrollView>

    </>
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
    backgroundColor: 'red'
  },
  submit: {

  },
  hiddenField: {
    flexDirection: 'row'
  },
  sectionTitle: {
    fontSize:24
  }
})


export default Form
