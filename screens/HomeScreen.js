
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@todos');
      if (jsonValue !== null) {
        setTodos(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.error('Failed to fetch todos from AsyncStorage');
    }
  };
  const saveTodos = async (updatedTodos) => {
    try {
      await AsyncStorage.setItem('@todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Failed to save todos to AsyncStorage');
    }
  };
  const handleAddTask = (newTaskTitle) => {
    const hasTaskWithThisName = todos.some(task => task.title === newTaskTitle);
    if (hasTaskWithThisName) {
      Alert.alert(
        "Task already exists",
        "You cannot add a task with the same name"
      );
    } else {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
      };
      setTodos([...todos, newTask]);
      saveTodos([...todos, newTask]);
      setText('');
    }
  };
  const handleToggleTaskDone = (id) => {
    const newTodos = todos.map(task => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTodos(newTodos);
    saveTodos(newTodos);
  };
  const handleRemoveTask = (id) => {
    const newTodos = todos.filter(task => task.id !== id);
    setTodos(newTodos);
    saveTodos(newTodos);
  };
  const handleUpdateTaskName = (id, newTaskName) => {
    const newTodos = todos.map(task => {
      if (task.id === id) {
        return { ...task, title: newTaskName };
      }
      return task;
    });
    setTodos(newTodos);
    saveTodos(newTodos);
  };
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={item.done ? styles.completedTask : styles.task}>{item.title}</Text>
      <TouchableOpacity onPress={() => handleToggleTaskDone(item.id)} style={styles.button}>
        <Text style={styles.buttonText}>{item.done ? 'Undo' : 'Done'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRemoveTask(item.id)} style={[styles.button, styles.deleteButton]}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="Enter a task"
        placeholderTextColor="#ccc"
      />
      <TouchableOpacity onPress={() => handleAddTask(text)} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Screen1')} style={[styles.navigationButton, styles.screen1Button]}>
        <Text style={styles.navigationButtonText}>Go to Screen 1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Screen2')} style={[styles.navigationButton, styles.screen2Button]}>
        <Text style={styles.navigationButtonText}>Go to Screen 2</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#4682B4',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  task: {
    fontSize: 16,
    color: '#000',
  },
  completedTask: {
    fontSize: 16,
    color: '#ccc',
    textDecorationLine: 'line-through',
  },
  button: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#4682B4',
  },
  deleteButton: {
    backgroundColor: '#ff6347',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  navigationButton: {
    backgroundColor: '#4682B4',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  navigationButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  screen1Button: {
    backgroundColor: '#32CD32',
  },
  screen2Button: {
    backgroundColor: '#FF4500',
  },
});
export default HomeScreen;
