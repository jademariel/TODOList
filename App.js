import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, Keyboard } from 'react-native';
import Task from './components/Task';


export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
    
  }
  const completeTask = (index) => {
    let ItemsCopy = [...taskItems];
    ItemsCopy.splice(index, 1);
    setTaskItems(ItemsCopy);


  }
  return (
    <View style={styles.container}>

  {/* Today's Tasks */ } 
    <View style={ styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Hello, TO DO List</Text>

        <View style={styles.items}>
          {/* This is where the tasks will go*/}
          {
            taskItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                 <Task  text={item}/>
              </TouchableOpacity>
            )
           
            })
          }
          {/*<Task  text={'Task 1'}/>
          <Task  text={'Task 2'}/> */}
   
        </View>

    </View>
    {/*write a task*/}
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.writeTaskWrapper}
    >
      <TextInput style={styles.input} placeholder={'write a task'} value={task} onChangeText={text => setTask(text)} />

      <TouchableOpacity onPress={() => handleAddTask()}>
        <View style={styles.addWrapper}>
        <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EFEC',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 35,  // Adjust this value to change the size of the text
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#DEE5D4',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#DEE5D4',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#DEE5D4',
    borderWidth: 1,
  },
  addText: {},
});
