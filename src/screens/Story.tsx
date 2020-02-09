import React, { useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { AppState } from '../store'
import LinearGradient from 'react-native-linear-gradient'
import Passage from '../components/Passage'
import Icon from 'react-native-vector-icons/FontAwesome'
import { goToLastPassage, IAction } from '../actions/story'
import { bindActionCreators, Dispatch, Action } from 'redux'

const Story = (props: any) => {
  const { selectedStory: { gradientValues = ['#ff0000', '#00ff00'] } } = props

  const handleBackPress = (): null | IAction => {
    console.log('firing')
    return props.passageHistory.length
      ? props.goToLastPassage()
      : null
  }

  return (
    <>
      <LinearGradient colors={gradientValues} style={styles.background} useAngle={true} angle={-45} angleCenter={{ x: 0.5, y: 0.5 }}>
        <ImageBackground source={require('../assets/module2-texture.png')} style={styles.imageTexture} >
          <View style={styles.row}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
              <View style={{ borderWidth: 1 }}>
                <Icon name='undo' size={30} color={props.passageHistory.length ? '#555' : '#55555550'} />
              </View>
            </TouchableOpacity>
            
            <View style={styles.passageHolder}>
              <Passage />
            </View>
          </View>
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
    flexDirection: 'row',
    flex: 1
  },
  backButton: {
    width: "10%",
    height: 100,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#555',
    backgroundColor: '#ffffff50',
    marginTop: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passageHolder: {
    width: '85%',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around'
  }
})

interface IStateProps {
  selectedStory: string
  passageHistory: string[]
  selectedPassage: string
}

const mapStateToProps = (state: AppState): IStateProps => ({ selectedStory: state.story.selectedStory, passageHistory: state.story.passageHistory, selectedPassage: state.story.selectedPassage })

interface IDispatchProps {
  goToLastPassage: () => void
}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>): IDispatchProps => bindActionCreators({ goToLastPassage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Story)
