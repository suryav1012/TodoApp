import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';

const Screen2 = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [appointmentDetails, setAppointmentDetails] = useState('');
  const [appointments, setAppointments] = useState([]);

  // Callback function to handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
  };

  // Function to schedule an appointment
  const scheduleAppointment = () => {
    if (selectedDate && appointmentDetails) {
      setAppointments([...appointments, { date: selectedDate, details: appointmentDetails }]);
      // Clear selected date and appointment details
      setSelectedDate('');
      setAppointmentDetails('');
    }
  };

  return (
    <View style={styles.container}>
      <Calendar onDayPress={handleDateSelect} />
      {selectedDate ? (
        <View style={styles.appointmentContainer}>
          <Text style={styles.heading}>Upcoming Appointment</Text>
          <Text>{`Date: ${selectedDate}`}</Text>
          {/* Display appointment details if available */}
          {appointments.map((appointment, index) => {
            if (appointment.date === selectedDate) {
              return (
                <View key={index}>
                  <Text style={styles.label}>Appointment Details:</Text>
                  <Text>{appointment.details}</Text>
                </View>
              );
            }
          })}
          {/* Allow user to edit appointment details */}
          <TextInput
            style={styles.input}
            placeholder="Enter appointment details"
            value={appointmentDetails}
            onChangeText={(text) => setAppointmentDetails(text)}
          />
        </View>
      ) : null}
      <View style={styles.buttonContainer}>
        <Button title="Schedule Appointment" onPress={scheduleAppointment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default Screen2;
