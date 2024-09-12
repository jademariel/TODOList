import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = (props) => {
  const [showDelete, setShowDelete] = useState(false);

  const handleLongPress = () => {
    // Show the delete button when long-pressed
    setShowDelete(true);
  };

  const handleDelete = () => {
    // Trigger the delete function and hide the delete button
    props.onDelete();
    setShowDelete(false);
  };

  return (
    <TouchableOpacity onPress={props.onCheck} onLongPress={handleLongPress}>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.rectangle}>
            {props.isChecked ? <Text style={styles.checkMark}>✔</Text> : null}
          </View>
          <Text style={[styles.itemText, props.isChecked && styles.checkedText]}>
            {props.text}
          </Text>
        </View>
        {showDelete && (
          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#F7EFE5',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rectangle: {
    width: 30, // Adjust width as needed
    height: 30, // Adjust height as needed
    backgroundColor: '#FFFFFF',  // Changed to white
    opacity: 0.4,
    borderRadius: 5, // Slightly rounded corners
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    color: '#FF0000',  
    fontSize: 18,
  },
  itemText: {
    maxWidth: '80%',
  },
  checkedText: {
    color: '#C96868',
  },
  deleteButton: {
    color: '#C7253E',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
});

export default Task;
