import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, Keyboard } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task) {
      setTaskItems([...taskItems, { text: task, isChecked: false }]);
      setTask(''); 
    }
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].isChecked = !itemsCopy[index].isChecked; 
    setTaskItems(itemsCopy);
  };

  const deleteTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1); 
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      {/* Today's Tasks */}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>TO DO List</Text>
        <View style={styles.items}>
          {/* Task rendering */}
          {taskItems.map((item, index) => (
            <Task
              key={index}
              text={item.text}
              isChecked={item.isChecked}
              onCheck={() => completeTask(index)}
              onDelete={() => deleteTask(index)}
            />
          ))}
        </View>
      </View>

      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="What's on today? Write a task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
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
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    color: '#7EACB5', 
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginBottom: 20,
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
    backgroundColor: '#FFF4EA',
    borderRadius: 60,
    borderColor: '#3C3D37',
    borderWidth: 1,
    width: 250,
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#DEE5D4',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#3C3D37',
    borderWidth: 1,
  },
  addText: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
  },
});

