import React, { useReducer } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import DemographicQuestions from '../components/DemographicQuestions'
import { School, Race, Gender } from '../components/DemographicQuestions/DemoProps'
import TrueFalseQuestions from '../components/TrueFalseQuestions'
import ShortAnswerQuestions from '../components/ShortAnswerQuestions'
import Header from '../components/Header'

export interface IFormVals {
  demographics: {
    school: School | ''
    zipCode: string
    age: string
    race: Race | ''
    gender: Gender | ''
    altSchool: string
    altRace: string
    altGender: string
  },
  trueFalse: {
    [key: string]: boolean | null
    q1: boolean | null
    q2: boolean | null
    q3: boolean | null
    q4: boolean | null
    q5: boolean | null
  },
  shortAnswer: {
    [key: string]: string
    q1: string
    q2: string
    q3: string
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
  isSubmitting: boolean
  isSubmitted: boolean
  error: boolean,
  isCollapsed: {
    [key: string]: boolean
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
  error: false,

  trueFalse: {
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null
  },

  shortAnswer: {
    q1: '',
    q2: '',
    q3: ''
  },
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

enum Action {
  SUBMIT = 'SUBMIT',
  COMPLETE_SUBMIT = 'COMPLETE_SUBMIT',
  ENTRY = 'ENTRY',
  ENTER_DEMO = 'ENTER_DEMO',
  ENTER_T_F = 'ENTER_T_F',
  ENTER_SHORT_ANSWER = 'ENTER_SHORT_ANSWER',
  SHOW_HIDE_SECTION = 'SHOW_HIDE_SECTION',
  REQUEST_INFO = 'REQUEST_INFO',
  CLEAR = 'CLEAR',
  SET_ERROR = 'SET_ERROR'
}

const sanitizeValues = (value: string): string => {
  const arrVal: string[] = value.split('').filter((char: string) => {
    return 48 <= char.charCodeAt(0) && char.charCodeAt(0) <= 57
  })
  return arrVal.join('').trim()
}

const reducer = (state: IFormState, action: IFormAction): IFormState => {
  const payload: string | { field: string; value: string | number | boolean; } | undefined = action.payload
  const field = payload && typeof payload !== 'string' ? payload.field : 'error'
  let value = payload && typeof payload !== 'string' ? payload.value : 'error'
  if (field === 'zipCode' || field === 'age') {

    value = sanitizeValues(String(value))
  }
  switch (action.type) {
    case Action.SUBMIT:
      return { ...state, isSubmitting: true, isSubmitted: false }
    case Action.COMPLETE_SUBMIT:
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: true,
        isCollapsed: {
          demographics: true,
          trueFalse: true,
          shortAnswer: true,
        }
      }
    case Action.ENTRY:
      return { ...state, [field]: value }
    case Action.ENTER_DEMO:
      return { ...state, demographics: { ...state.demographics, [field]: value } }
    case Action.ENTER_T_F:
      return { ...state, trueFalse: { ...state.trueFalse, [field]: (value as boolean) } }
    case Action.ENTER_SHORT_ANSWER:
      return { ...state, shortAnswer: { ...state.shortAnswer, [field]: (value as string) } }
    case Action.REQUEST_INFO:
      return { ...state, isRequestingInfo: { ...state.isRequestingInfo, [payload as string]: !state.isRequestingInfo[payload as string] } }
    case Action.SHOW_HIDE_SECTION:
      return { ...state, isCollapsed: { ...state.isCollapsed, [field]: !state.isCollapsed[field] } }
    case Action.CLEAR:
      return initialState
    case Action.SET_ERROR:
      return { ...state, error: !state.error }
    default:
      return state
  }
}

const hasEntries = (formResults: any): boolean => {
  for (let key of Object.keys(formResults)) {
    for (let subKey of Object.keys(formResults[key])) {
      if (formResults[key][subKey] || formResults[key][subKey] === false) {
        return true
      }
    }
  }
  return false
}

const Form = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = async (): Promise<any> => {
    dispatch({ type: Action.SUBMIT })
    const formResults = {
      trueFalse: state.trueFalse,
      demographics: state.demographics,
      shortAnswer: state.shortAnswer
    }
    const shouldStore = hasEntries(formResults)
    if (!shouldStore) {
      setTimeout(() => props.navigation.navigate('Home'), 5000)
      return dispatch({ type: Action.COMPLETE_SUBMIT })
    }
    try {
      console.log('trying')
      let storedForms: string | null = await AsyncStorage.getItem('form-results')
      console.log({ storedForms })
      const parsedResults: any[] = storedForms ? JSON.parse(storedForms) : []
      parsedResults.push(formResults)
      console.log(parsedResults)
      await AsyncStorage.setItem('form-results', JSON.stringify(parsedResults))
      dispatch({ type: Action.CLEAR })
    } catch (err) {
      // do something with the err here.
      console.log(err)
      dispatch({ type: Action.SET_ERROR })
      setTimeout(() => dispatch({ type: Action.SET_ERROR }), 5000)
    } finally {
      setTimeout(() => props.navigation.navigate('Home'), 5000)
      dispatch({ type: Action.COMPLETE_SUBMIT })
    }
  }

  return (
    <>
      <Header />
      {state.isSubmitting && <View style={styles.screen}><ActivityIndicator size="large" color="teal" /></View>}
      {state.isSubmitted && <Text style={[styles.thankYou, styles.banner]}>Thanks For completing our Form!</Text>}
      {state.error && <Text style={[styles.error, styles.banner]}>Uh oh. Something went wrong.</Text>}

      <ScrollView style={styles.form}>
        <TouchableOpacity style={styles.titleRow} onPress={() => dispatch({ type: Action.SHOW_HIDE_SECTION, payload: { field: 'demographics', value: '' } })}>
          <Text style={styles.sectionTitle}>Demographics</Text>
          <Text style={styles.sectionTitleExpand}>{state.isCollapsed.demographics ? '+' : '-'}</Text>
        </TouchableOpacity>

        {state.isCollapsed.demographics
          ? null
          : <DemographicQuestions
            isRequestingInfo={state.isRequestingInfo}
            demographics={state.demographics}
            Action={Action}
            dispatch={dispatch}
          />
        }
        <View style={styles.underline} />

        <TouchableOpacity style={styles.titleRow} onPress={() => dispatch({ type: Action.SHOW_HIDE_SECTION, payload: { field: 'trueFalse', value: '' } })}>
          <Text style={styles.sectionTitle}>True or False</Text>
          <Text style={styles.sectionTitleExpand}>{state.isCollapsed.trueFalse ? '+' : '-'}</Text>
        </TouchableOpacity>

        {state.isCollapsed.trueFalse
          ? null
          : <TrueFalseQuestions
            trueFalse={state.trueFalse}
            Action={Action}
            dispatch={dispatch}
          />
        }
        <View style={styles.underline} />

        <TouchableOpacity style={styles.titleRow} onPress={() => dispatch({ type: Action.SHOW_HIDE_SECTION, payload: { field: 'shortAnswer', value: '' } })}>
          <Text style={styles.sectionTitle}>Short Answer</Text>
          <Text style={styles.sectionTitleExpand}>{state.isCollapsed.shortAnswer ? '+' : '-'}</Text>
        </TouchableOpacity>

        {state.isCollapsed.shortAnswer
          ? null
          : <ShortAnswerQuestions
            shortAnswer={state.shortAnswer}
            Action={Action}
            dispatch={dispatch}
          />
        }

        <View style={styles.underline} />

        <Button onPress={handleSubmit} title="submit" />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    flex: 0.9,
    fontSize: 24,
  },
  sectionTitleExpand: {
    flex: 0.1,
    fontSize: 24,
    textAlign: 'right'
  },
  titleRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  form: {
    padding: 20,
    paddingBottom: 100
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
  thankYou: {
    borderBottomColor: '#192201',
    backgroundColor: '#DDF2AE',
    color: '#192201'
  },
  error: {
    borderBottomColor: '#73020C',
    backgroundColor: '#F27272',
    color: '#73020C',
  },
  banner: {
    flex: 1,
    borderBottomWidth: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
    fontSize: 18,
    zIndex: 10
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00000050',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: '50%'
  },
  underline: {
    width: '100%',
    marginTop: 10,
    marginBottom: 50,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd"
  }
})

export default Form
