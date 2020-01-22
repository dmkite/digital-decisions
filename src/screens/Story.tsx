import React, { useState } from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { AppState } from '../store'
import LinearGradient from 'react-native-linear-gradient'
import Passage from '../components/Passage'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import {goToLastPassage, IAction} from '../actions/story'
import { bindActionCreators, Dispatch } from 'redux'

const Story = (props: any) => {
  const { selectedStory: {
    gradientValues = ['#ff0000', '#00ff00'],
    title = 'default',
    moduleNumber = 0 } } = props
  // <LinearGradient colors={gradientValues} style={styles.background} useAngle={true} angle={-45} angleCenter={{ x: 0.5, y: 0.5 }}>
  // </LinearGradient>

  const handleBackPress = (): null | IAction => {
    return props.storyHistory.length
      ? props.goToLastPassage()
      : null
  }

  return (
    <>
      <LinearGradient colors={gradientValues} style={styles.background} useAngle={true} angle={-45} angleCenter={{ x: 0.5, y: 0.5 }}>
        <ImageBackground source={require('../assets/module2-texture.png')} style={styles.imageTexture} >
          <View style={styles.backButton}>
            <TouchableWithoutFeedback onPress={handleBackPress}>
              <Icon name='undo' size={30} color={props.storyHistory.length ? '#555' : '#55555550'}/>
            </TouchableWithoutFeedback>
          </View>
          <Passage
            {...props.selectedStory.passages[props.selectedPassage]}/>
        </ImageBackground>
      </LinearGradient>
    </>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  imageTexture: {
    height: '100%',
    flexDirection: 'row'
  },
  backButton: {
    width: 50,
    height: 100,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#555',
    backgroundColor: '#ffffff50',
    margin:20,
    justifyContent:'center',
    alignItems: 'center'
  },
  passageBody: {
    flex: 1,
    flexDirection: 'row'
  }
})

const mapStateToProps = (state: AppState) => ({ selectedStory: state.story.selectedStory, storyHistory: state.story.storyHistory, selectedPassage: state.story.selectedPassage })

const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators({goToLastPassage}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Story)
