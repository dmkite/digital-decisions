import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity, Text, StyleSheet, Image, Modal } from 'react-native'
import { ITitleCardProps } from './TitleCard.props'

interface IImageMapper {
  [key: string]: JSX.Element
}

export default function TitleCard(props: ITitleCardProps): JSX.Element {
  // const [modalIsOpen, changeModalStatus] = useState<boolean>(false)
  const imageMapper: IImageMapper = {
    module2: <Image style={styles.icon} source={require('../../assets/wacc-logo.png')} />
  }

  const handlePress = () => {
    const {dispatch = () => {}} = props
    dispatch({type: 'open', selectedStory: props})
  }
  return (
    <TouchableOpacity onPress={handlePress}>
      <LinearGradient colors={props.gradientValues} style={styles.titleCard} useAngle={true} angle={-45} angleCenter={{ x: 0.5, y: 0.5 }}>
        {imageMapper[`module${props.moduleNumber}`]}
      </LinearGradient>
      <Text style={styles.titleCardFont}>Module {props.moduleNumber}: {props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  titleCard: {
    width: 250,
    height: 250,
    borderRadius: 5
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