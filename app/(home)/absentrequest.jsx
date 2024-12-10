import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  Platform, 
  TextInput, 
  Keyboard, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback 
} from 'react-native';
import { useRouter } from "expo-router";
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AbsentRequest() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [reason, setReason] = useState('');
  const [success, setSuccess] = useState(false);

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  const confirmDate = () => {
    setDate(tempDate);
    setShowPicker(false);
  };

  const handleApply = () => {
    console.log(`Date: ${date.toLocaleDateString()}`);
    console.log(`Reason: ${reason}`);
    setSuccess(true);
  };

  if (success) {
    return (
      <View style={[styles.successContainer, { backgroundColor: "white"}]}>
        <Text style={styles.resultText}>Successfully Applied!</Text>
        <View style={styles.checkMarkContainer}>
          <Feather name="check" size={100} color="white" />
        </View>
        <TouchableOpacity 
          onPress={() => router.push("/(home)")} 
          style={styles.homeButton}
        >
          <View style={styles.homeIconContainer}>
            <Icon name="home" size={70} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Icon name="arrow-left" size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Absent Request</Text>
          </View>

          <View style={styles.dateContainer}>
            <Text style={styles.dateTitle}>Choose Date</Text>
            <TouchableOpacity onPress={toggleDatepicker} style={styles.dateInput}>
              <Text style={styles.dateInputText}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <Text style={styles.titleDescription}>Description</Text>
            <TextInput
              style={styles.reasonInput}
              placeholder="Enter reason for absence"
              value={reason}
              onChangeText={setReason}
              multiline={true}
            />
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>

            {Platform.OS === 'ios' && (
              <Modal transparent={true} animationType="slide" visible={showPicker}>
                <View style={styles.modalContainer}>
                  <View style={styles.pickerContainer}>
                    <DateTimePicker
                      mode="date"
                      display="spinner"
                      value={tempDate}
                      onChange={onChange}
                      textColor="black"
                    />
                    <TouchableOpacity onPress={confirmDate} style={styles.doneButton}>
                      <Text style={styles.doneButtonText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            )}

            {Platform.OS === 'android' && showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setDate(selectedDate);
                  }
                  setShowPicker(false);
                }}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#3399fe',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleDescription: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
  },
  dateContainer: {
    flex: 1,
    padding: 20,
  },
  dateTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  dateInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dateInputText: {
    color: 'black',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  doneButton: {
    backgroundColor: '#3399fe',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reasonInput: {
    height: 200,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: 'top',
    color: 'black',
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#3399fe',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    color: 'black',
    fontSize: 30,
    marginBottom: 100,
    textAlign: 'center',
  },
  checkMarkContainer: {
    backgroundColor: '#3399fe',
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    color: 'white',
    fontSize: 70,
  },
  homeIconContainer: {
    marginTop: 100,
    backgroundColor: '#3399fe',
    width: 90,
    height: 90,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
