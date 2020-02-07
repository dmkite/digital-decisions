import React, { useReducer } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, AsyncStorage, ActivityIndicator } from 'react-native'
import DemographicQuestions from '../components/DemographicQuestions'
import { School, Race, Gender } from '../components/DemographicQuestions/DemoProps'
import TrueFalseQuestions from '../components/TrueFalseQuestions'
import ShortAnswerQuestions from '../components/ShortAnswerQuestions'

interface IFormVals {
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
  return arrVal.join('')
}

const reducer = (state: IFormState, action: IFormAction): IFormState => {
  const payload: string | { field: string; value: string | number | boolean; } | undefined = action.payload
  const field = payload && typeof payload !== 'string' ? payload.field : 'error'
  let value = payload && typeof payload !== 'string' ? payload.value : 'error'
  if (typeof value === 'string') {
    value = value.trim()
  }

  if (field === 'zipCode' || field === 'age') {
    value = sanitizeValues(String(value))
  }
  switch (action.type) {
    case Action.SUBMIT:
      return { ...state, isSubmitting: true, isSubmitted: false }
    case Action.COMPLETE_SUBMIT: 
      return { ...state, isSubmitting: false, isSubmitted: true }
    case Action.ENTRY:
      return { ...state, [field]: value }
    case Action.ENTER_DEMO:
      return { ...state, demographics: { ...state.demographics, [field]: value } }
    case Action.REQUEST_INFO:
      return { ...state, isRequestingInfo: { ...state.isRequestingInfo, [payload as string]: !state.isRequestingInfo[payload as string] } }
    case Action.SHOW_HIDE_SECTION:
      return {...state, isCollapsed: {...state.isCollapsed, [field]: !state.isCollapsed[field] }}
    case Action.CLEAR:
      return initialState
    case Action.SET_ERROR:
      return {...state, error: !state.error}
    default:
      return state
  }
}

const hasEntries = (formResults: any): boolean => {
  for (let key of Object.keys(formResults)) {
    for(let subKey of Object.keys(formResults[key])) {
      if(formResults[key][subKey] || formResults[key][subKey] === false) {
        return true
      }
    }
  }
  return false
}

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = async (): Promise<any> => {
    dispatch({type: Action.SUBMIT})
    const formResults = {
      trueFalse: state.trueFalse,
      demographics: state.demographics,
      shorAnswer: state.shortAnswer
    }
    const shouldStore = hasEntries(formResults)
    if(!shouldStore) 
    try { 
      let storedForms: string | null = await AsyncStorage.getItem('form-results')
      const parsedResults: any[] = storedForms ? JSON.parse(storedForms) : []
      parsedResults.push(formResults)
      await AsyncStorage.setItem('form-results', JSON.stringify(parsedResults))
      dispatch({type: Action.CLEAR})
      dispatch({type: Action.COMPLETE_SUBMIT})
    } catch (err) {
      // do something with the err here.
      dispatch({type: Action.SET_ERROR})
      setTimeout(() => dispatch({type:Action.SET_ERROR}), 5000) 
    }
  }

  return (
    <>
      {state.isSubmitting && <ActivityIndicator size="large" color="#0000ff" />}
      {state.isSubmitted && <Text style={[styles.thankYou, styles.banner]}>Thanks For completing our Form!</Text>}
      {state.error && <Text style={[styles.error, styles.banner]}>Uh oh. Something went wrong.</Text>}

      <ScrollView style={styles.form}>
      <TouchableOpacity style={styles.titleRow} onPress={() => dispatch({type: Action.SHOW_HIDE_SECTION, payload: {field:'demographics', value: ''}})}>
            <Text style={styles.sectionTitle}>Demographics</Text>
            <Text style={styles.sectionTitleExpand}>{state.isCollapsed.demographics ? '+' : '-'}</Text>
          </TouchableOpacity>
          
        <View style={state.isCollapsed.demographics ? { height: 0 } : {}}>
          <DemographicQuestions
            isRequestingInfo={state.isRequestingInfo}
            demographics={state.demographics}
            Action={Action}
            dispatch={dispatch}
          />

        </View>


          <TouchableOpacity style={styles.titleRow} onPress={() => dispatch({type: Action.SHOW_HIDE_SECTION, payload: {field:'trueFalse', value: ''}})}>
            <Text style={styles.sectionTitle}>True or False</Text>
            <Text style={styles.sectionTitleExpand}>{state.isCollapsed.trueFalse ? '+' : '-'}</Text>
          </TouchableOpacity>

        <View style={state.isCollapsed.trueFalse ? { height: 0 } : {}}>
          <TrueFalseQuestions
            trueFalse={state.trueFalse}
            Action={Action}
            dispatch={dispatch}
          />
        </View>

        <View style={state.isCollapsed.trueFalse ? { height: 0 } : {}}>
          <ShortAnswerQuestions
            shortAnswer={state.shortAnswer}
            Action={Action}
            dispatch={dispatch}
          />
        </View>


        <Button onPress={handleSubmit} title="submit" />
      </ScrollView>

    </>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    flex: 0.9,
    fontSize: 24,
    marginBottom: 20
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
    borderBottomColor: '#30dd50',
    backgroundColor: '#50ff70',
    color: '#30dd50',
  },
  error: {
    borderBottomColor: 'dd5030',
    backgroundColor: 'ff7050',
    color: 'dd5030'
  },
  banner: {
    flex:1,
    borderBottomWidth: 1,
    position: 'absolute', 
    top:0, 
    left:0,
    right:0,
    padding:20
  }
})


export default Form
