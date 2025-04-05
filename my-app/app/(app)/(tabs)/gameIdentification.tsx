import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Camera from "@/app/(app)/components/camera";
import AudioRecorder from "@/app/(app)/components/audio";
import { identifyAudio } from "@/app/(app)/audioExpert/audioExpert";
import TextExpert from "@/app/(app)/textExpert/text";
import TextInput from "../components/text";
import TextInputer from "../components/text";
import { processImageWithGemini } from "@/app/services/geminiService";
import ImageExpert from "@/app/services/identification/experts/imageExpert";

interface IdentificationRecord {
  imageUri: string | null;
  audioUri: string | null;
  textData: string | null;
}

export default function GameIdentification() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("image");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [identificationRecord, setIdentificationRecord] =
    useState<IdentificationRecord>({
      imageUri: null,
      audioUri: null,
      textData: null,
    });
  const [finalResult, setFinalResult] = useState<string | null>(null);

  const handleCameraCapture = async (uri: string) => {
    if (uri) {
      let t: ImageExpert = new ImageExpert();
      console.log(await t.getResult(uri));
      setIdentificationRecord((prev) => ({
        ...prev,
        imageUri: uri,
      }));
      setShowAnalysis(false);
      console.log("Data----------");
      console.log(identificationRecord);
    } else {
      console.error("No URI provided to handleCameraCapture");
    }
  };

  const handleAudioCapture = (uri: string) => {
    if (uri) {
      setIdentificationRecord((prev) => ({
        ...prev,
        audioUri: uri,
      }));
      setShowAnalysis(false);
      console.log("Data----------");
      console.log(identifyAudio(uri));
      console.log(identificationRecord);
    } else {
      console.error("No URI provided to handleAudioCapture");
    }
  };

  const handleTextInput = (uri: string) => {
    if (uri) {
      setIdentificationRecord((prev) => ({
        ...prev,
        textData: uri,
      }));
      setShowAnalysis(false);
      console.log("Data----------");
      console.log(identificationRecord);
    } else {
      console.error("No URI provided to handleAudioCapture");
    }
  };

  const aggregateResults = () => {
    const hasResults = Object.values(identificationRecord).some(
      (result) => result !== null
    );
    if (!hasResults) {
      alert("Please analyze at least one input type before submitting");
      return;
    }
    let aggregatedResult = "";
    if (identificationRecord.imageUri)
      aggregatedResult += `Image Analysis: ${identificationRecord.imageUri}\n\n`;
    if (identificationRecord.textData)
      aggregatedResult += `Text Analysis: ${identificationRecord.textData}\n\n`;
    if (identificationRecord.audioUri)
      aggregatedResult += `Audio Analysis: ${identificationRecord.audioUri}\n\n`;
    setFinalResult(aggregatedResult);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Game Identification</Text>
      <View style={styles.mainContainer}>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.inputSection}>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, activeTab === "image" && styles.activeTab]}
                onPress={() => setActiveTab("image")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "image" && styles.activeTabText,
                  ]}
                >
                  Image
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === "text" && styles.activeTab]}
                onPress={() => setActiveTab("text")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "text" && styles.activeTabText,
                  ]}
                >
                  Text
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === "audio" && styles.activeTab]}
                onPress={() => setActiveTab("audio")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "audio" && styles.activeTabText,
                  ]}
                >
                  Audio
                </Text>
              </TouchableOpacity>
            </View>
            {activeTab === "image" && (
              <View style={styles.imageSection}>
                <Camera onCapture={handleCameraCapture} />
              </View>
            )}
            {activeTab === "text" && (
              <View style={styles.textSection}>
                <TextInputer onCapture={handleTextInput} />
              </View>
            )}
            {activeTab === "audio" && (
              <View style={styles.audioSection}>
                <AudioRecorder onCapture={handleAudioCapture} />
              </View>
            )}
          </View>
          {finalResult && (
            <View style={styles.resultSection}>
              <Text style={styles.resultSectionTitle}>Results</Text>
              <Text style={styles.resultText}>{finalResult}</Text>
            </View>
          )}
        </ScrollView>
        <View style={styles.submitButtonContainer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={aggregateResults}
          >
            <Text style={styles.submitButtonText}>
              Submit for Identification
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  mainContainer: {
    flex: 1,
    position: "relative",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
    paddingTop: 15,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: "center",
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "#1E90FF",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    color: "#fff",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
  },
  submitButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  submitButton: {
    backgroundColor: "#32CD32",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resultContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  resultText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  imageSection: {
    marginBottom: 20,
  },
  audioSection: {
    marginBottom: 20,
  },
  analyzeButton: {
    backgroundColor: "#1E90FF",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  analyzeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomPadding: {
    height: 80, // Adjust this value based on the submit button container height
  },
  inputSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionSeparator: {
    height: 8,
    backgroundColor: "#e1e4e8",
    marginVertical: 20,
    borderRadius: 4,
  },
  resultSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  resultSectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  // Audio expert styles
  audioExpertContainer: {
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
  },
  audioExpertTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  audioExpertSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  audioInstructionsText: {
    fontSize: 12,
    color: "#666",
    marginTop: 15,
    lineHeight: 18,
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
  },
});
