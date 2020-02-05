import React, { useReducer } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Picker, Button, ScrollView } from 'react-native'
import RadioSelect from '../components/RadioSelect'

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


}

interface IFormAction {
  type: string
  payload?: {
    field: string
    value: string | number | boolean
  } | string
}

const reducer = (state: IFormState, action: IFormAction): IFormState => {
  const payload: string | { field: string; value: string | number | boolean; } | undefined = action.payload
  const field = payload && typeof payload !== 'string' ? payload.field : 'error'
  const value = payload && typeof payload !== 'string' ? payload.value : 'error'
  
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Demographics</Text>
          <Text style={styles.label}>What school do you go to?</Text>
          <View style={styles.hiddenField}>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={state.demographics.school || 'Select a school'}
                style={styles.picker}
                onValueChange={value => dispatch({ type: Action.ENTRY, payload: { field: 'school', value } })}
              >
                <Picker.Item label="Select a school" value="Select a school" />
                {Object.keys(School).map((key: string, i: number): JSX.Element => {

                  return <Picker.Item key={i} label={School[key as keyof typeof School]} value={School[key as keyof typeof School]} />
                })}
              </Picker>

            </View>
            {
              state.demographics.school === School.NotListed
                ? <TextInput
                  style={[styles.input, styles.hiddenInput]}
                  onChangeText={value => dispatch({ type: Action.ENTRY, payload: { field: 'school', value } })}
                  value={state.demographics.altSchool} />
                : null
            }
          </View>

          <Text style={styles.label}>What's your gender?</Text>
          <View style={styles.hiddenField}>
            <View style={styles.radioWrapper}>
              <RadioSelect
                question=''
                callback={ (value: string | boolean) => dispatch({type: Action.ENTER_DEMO, payload: {field: 'gender', value}})}
                answerValues={Object.keys(Gender).map((key: string) => Gender[key as keyof typeof Gender])}
                />

            </View>
            {
              state.demographics.gender === Gender.NotListed
                ? <TextInput
                  style={[styles.input, styles.hiddenInput]}
                  onChangeText={value => dispatch({ type: Action.ENTER_DEMO, payload: { field: 'gender', value } })}
                  value={state.demographics.altSchool} 
                  />
                : null
            }
          </View>
          <TouchableOpacity onPress={() => dispatch({type: Action.REQUEST_INFO, payload: 'gender'})}>
            <Text style={styles.requestInfoLink}>Why do you need to know my gender?</Text>
          </TouchableOpacity>
          {state.isRequestingInfo.gender
            ? <TouchableOpacity onPress={() => dispatch({type: Action.REQUEST_INFO, payload: 'gender'})}>
              <Text style={styles.infoText}>WACC is a nonprofit. We don't sell a product to make money. Instead we rely on grants to fund our free programs. Some grants ask questions about the people we work with. It may seem strange, but some grants request demographics for age, race, and gender. If we don't have that information, we can't apply for the grants. Thanks for helping us out!</Text>
            </TouchableOpacity>
            : null
          }

          <Text style={styles.label}>What's your race?</Text>
          <View style={styles.hiddenField}>
            <View style={[styles.radioWrapper, {flex:1, marginRight: 0}]}>
              <RadioSelect
                question=''
                callback={ (value: string | boolean) => dispatch({type: Action.ENTER_DEMO, payload: {field: 'race', value}})}
                answerValues={Object.keys(Race).map((key: string) => Race[key as keyof typeof Race])}
                />

            </View>
          </View>
            {
              state.demographics.race === Race.NotListed
                ? <TextInput
                  style={[styles.input, styles.hiddenInput]}
                  onChangeText={value => dispatch({ type: Action.ENTER_DEMO, payload: { field: 'race', value } })}
                  value={state.demographics.altSchool} />
                : null
            }
          <TouchableOpacity onPress={() => dispatch({type: Action.REQUEST_INFO, payload: 'race'})}>
            <Text style={styles.requestInfoLink}>Why do you need to know my race?</Text>
          </TouchableOpacity>
          {state.isRequestingInfo.gender
            ? <TouchableOpacity onPress={() => dispatch({type: Action.REQUEST_INFO, payload: 'race'})}>
              <Text style={styles.infoText}>WACC is a nonprofit. We don't sell a product to make money. Instead we rely on grants to fund our free programs. Some grants ask questions about the people we work with. It may seem strange, but some grants request demographics for age, race, and gender. If we don't have that information, we can't apply for the grants. Thanks for helping us out!</Text>
            </TouchableOpacity>
            : null
          }
          {/* <View style={StyleSheet.section}>
              <Text style={styles.sectionTitle}>True or False</Text>
              <BooleanForm question={"I know what to do if I am approached by an online predator"} callback={value => dispatch({})}/>
            </View> */}
        </View>


        <Button onPress={() => {}} title="submit" />
      </ScrollView>

    </>
  )
}

const styles = StyleSheet.create({
  section: {
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
    marginBottom: 10,
    marginTop: 20
  },
  pickerWrapper: {
    borderWidth: 1,
    flex: 0.5,
    height: 30,
    marginRight: 20
  },
  radioWrapper: {
    flex: 0.5,
    borderWidth: 1,
    marginRight: 20,
    paddingTop: 5
  },
  picker: {
    height: 30
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
  requestInfoLink: {
    fontSize: 12,
    color: 'teal'
  },
  hiddenField: {
    flexDirection: 'row'
  },
  sectionTitle: {
    fontSize: 24
  },
  infoText: {
    fontSize: 12,
    lineHeight: 18
  }
})


export default Form
