
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
const Screen1 = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bp, setBp] = useState('');
  const [sugar, setSugar] = useState('');
  const [patients, setPatients] = useState([]);
  const handleAddPatient = () => {
    if (!name || !contact || !age || !height || !weight || !bp || !sugar) {
      Alert.alert('Incomplete Details', 'Please fill in all the fields to add a patient.');
      return;
    }
    
    const newPatient = { name, contact, age, height, weight, bp, sugar };
    setPatients([...patients, newPatient]);
    // Reset fields
    setName('');
    setContact('');
    setAge('');
    setHeight('');
    setWeight('');
    setBp('');
    setSugar('');
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Add Patient Details</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={contact}
        onChangeText={setContact}
        placeholder="Contact"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Age"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={height}
        onChangeText={setHeight}
        placeholder="Height (cm)"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        placeholder="Weight (kg)"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={bp}
        onChangeText={setBp}
        placeholder="Blood Pressure"
      />
      <TextInput
        style={styles.input}
        value={sugar}
        onChangeText={setSugar}
        placeholder="Sugar Level"
        keyboardType="numeric"
      />
      <Button title="Add Patient" onPress={handleAddPatient} />
      <View style={styles.patientList}>
        <Text style={styles.listHeading}>Patient List</Text>
        {patients.map((patient, index) => (
          <View key={index} style={styles.patientItem}>
            <Text>Name: {patient.name}</Text>
            <Text>Contact: {patient.contact}</Text>
            <Text>Age: {patient.age}</Text>
            <Text>Height: {patient.height} cm</Text>
            <Text>Weight: {patient.weight} kg</Text>
            <Text>Blood Pressure: {patient.bp}</Text>
            <Text>Sugar Level: {patient.sugar}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  patientList: {
    marginTop: 20,
  },
  listHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  patientItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});
export default Screen1;
