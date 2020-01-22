import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native'
import IPassageProps from './passage.props'
import {IJSXContent} from '../../reducers/story'
import {selectPassage} from '../../actions/story'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import Phone from '../Phone'

const Passage = (props: IPassageProps) => {
  const handlePress = (passageName: string) => props.selectPassage(passageName)

  const generateJSX = (passage: IJSXContent, i: number): JSX.Element => {
    switch(passage.JSXType) {
      case 'text':
        return <Text style={styles.passageText} key={i}>{passage.content}</Text>
      case 'link':
        return <TouchableWithoutFeedback onPress={() => handlePress(passage.linksTo)} key={i}><Text style={styles.link}>
          {passage.content}
          </Text>
          </TouchableWithoutFeedback>
      case 'image':
        // return <Image source={passage.content}/>
      default:
        return <Text key={i}>Did not account for {passage.JSXType}</Text>
    }
  }

  return (
    <View style={styles.outerBorder}>
      <View style={styles.passageContent}>
        {/* {props.content.map(generateJSX)} */}
        <Phone/>
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
    marginRight: 110,
    flexGrow: 1,
    backgroundColor: '#ffffff50'
  },
  passageContent: {
    borderWidth: 3,
    borderColor: '#555',
    borderRadius: 10,
    margin: 5,
    height:500,
    padding:10,
    flex:1
  },
  link: {
    color: 'teal',
    fontWeight: 'bold',
    fontSize: 20
  },
  passageText: {
    fontSize: 20,
    color: '#000'
  }
})

const mapDispatchToProps = dispatch => bindActionCreators({selectPassage}, dispatch)
export default connect(null, mapDispatchToProps)(Passage)

