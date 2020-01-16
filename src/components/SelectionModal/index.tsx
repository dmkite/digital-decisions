import React from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import ISelectionModalProps from './SelectionModal.props'

const SelectionModal = (props: ISelectionModalProps): JSX.Element => {
  const { dispatch = () => { }, title, description } = props
  
  const handleRejectPress = () => {
    dispatch({type: 'close'})
  }

  const handleSuccessPress = () => {
    dispatch({type: 'close'})
    props.navigation.navigate('Story')
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={!!props.title}
      onRequestClose={(): void => dispatch({ type: 'close' })} >
      <TouchableWithoutFeedback onPress={handleRejectPress}> 
      <View style={styles.blur} >

        <View style={styles.modal}>
          <Text style={[styles.whiteText, styles.titleText]}>{title}</Text>
          <Text style={[styles.whiteText, styles.descText]}>{description}</Text>
          <View style={styles.buttonBlock}>
            <TouchableOpacity style={styles.button} onPress={handleRejectPress}>
              <Text style={styles.whiteText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleSuccessPress}>
              <Text style={styles.whiteText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      </TouchableWithoutFeedback>
    </Modal>
  )
}
const styles = StyleSheet.create({
  modal: {
    width: 350,
    backgroundColor: '#403535',
    padding: 20,
    borderRadius: 5
  },
  buttonBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  blur: {
    flex: 1,
    backgroundColor: '#00000099',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 20,
    paddingVertical: 10
  },
  titleText: {
    fontSize: 18,
    marginBottom: 10
  },
  descText: {
    lineHeight:20,
    marginBottom: 20
  },
  whiteText: {
    color: '#fff',
  }
})
export default SelectionModal
