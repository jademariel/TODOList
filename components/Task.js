import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = (props) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleLongPress = () => {
    setShowOptions(true); 
  };

  const handleDelete = () => {
    props.onDelete();
    setShowOptions(false);
  };

  const handleEdit = () => {
    props.onEdit();
    setShowOptions(false);
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
        {showOptions && (
          <View style={styles.options}>
            <TouchableOpacity onPress={handleEdit}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
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
    width: 30,
    height: 30,
    backgroundColor: '#FFFFFF',
    opacity: 0.4,
    borderRadius: 5,
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
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    color: '#3B82F6',
    marginRight: 10,
    fontWeight: 'bold',
  },
  deleteButton: {
    color: '#C7253E',
    fontWeight: 'bold',
  },
});

export default Task;
