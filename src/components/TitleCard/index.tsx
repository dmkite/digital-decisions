import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity, Text, StyleSheet, Image, Modal } from 'react-native'
import { ITitleCardProps } from './TitleCard.props'

interface IImageMapper {
  [key: string]: JSX.Element
}

export default function TitleCard(props: ITitleCardProps): JSX.Element {
  const imageMapper: IImageMapper = {
    module2: <Image style={styles.icon} source={require('../../assets/wacc-logo.png')} />
  }

  const handlePress = () => {
    const {dispatch = () => {}} = props
    dispatch({type: 'open', payload: {selectedStory: props}})
  }

  return (
    <TouchableOpacity style={styles.titleCardWrapper} onPress={handlePress}>
      <LinearGradient colors={props.gradientValues} style={styles.titleCard} useAngle={true} angle={-45} angleCenter={{ x: 0.5, y: 0.5 }}>
        {imageMapper[`module${props.moduleNumber}`]}
      </LinearGradient>
      <Text style={styles.titleCardFont}>Module {props.moduleNumber}: {props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  titleCardWrapper: {
    marginBottom:50
  },
  titleCard: {
    width: 250,
    height: 250,
    borderRadius: 5,
  },
  titleCardFont: {
    fontSize: 18
  },
  icon: {
    height: 200,
    width: 200,
    margin: 25
  }
})
