import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Picker, TextInput } from 'react-native'
import IDemoProps, { Gender, Race, Grade } from './DemoProps'
import RadioSelect from '../RadioSelect'
import schoolList from '../../assets/schoolList.json'
const WHY_DEMOGRAPHICS: string = "WACC is a nonprofit. We don't sell a product to make money. Instead we rely on grants to fund our free programs. Some grants ask questions about the people we work with. It may seem strange, but some grants request demographics for age, race, and gender. If we don't have that information, we can't apply for the grants. Thanks for helping us out!"

const DemographicQuestions = (props: IDemoProps) => {
  const { dispatch, Action, isRequestingInfo, demographics } = props
  return (
    <View style={styles.section}>
      <Text style={styles.label}>What school do you go to?</Text>
      <View style={styles.hiddenField}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={demographics.school || 'Select a school'}
            style={styles.picker}
            onValueChange={value => dispatch({ type: Action.ENTER_DEMO, payload: { field: 'school', value } })}
          >
            <Picker.Item label="Select a school" value={demographics.school} />
            {schoolList.map((school: string, i: number): JSX.Element => {

              return <Picker.Item key={i} label={school} value={school} />
            })}
          </Picker>

        </View>
        {
          demographics.school === "Not Listed"
            ? <TextInput
              style={[styles.input, styles.hiddenInput]}
              onChangeText={value => dispatch({ type: Action.ENTER_DEMO, payload: { field: 'altSchool', value } })}
              value={demographics.altSchool} />
            : null
        }
      </View>

      <Text style={styles.label}>What grade are you in?</Text>
      <View style={styles.hiddenField}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={demographics.grade || 'Select a grade'}
            style={styles.picker}
            onValueChange={value => dispatch({ type: Action.ENTER_DEMO, payload: { field: 'grade', value } })}
          >
            <Picker.Item label="Select a grade" value={demographics.grade} />
            {Object.values(Grade).map((grade: string, i: number): JSX.Element => {

              return <Picker.Item key={i} label={grade} value={grade} />
            })}
          </Picker>

        </View>
        {
          demographics.grade === "Not Listed"
            ? <TextInput
              style={[styles.input, styles.hiddenInput]}
              onChangeText={value => dispatch({ type: Action.ENTER_DEMO, payload: { field: 'altGrade', value } })}
              value={demographics.altGrade} />
            : null
        }
      </View>

      <Text style={styles.label}>What's your gender?</Text>
      <TouchableOpacity onPress={() => dispatch({ type: Action.REQUEST_INFO, payload: 'gender' })}>
        <Text style={styles.requestInfoLink}>Why do you need to know my gender?</Text>
      </TouchableOpacity>
      {isRequestingInfo.gender
        ? <TouchableOpacity onPress={() => dispatch({ type: Action.REQUEST_INFO, payload: 'gender' })}>
          <Text style={styles.infoText}>{WHY_DEMOGRAPHICS}</Text>
        </TouchableOpacity>
        : null
      }
      <View style={styles.hiddenField}>
        <View style={styles.radioWrapper}>
          <RadioSelect
            question=''
            callback={(value: string | boolean) => dispatch({ type: Action.ENTER_DEMO, payload: { field: 'gender', value } })}
            answerValues={Object.keys(Gender).map((key: string) => Gender[key as keyof typeof Gender])}
          />

        </View>
      </View>
      {
        demographics.gender === Gender.NotListed
          ? <TextInput
            style={[styles.input, styles.hiddenInput]}
            placeholder="Enter gender"
            onChangeText={(value: string) => dispatch({ type: Action.ENTER_DEMO, payload: { field: 'altGender', value } })}
            value={demographics.altGender}
          />
          : null
      }

      <Text style={styles.label}>What's your race?</Text>
      <TouchableOpacity onPress={() => dispatch({ type: Action.REQUEST_INFO, payload: 'race' })}>
        <Text style={styles.requestInfoLink}>Why do you need to know my race?</Text>
      </TouchableOpacity>
      {isRequestingInfo.race
        ? <TouchableOpacity onPress={() => dispatch({ type: Action.REQUEST_INFO, payload: 'race' })}>
          <Text style={styles.infoText}>{WHY_DEMOGRAPHICS}</Text>
        </TouchableOpacity>
        : null
      }
      <View style={styles.hiddenField}>
        <View style={[styles.radioWrapper, { flex: 1, marginRight: 0 }]}>
          <RadioSelect
            question=''
            callback={(value: string | boolean) => dispatch({ type: Action.ENTER_DEMO, payload: { field: 'race', value } })}
            answerValues={Object.keys(Race).map((key: string) => Race[key as keyof typeof Race])}
          />

        </View>
      </View>
      {
        demographics.race === Race.NotListed
          ? <TextInput
            style={[styles.input, styles.hiddenInput]}
            onChangeText={value => dispatch({ type: Action.ENTER_DEMO, payload: { field: 'altRace', value } })}
            placeholder="Enter race"
            value={demographics.altRace} />
          : null
      }

      <Text style={styles.label}>How old are you?</Text>
      <TextInput
        style={[styles.input, { width: '25%' }]}
        maxLength={2}
        keyboardType="numeric"
        value={demographics.age}
        onChangeText={(value: string) => dispatch({ type: Action.ENTER_DEMO, payload: { field: 'age', value } })} />

      <Text style={styles.label}>What's your home zip code?</Text>
      <TextInput
        style={[styles.input, { width: '33%' }]}
        maxLength={5}
        keyboardType="numeric"
        autoCompleteType="postal-code"
        value={demographics.zipCode}
        onChangeText={(value: string) => dispatch({ type: Action.ENTER_DEMO, payload: { field: 'zipCode', value } })} />

    </View>
  )
}

const styles = StyleSheet.create({
  requestInfoLink: {
    fontSize: 12,
    color: 'teal'
  },
  infoText: {
    fontSize: 12,
    lineHeight: 18
  },
  label: {
    fontSize: 18,
    flex: 1,
    marginTop: 20
  },
  input: {
    borderBottomWidth: 1,
    flex: 1,
    paddingVertical: 0,
    lineHeight: 10
  },
  hiddenInput: {
    flex: 0.5
  },
  section: {
    marginBottom: 20
  },
  radioWrapper: {
    // flex: 0.5,
    marginRight: 20,
    paddingTop: 5
  },
  hiddenField: {
    flexDirection: 'row',
    marginTop: 10
  },
  picker: {
    height: 30
  },
  pickerWrapper: {
    borderWidth: 1,
    flex: 0.5,
    height: 30,
    marginRight: 20
  },
})


export default DemographicQuestions
