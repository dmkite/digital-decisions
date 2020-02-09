import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native'
import IPassageProps, { IDispatchProps, IStateProps } from './passage.props'
import { selectPassage } from '../../actions/story'
import { bindActionCreators, Dispatch, Action } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../../store'
import { IJSXContent, IStoryState, IPhoneContent } from '../../IRedux'
import Phone from '../Phone'
import imageMapper from '../../utils/imageMapper'

const Passage = (props: IPassageProps) => {
  if (!props.selectedPassage) props.selectedPassage = 'Welcome!'
  const handlePress = (passageName: string | null) => props.selectPassage(passageName)

  const generateJSX = (passage: IJSXContent, i: number): JSX.Element => {
    switch (passage.JSXType) {
      case 'text':
        return <Text style={styles.passageText} key={i}>{passage.content}</Text>
      case 'text:paragraphStart':
        return <Text style={[styles.passageText, styles.paragraphStart]} key={i}>{passage.content}</Text>
      case 'phone':
        if (typeof passage.content !== 'string') {
          return <Phone key={i} name={passage.content.name} messages={passage.content.messages} image={''} />
        }
      case 'link':
      case 'link:action':
        return <TouchableWithoutFeedback onPress={() => handlePress(passage.linksTo)} key={i}><Text style={[styles.link, passage.JSXType === 'link:action' ? styles.actionLink : null]}>
          {passage.content}
        </Text>
        </TouchableWithoutFeedback>
      case 'link:embedded':
        return <Text key={i} style={styles.embeddedLink}>
          {passage.content.map(generateJSX)}
        </Text>
      case 'image':
        return passage.linksTo
          ? <TouchableOpacity onPress={() => handlePress(passage.linksTo)} key={i}>
            <Image style={styles.choiceIcon} source={imageMapper[passage.content as keyof typeof imageMapper]}/>
          </TouchableOpacity>
          : <Image 
              key={i} 
              style={passage.content.includes('bio') ? styles.profileImage : styles.genericImage}
              source={imageMapper[`mod${props.modNumber}`][passage.content as keyof typeof imageMapper]}
            />
      default:
        return <Text key={i}>Did not account for {passage.JSXType}</Text>
    }
  }

  return (
      <View style={styles.passageContent}>
        {props.passages[props.selectedPassage].content.map(generateJSX)}
      </View>
  )
}

const styles = StyleSheet.create({
  backgroundGradient: {
    flex: 1,
    padding: 20
  },
  passageContent: {
    borderWidth: 3,
    borderColor: '#555',
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    paddingBottom: 20,
    backgroundColor: '#ffffff50'
  },
  link: {
    color: 'teal',
    fontWeight: 'bold',
    fontSize: 20,
     alignSelf: 'flex-start',
  },
  actionLink: {
    marginBottom: 20
  },
  passageText: {
    fontSize: 20,
    color: '#000',
    alignSelf: 'flex-start',
    borderColor:'purple',
    borderWidth:1,
    marginBottom:20
  },
  paragraphStart: {
    borderWidth: 1,
    borderColor: 'green'
  },
  embeddedLink: {
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: 20
  },
  profileImage: {
    width:400,
    height:400,
    alignSelf: 'center',
    marginBottom: 20
  },
  genericImage: {
    height:600, width:200, alignSelf:'center'
  },
  choiceIcon: {
    width:75,
    height:75
  }
})

const mapStateToProps = (state: AppState): IStateProps => ({
  selectedPassage: state.story.selectedPassage,
  passages: state.story.passages,
  modNumber: state.story.selectedStory.moduleNumber
})

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>): IDispatchProps => bindActionCreators({ selectPassage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Passage)

