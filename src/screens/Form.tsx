import React, { useReducer } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Picker, Button, ScrollView } from 'react-native'
import RadioSelect from '../components/RadioSelect'
import DemographicQuestions from '../components/DemographicQuestions'

enum School {
  MillCreek = "Mill Creek",
  DexterHigh = "Dexter High",
  NotListed = "Not Listed"
}

enum Race {
  Asian = "Asian",
  Black = "Black",
  Latinx = "Latinx",
  MixedRace = "Mixed Race",
  NativeAmerican = "Native American",
  White = "White",
  NotListed = "Not Listed"
}

enum Gender {
  male = "Male",
  female = "Female",
  NotListed = "Not Listed"
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
    altSchool: string 
    altRace: string 
    altGender: string 
  }
}

interface IFormState extends IFormVals {
  isNotListed: {
    school: boolean,
    gender: boolean
  }
  isRequestingInfo: {
    [key: string]: boolean
    gender: boolean
    race: boolean
  }
  isSubmitting: false
  isSubmitted: boolean,
  error: boolean,
  isCollapsed: {
    demographics: boolean
    trueFalse: boolean
    shortAnswer: boolean
  }
}

const initialState: IFormState = {
  isNotListed: {
    school: false,
    gender: false
  },
  isRequestingInfo: {
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
  isCollapsed: {
    demographics: false,
    trueFalse: true,
    shortAnswer: true,
  }

}

interface IFormAction {
  type: string
  payload?: {
    field: string
    value: string | number | boolean
  } | string
}

const sanitizeValues = (value: string): string => {
  const arrVal: string[] = value.split('').filter((char: string) => {
    return 48 <= char.charCodeAt(0) && char.charCodeAt(0) <= 57
  })
  return arrVal.join('')
}

const reducer = (state: IFormState, action: IFormAction): IFormState => {
  const payload: string | { field: string; value: string | number | boolean; } | undefined = action.payload
  const field = payload && typeof payload !== 'string' ? payload.field : 'error'
  let value = payload && typeof payload !== 'string' ? payload.value : 'error'
  if(typeof value === 'string'){
    value = value.trim()
  }
  
  if(field === 'zipCode' || field === 'age') {
    value = sanitizeValues(String(value))
  }

  switch (action.type) {
    case Action.SUBMIT:
      return { ...state, isSubmitted: true }
    case Action.ENTRY:
      return { ...state, [field]: value }
    case Action.ENTER_DEMO:
        return {...state, demographics: {...state.demographics, [field]: value}}
    case Action.REQUEST_INFO:
      return {...state, isRequestingInfo: {...state.isRequestingInfo, [payload as string]: !state.isRequestingInfo[payload as string]}}
    default:
      return state
  }
}

enum Action {
  SUBMIT = 'SUBMIT',
  ENTRY = 'ENTRY',
  ENTER_DEMO = 'ENTER_DEMO',
  REQUEST_INFO = 'REQUEST_INFO'
}

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <ScrollView style={styles.form}>
        <View style={state.isCollapsed.demographics ? {height: 50} : {}}>
          <DemographicQuestions 
            isRequestingInfo={state.isRequestingInfo}
            demographics={state.demographics}
            Action={Action}
            dispatch={dispatch}
          />

        </View>
        <Button onPress={() => {}} title="submit" />
      </ScrollView>

    </>
  )
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  link: {
    color: 'teal'
  },
  label: {
    fontSize: 18,
    flex: 1,
    marginBottom: 10,
    marginTop: 20
  },
  radioWrapper: {
    flex: 0.5,
    borderWidth: 1,
    marginRight: 20,
    paddingTop: 5
  },
  input: {
    borderBottomWidth: 1,
    flex: 1,
    backgroundColor: 'red',
    height: 30,
    lineHeight: 10
  },
  hiddenInput: {
    flex: 0.5
  },
  hiddenField: {
    flexDirection: 'row'
  },
  sectionTitle: {
    fontSize: 24
  }
})


export default Form
