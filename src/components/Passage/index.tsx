import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native'
import IPassageProps, { IDispatchProps, IStateProps } from './passage.props'
import { selectPassage } from '../../actions/story'
import { bindActionCreators, Dispatch, Action } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../../store'
import { IJSXContent, IStoryState } from '../../IRedux'
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
        return <Phone name={passage.content.name} messages={passage.content.messages}/>
      case 'link':
      case 'link:action':
        return <TouchableWithoutFeedback onPress={() => handlePress(passage.linksTo)} key={i}><Text style={[styles.link, passage.JSXType === 'link:action' ? styles.actionLink : null]}>
          {passage.content}
        </Text>
        </TouchableWithoutFeedback>
      case 'link:embedded':
        console.log(passage)
        return <Text key={i} style={styles.embeddedLink}>
          {passage.content.map(generateJSX)}
        </Text>
      case 'image':
        console.log(passage.content)
        console.log(imageMapper[passage.content])
        return passage.linksTo
          ? <TouchableWithoutFeedback onPress={() => handlePress(passage.linksTo)} key={i}>
            <Image style={{height: 50, width: 50}} source={imageMapper[passage.content]}/>
          </TouchableWithoutFeedback>
          : <Image style={{height: 50, width: 50}} source={imageMapper[passage.content]}/>
      default:
        console.log('}}}}}}}}}}}}}}}}}}}}}}}}}')
        console.log('}}}}}}}}}}}}}}}}}}}}}}}}}')
        console.log(passage)
        console.log('}}}}}}}}}}}}}}}}}}}}}}}}}')
        console.log('}}}}}}}}}}}}}}}}}}}}}}}}}')
        return <Text key={i}>Did not account for {passage.JSXType}</Text>
    }
  }

  return (
    <View style={styles.outerBorder}>
      <View style={styles.passageContent}>
        {props.passages[props.selectedPassage].content.map(generateJSX)}
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
    height: 500,
    padding: 10,
    flex: 1
  },
  link: {
    color: 'teal',
    fontWeight: 'bold',
    fontSize: 20,
     alignSelf: 'flex-start',
     borderWidth: 1
  },
  actionLink: {
    marginTop: 20
  },
  passageText: {
    fontSize: 20,
    color: '#000',
    borderWidth:1,
    alignSelf: 'flex-start'
  },
  paragraphStart: {
    marginTop: 10
  },
  embeddedLink: {
    borderWidth: 1,
    borderColor: 'red'
  }
})

const mapStateToProps = (state: AppState): IStateProps => ({
  selectedPassage: state.story.selectedPassage,
  passages: state.story.passages
})

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>): IDispatchProps => bindActionCreators({ selectPassage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Passage)

