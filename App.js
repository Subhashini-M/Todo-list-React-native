import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import useStore from './store';

export default function App() {
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const { todos, addTodo, removeTodo, editTodo } = useStore();

  const handleAddTodo = () => {
    if (text.length > 0) {
      if (isEditing) {
        editTodo(currentIndex, text);
        setIsEditing(false);
        setCurrentIndex(null);
      } else {
        addTodo({
          key: Math.random().toString(),
          text: text,
        });
      }
      setText('');
    }
  };

  const handleEditTodo = (index) => {
    setIsEditing(true);
    setCurrentIndex(index);
    setText(todos[index].text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new task you want to accomplish"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <Button title={isEditing ? "Edit task" : "Add task"} onPress={handleAddTodo} />
      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <View style={styles.todo}>
            <Text>{item.text}</Text>
            <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={() => handleEditTodo(index)} />
            <View style={{ marginLeft: 20 }}>
            <Button title="Completed" onPress={() => removeTodo(index)} />
          </View>
        </View>
      </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEC6CF', 
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  todo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  
});
