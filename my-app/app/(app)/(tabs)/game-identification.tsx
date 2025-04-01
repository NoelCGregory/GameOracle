import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImageExpert from '../../image-expert';
import Camera from '@/app/(app)/(tabs)/camera';
// Import other experts when they're created
// import TextExpert from './text-expert';
// import AudioExpert from './audio-expert';

interface Results {
  image: string | null;
  text: string | null;
  audio: string | null;
}

export default function GameIdentification() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('image');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [results, setResults] = useState<Results>({
    image: null,
    text: null,
    audio: null,
  });
  const [finalResult, setFinalResult] = useState<string | null>(null);

  // Handle results from individual experts
  const handleExpertResult = useCallback((result: { type: keyof Results; data: string; }) => {
    console.log("handleExpertResult called with:", result);
    setResults(prev => ({
      ...prev,
      [result.type]: result.data
    }));
    // Hide the analysis component after receiving result
    setShowAnalysis(false);
  }, []);
  
  // Handle camera capture
  const handleCameraCapture = useCallback((uri: string) => {
    console.log("handleCameraCapture called with URI:", uri);
    if (uri) {
      handleExpertResult({
        type: 'image',
        data: uri
      });
      // Reset analysis state when new image is captured
      setShowAnalysis(false);
    } else {
      console.error("No URI provided to handleCameraCapture");
    }
  }, [handleExpertResult]);

  // Aggregate results using blackboard architecture
  const aggregateResults = () => {
    // Check if we have at least one result
    const hasResults = Object.values(results).some(result => result !== null);
    
    if (!hasResults) {
      alert('Please analyze at least one input type before submitting');
      return;
    }
    
    let aggregatedResult = "";
    
    if (results.image) {
      // Only show the analysis result if we have one
      if (!results.image.startsWith('data:image')) {
        aggregatedResult += results.image + "\n\n";
      } else if (!showAnalysis) {
        // If we have an image but haven't analyzed it yet
        aggregatedResult = "Please click 'Analyze Image' to process the captured image.";
      }
    }
    
    if (results.text) {
      aggregatedResult += results.text + "\n\n";
    }
    
    if (results.audio) {
      aggregatedResult += results.audio + "\n\n";
    }
    
    setFinalResult(aggregatedResult);
  };

  // Add this useEffect for debugging
  useEffect(() => {
    console.log("Camera component with handleCameraCapture type:", typeof handleCameraCapture);
  }, [handleCameraCapture]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Game Identification</Text>
      
      <View style={styles.mainContainer}>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.inputSection}>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'image' && styles.activeTab]}
                onPress={() => setActiveTab('image')}
              >
                <Text style={[styles.tabText, activeTab === 'image' && styles.activeTabText]}>Image</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.tab, activeTab === 'text' && styles.activeTab]}
                onPress={() => setActiveTab('text')}
              >
                <Text style={[styles.tabText, activeTab === 'text' && styles.activeTabText]}>Text</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.tab, activeTab === 'audio' && styles.activeTab]}
                onPress={() => setActiveTab('audio')}
              >
                <Text style={[styles.tabText, activeTab === 'audio' && styles.activeTabText]}>Audio</Text>
              </TouchableOpacity>
            </View>
            
            {activeTab === 'image' && (
              <View style={styles.imageSection}>
                <Camera onCapture={handleCameraCapture} />
                {results.image && (
                  <>
                    <TouchableOpacity
                      style={styles.analyzeButton}
                      onPress={() => {
                        if (results.image) {
                          setResults(prev => ({
                            ...prev,
                            image: results.image
                          }));
                          setShowAnalysis(true);
                        }
                      }}
                    >
                      <Text style={styles.analyzeButtonText}>
                        {!showAnalysis ? 'Analyze Image' : 'Analyze Again'}
                      </Text>
                    </TouchableOpacity>
                    {showAnalysis && (
                      <ImageExpert 
                        onResultReceived={handleExpertResult} 
                        imageUri={results.image} 
                      />
                    )}
                  </>
                )}
              </View>
            )}
            
            {activeTab === 'text' && (
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>Text Expert Coming Soon</Text>
              </View>
            )}
            
            {activeTab === 'audio' && (
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>Audio Expert Coming Soon</Text>
              </View>
            )}
          </View>

          {finalResult && (
            <>
              <View style={styles.sectionSeparator} />
              <View style={styles.resultSection}>
                <Text style={styles.resultSectionTitle}>Results</Text>
                <View style={styles.resultContainer}>
                  <Text style={styles.resultTitle}>Game Identification Result</Text>
                  <Text style={styles.resultText}>{finalResult}</Text>
                </View>
              </View>
            </>
          )}
          
          <View style={styles.bottomPadding} />
        </ScrollView>

        <View style={styles.submitButtonContainer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={aggregateResults}
          >
            <Text style={styles.submitButtonText}>Submit for Identification</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
    paddingTop: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f8f9fa',
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
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#1E90FF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  submitButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  submitButton: {
    backgroundColor: '#32CD32',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
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
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    padding: 15,
    backgroundColor: '#fff',
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
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  resultText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  imageSection: {
    marginBottom: 20,
  },
  analyzeButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
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
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 80, // Adjust this value based on the submit button container height
  },
  inputSection: {
    backgroundColor: '#fff',
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
    backgroundColor: '#e1e4e8',
    marginVertical: 20,
    borderRadius: 4,
  },
  resultSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  resultSectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
}); 