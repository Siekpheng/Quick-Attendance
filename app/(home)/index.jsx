import { StyleSheet, Text, View, ScrollView, Pressable, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const index = () => {
    const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          padding: 10,
          zIndex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require('./QA2_logo.png')}
            style={{ width: 60, height: 60 }}
          />
          <Text style={{ fontSize: 16, fontWeight: "600", marginLeft: 10 }}>
            Quick-Attendance
          </Text>
        </View>
      </View>

      <ScrollView style={{ marginTop: 80 }}>
        <LinearGradient
          colors={["#3399fe", "#FFFFFF"]}
          style={{ flex: 1 }}
        >
          <View style={{ padding: 12 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <Image
                source={require('./QA2_logo.png')}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  marginRight: 20,
                }}
              />
              <View>
                <Text style={{ fontSize: 22, fontWeight: "600", color: "white" }}>Meng Siekpheng</Text>
                <Text style={{ fontSize: 15, color: "white" }}>Robotic And Automation Engineering</Text>
                <Text style={{ fontSize: 15, color: "white" }}>Year: 4, Class: B</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <Pressable
                onPress={() => router.push("/(home)/registerattendance")}
                style={{
                  backgroundColor: "white",
                  padding: 30,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "48%",
                }}
              >
                <Ionicons name="ios-people-sharp" size={28} color="black" />
                <Text style={{ marginTop: 10, fontWeight: "600", fontSize: 16, textAlign: "center" }}>
                  Register Attendance
                </Text>
              </Pressable>

              <Pressable
                style={{
                  backgroundColor: "white",
                  padding: 30,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "48%",
                }}
              >
                <Ionicons name="newspaper-outline" size={28} color="black" />
                <Text style={{ marginTop: 10, fontWeight: "600", fontSize: 16, textAlign: "center" }}>
                  Attendance Summary
                </Text>
              </Pressable>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <Pressable
                style={{
                  backgroundColor: "white",
                  padding: 30,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "48%",
                }}
              >
                <Ionicons name="calendar-outline" size={28} color="black" />
                <Text style={{ marginTop: 10, fontWeight: "600", fontSize: 16, textAlign: "center" }}>
                  Calendar
                </Text>
              </Pressable>

              <Pressable
                style={{
                  backgroundColor: "white",
                  padding: 30,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "48%",
                }}
              >
                <Ionicons name="ios-document-text-outline" size={28} color="black" />
                <Text style={{ marginTop: 10, fontWeight: "600", fontSize: 16, textAlign: "center" }}>
                  Absent Request
                </Text>
              </Pressable>
            </View>

            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 20 }}>
              Your Schedule
            </Text>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});