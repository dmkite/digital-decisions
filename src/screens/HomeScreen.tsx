import React, { useReducer, useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import TitleCard from '../components/TitleCard'
import { ITitleCardProps } from '../components/TitleCard/TitleCard.props';
import SelectionModal from '../components/SelectionModal/'
import { NavigationStackProp } from 'react-navigation-stack';
import modules from '../stories'
import Icon from 'react-native-vector-icons/FontAwesome';
import {cronjob} from '../utils/cronJob'
import Header from '../components/Header'
import Snackbar from '../components/Snackbar'

interface IState {
  selectedStory: null | ITitleCardProps
}

export interface IAction {
  type: string
  payload?: IState
}

const initialState: IState = { selectedStory: null };

const reducer = (state: IState = initialState, action: IAction): IState => {
  switch (action.type) {
    case 'open':
      return action.payload || { selectedStory: null }
    case 'close':
      return initialState
    default:
      return initialState
  }
}
const stories: ITitleCardProps[] = Object.keys(modules).reduce((acc: ITitleCardProps[], modName: any): ITitleCardProps[] => {
  const { title, moduleNumber, gradientValues, description } = modules[modName]
  if (!title || !moduleNumber || !gradientValues || !gradientValues.length || !description) {
    return acc
  }
  return [...acc, { title, moduleNumber, gradientValues, description }]
}, [])

export interface INavigationProps {
  navigation: NavigationStackProp<string>
}


const HomeScreen = (props: INavigationProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isUploading, changeUpload] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [severity, setSeverity] = useState<"ERROR" | "SUCCESS" | null>(null)
  
  const handleUpload = async () => {
    changeUpload(true)

    const response = await cronjob()
    if (response.toUpperCase().includes('SUCCESS')) {
      setSeverity("SUCCESS")
    } else if (response.toUpperCase().includes('WRONG')) {
      setSeverity('ERROR')
    }
    changeUpload(false)
    setMessage(response)
    setTimeout(() => setMessage(null), 5000)
  }

  return (
    <>
      <LinearGradient colors={['#bbb', '#fff']} style={styles.linearGradient} useAngle={true} angle={-45} angleCenter={{ x: 0.5, y: 0.5 }}>
        <Header/>
        {isUploading ? <View style={styles.screen}><ActivityIndicator size="large" color="teal" /></View> : null}
        {message ? <Snackbar message={message} severity={severity}/> : null} 
        <ScrollView contentContainerStyle={styles.main}>
          {stories.map((story: any, i: number): JSX.Element => <TitleCard dispatch={dispatch} key={i} {...story} />)}

          <TouchableOpacity onPress={() => props.navigation.navigate('Form')}>
            <LinearGradient colors={['#393633', '#999693']} style={styles.titleCard} useAngle={true} angle={-45} angleCenter={{ x: 0.5, y: 0.5 }}>
              <Icon style={{ lineHeight: 250, alignSelf: 'center' }} name="th-list" size={200} color="white" />
            </LinearGradient>
            <Text style={styles.titleCardFont}>Form</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleUpload}>
            <LinearGradient colors={['#393633', '#999693']} style={styles.titleCard} useAngle={true} angle={-45} angleCenter={{ x: 0.5, y: 0.5 }}>
              <Icon style={{ lineHeight: 250, alignSelf: 'center' }} name="cloud-upload" size={200} color="white" />
            </LinearGradient>
            <Text style={styles.titleCardFont}>Upload form responses</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
      {state.selectedStory && <SelectionModal description={state.selectedStory.description} title={state.selectedStory.title} dispatch={dispatch} navigation={props.navigation} />
      }
    </>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
    flexWrap: 'wrap',
    padding: 20
  },
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
  },
  banner: {
    flex: 1,
    borderBottomWidth: 3,
    borderColor: '#2277bc',
    position: 'absolute',
    top: 130,
    left: 0,
    right: 0,
    padding: 20,
    fontSize: 18,
    zIndex: 10,
    backgroundColor: '#55aaef',
    color: 'white'
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00000050',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: '50%'
  },
});

export default HomeScreen
