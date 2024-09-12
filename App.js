import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, Keyboard } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); 

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task) {
      setTaskItems([...taskItems, { text: task, isChecked: false }]);
      setTask(''); 
    }
  };

  const handleSaveTask = () => {
    Keyboard.dismiss();
    if (task && editIndex !== null) {
      let itemsCopy = [...taskItems];
      itemsCopy[editIndex].text = task;
      setTaskItems(itemsCopy);
      setTask('');
      setIsEditing(false);
      setEditIndex(null);
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

  const editTask = (index) => {
    setTask(taskItems[index].text);
    setIsEditing(true);
    setEditIndex(index);
  };

  const filteredTasks = taskItems.filter(item =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Today's Tasks */}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>TO DO List</Text>
        
        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.items}>
          {/* Task rendering */}
          {filteredTasks.map((item, index) => (
            <Task
              key={index}
              text={item.text}
              isChecked={item.isChecked}
              onCheck={() => completeTask(index)}
              onDelete={() => deleteTask(index)}
              onEdit={() => editTask(index)} 
            />
          ))}
        </View>
      </View>

      {/* Write or Edit a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={isEditing ? "Edit task" : "What's on today? Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        
        {/* Add Task Button */}
        {!isEditing && (
          <TouchableOpacity onPress={handleAddTask}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Save Task Button (for editing) */}
        {isEditing && (
          <TouchableOpacity onPress={handleSaveTask}>
            <View style={styles.saveWrapper}>
              <Text style={styles.addText}>✔</Text>
            </View>
          </TouchableOpacity>
        )}
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
  searchWrapper: {
    marginBottom: 20, 
  },
  searchInput: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF4EA',
    borderRadius: 10,
    borderColor: '#CDC2A5',
    borderWidth: 1,
    width: '80%',
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
  },
  items: {
    marginTop: 20,
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
    borderColor: '#CDC2A5',
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
    borderColor: '#CDC2A5',
    borderWidth: 1,
  },
  saveWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#DEE5D4',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#CDC2A5',
    borderWidth: 1,
  },
  addText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
  },
});
