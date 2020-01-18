import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native'
import IPassageProps from './passage.props'
import IJSXContent from '../../reducers/story'

/**
 * 
 * @param props export interface IJSXContent {
  JSXType: string
  content: string
  linksTo: string
}
 */

const Passage = (props: IPassageProps) => {
  props.content.content = [
    {JSXType: 'text', content: 'hullo', linksTo: null}
  ]

  const generateJSX = (content: IJSXContent, i: number): JSX.Element => {
    switch(content.JSXType) {
      case 'text':
        return <Text style={styles.passageText} key={i}>{content.content.content}</Text>
      case 'link':
        return <TouchableWithoutFeedback key={i}><Text>
          {content.content.content}
          </Text>
          </TouchableWithoutFeedback>
      case 'image':
        return <Image source={content.content.content}/>
      default:
        return <Text key={i}>Did not account for {content.JSXType}</Text>
    }
  }

  return (
    <View style={styles.outerBorder}>
      <View style={styles.passageContent}>
        {props.content.content.map(generateJSX)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundGradient: {
    flex: 1,
    padding: 20
  },
  outerBorder: {
    borderWidth: 3,
    borderColor: '#555',
    borderRadius: 10,
    marginTop: 20,
    marginRight: 20,
    flexGrow: 1
  },
  passageContent: {
    borderWidth: 3,
    borderColor: '#555',
    borderRadius: 10,
    margin: 10,
  },
  link: {
    color: 'red'
  },
  passageText: {
    fontSize: 24,
    color: '#000'
  }
})

export default Passage

