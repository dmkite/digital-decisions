import React, { useState } from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { AppState } from '../store'
import LinearGradient from 'react-native-linear-gradient'
import Passage from '../components/Passage'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import {goToLastPassage, IAction} from '../actions/story'
import { bindActionCreators, Dispatch, Action } from 'redux'

const Story = (props: any) => {
  const { selectedStory: {
    gradientValues = ['#ff0000', '#00ff00'],
    title = 'default',
    moduleNumber = 0 } } = props

  const handleBackPress = (): null | IAction => {
    return props.passageHistory.length
      ? props.goToLastPassage()
      : null
  }

  return (
    <>
      <LinearGradient colors={gradientValues} style={styles.background} useAngle={true} angle={-45} angleCenter={{ x: 0.5, y: 0.5 }}>
        <ImageBackground source={require('../assets/module2-texture.png')} style={styles.imageTexture} >
          <View style={styles.backButton}>
            <TouchableWithoutFeedback style={{borderWidth: 1}}onPress={handleBackPress}>
              <Icon name='undo' size={30} color={props.passageHistory.length ? '#555' : '#55555550'}/>
            </TouchableWithoutFeedback>
          </View>
          <Passage />
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

interface IStateProps {
  selectedStory: string | null
  passageHistory: string[]
  selectedPassage: string
}

const mapStateToProps = (state: AppState): IStateProps => ({ selectedStory: state.story.selectedStory, passageHistory: state.story.passageHistory, selectedPassage: state.story.selectedPassage })

interface IDispatchProps {
  goToLastPassage: () => void
}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>): IDispatchProps => bindActionCreators({goToLastPassage}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Story)
