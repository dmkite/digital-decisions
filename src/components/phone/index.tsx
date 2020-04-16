import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

interface IText {
  text: string
  isReceived: boolean
}

interface IPhoneProps {
  image: string,
  name: string,
  messages: IText[]
}

const Phone = (props: IPhoneProps): JSX.Element => {
  return (
    <View style={styles.centerContainer}>
      <View style={styles.phoneOutline}>
        <View style={styles.utilBar}>
          <Icon name="chevron-left" size={20} color="#0176FD" />
          <View style={styles.contact}>
            <Text style={styles.profileLetter}>{props.name[0]}</Text>
            <Text style={styles.contactName}>{props.name} ></Text>
          </View>
          <View style={{ width: 20 }}></View>
        </View>
        <ScrollView style={styles.screen}>
          {props.messages.map((m: IText, i: number): JSX.Element => <Text key={i} style={[styles.text, m.isReceived ? styles.received : null]}>{m.content}</Text>)}
        </ScrollView>
        <View style={styles.messageBar}>
          <View style={styles.enterText}></View>
          <Text style={styles.sendButton}>Send</Text>
        </View>
        <View style={styles.homeButton}></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centerContainer: {
    alignItems: 'center'
  },
  phoneOutline: {
    width: 300,
    height: 600,
    backgroundColor: '#222',
    borderRadius: 32,
    paddingHorizontal: 10,
    paddingTop: 50,
    alignItems: 'center',
    marginBottom:20
  },
  screen: {
    backgroundColor: '#fff',
    width: 280,
    height: 550,
    padding: 10,
    
  },
  homeButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#999',
    marginTop: 10
  },
  utilBar: {
    height: 65,
    width: 280,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    backgroundColor: '#eee',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  profileLetter: {
    backgroundColor: 'gray',
    fontSize:36,
    lineHeight:40,
    height:40,
    width:40,
    textAlign: 'center',
    borderRadius: 20,
    padding:0,
    color:'white'
  },
  contact: {
    width: 100,
    alignItems: 'center',
    marginTop: -5
  },
  contactName: {
    fontSize: 12,
    color: '#333'
  },
  messageBar: {
    height: 40,
    width: 280,
    backgroundColor: '#DADAE2',
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between'
  },
  enterText: {
    flex: 0.7,
    height: 30,
    borderRadius: 32,
    borderColor: '#C9C9D1',
    borderWidth: 1,
    backgroundColor: '#fff'
  },
  sendButton: {
    height: 30,
    flex: 0.25,
    borderRadius: 2,
    backgroundColor: '#B7B9C5',
    textAlign: 'center',
    lineHeight: 30
  },
  text: {
    backgroundColor: '#E5E4E9',
    borderRadius: 22,
    maxWidth: '70%',
    alignSelf: 'flex-start',
    padding: 10,
    paddingHorizontal: 15,
    color: 'black',
    marginBottom: 10
  },
  received: {
    backgroundColor: '#0680FE',
    color: '#fff',
    alignSelf: 'flex-end',
  }
})

export default Phone
