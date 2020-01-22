import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

interface IPhoneProps {
  image: string,
  name: string,
  messages: any[]
}

const message1 = {
  text: 'Hey',
  isReceived: true
}

const message2 = {
  text: 'the quick brown dog jumped over the lazy fox. And som other stuff because this isnt that long I guess'
}
const messsages = [message1, message2]

const Phone = (props: any): JSX.Element => {
  return (
    <View style={styles.phoneOutline}>
      <View style={styles.utilBar}>
        <Icon name="chevron-left" size={20} color="#0176FD"/>
        <View style={styles.contact}>
          <Image source={require('../../assets/wacc-logo.png')} style={styles.profileImage}/>
          <Text style={styles.contactName}>{props.name || 'Dylan'} ></Text>
        </View>
        <View style={{width:20}}></View>
      </View>
      <ScrollView style={styles.screen}>
          {messsages.map((m:any, i: number): JSX.Element => <View style={[styles.text, m.isReceived ? styles.received : styles.sent]}>
                <Text>{m.text}</Text>
              </View>
          )}
      </ScrollView>
      <View style={styles.messageBar}>
        <View style={styles.enterText}></View>
        <Text style={styles.sendButton}>Send</Text>
      </View>
      <View style={styles.homeButton}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  phoneOutline: {
    width: 300,
    height: 600,
    backgroundColor: '#222',
    borderRadius: 32,
    paddingHorizontal: 10,
    paddingTop: 50,
    alignItems: 'center'
  },
  screen: {
    backgroundColor: '#fff',
    width: 280,
    height: 550,
    padding: 10
  },
  homeButton: {
    height:40,
    width:40,
    borderRadius:20,
    borderWidth:1,
    borderColor:'#999',
    marginTop: 10
  },
  utilBar: {
    height:65,
    width:280,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    backgroundColor: '#eee',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  profileImage: {
    height:40,
    width:40
  },
  contact: {
    width:100,
    alignItems: 'center',
    marginTop: -5
  },
  contactName: {
    fontSize: 12,
    color: '#333'
  },
  messageBar: {
    height:40,
    width:280,
    backgroundColor: '#DADAE2',
    flexDirection: 'row',
    padding:5,
    justifyContent: 'space-between'
  },
  enterText: {
    // width:200,
    flex:0.7,
    height:30,
    borderRadius:32,
    borderColor: '#C9C9D1',
    borderWidth: 1,
    backgroundColor: '#fff'
  },
  sendButton: {
    height:30,
    flex:0.25,
    borderRadius: 2,
    backgroundColor: '#B7B9C5',
    textAlign: 'center',
    lineHeight: 30
  },
  text: {
    backgroundColor: '#E5E4E9',
    maxWidth:0.7,
    minWidth:0.3,
    borderRadius:32,
    borderWidth: 1

  }
})
export default Phone
