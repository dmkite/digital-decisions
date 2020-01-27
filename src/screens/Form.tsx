import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Formik } from 'formik'

const Form = () => {
  return (
    <View>
      <Text style={styles.link} >Why do I have to fill out a form?</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  link: {
    color: 'teal'
  }
})


export default Form
