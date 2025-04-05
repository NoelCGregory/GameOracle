import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

interface CameraProps {
  onCapture: (uri: string) => void;
}

export default function Camera({ onCapture }: CameraProps) {
  console.log(
    "Camera component rendered with onCapture type:",
    typeof onCapture
  );
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const [isSubmitVisible, setIsSubmitVisible] = useState(false);

  useEffect(() => {
    const getPermission = async () => {
      try {
        const permissionResult = await requestPermission();
        console.log("Camera permission result:", permissionResult);
        if (!permissionResult.granted) {
          console.log("Camera permission was denied");
        }
      } catch (error) {
        console.error("Error requesting camera permission:", error);
      }
    };

    getPermission();
  }, []);

  useEffect(() => {
    console.log("Camera component mounted with onCapture:", typeof onCapture);
    if (typeof onCapture !== "function") {
      console.error(
        "Camera component received invalid onCapture prop:",
        onCapture
      );
    }
  }, [onCapture]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      console.log("Taking picture");
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);

      let imageUri: string | null = null;

      if (photo.uri && photo.uri.startsWith("file://")) {
        imageUri = photo.uri;
      } else if (photo.uri && photo.uri.startsWith("data:")) {
        imageUri = photo.uri;
      } else if (photo.base64) {
        imageUri = `data:image/jpeg;base64,${photo.base64}`;
      } else {
        console.error("Unexpected photo format:", photo);
        return;
      }
      console.log("=============================");
      console.log(imageUri);
      setCapturedImage(imageUri);
      onCapture(imageUri);
    } catch (error) {
      console.error("Error taking picture:", error);
    }
  };

  const retakePicture = () => {
    setCapturedImage(null);
  };

  return (
    <View style={styles.container}>
      {!capturedImage ? (
        <CameraView style={styles.camera} ref={cameraRef} facing={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Take Pic</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Toggle Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View style={styles.captureContainer}>
          <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
          <TouchableOpacity style={styles.retakeButton} onPress={retakePicture}>
            <Text style={styles.retakeText}>Take Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    overflow: "hidden",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
    margin: 0,
  },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginHorizontal: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  captureContainer: {
    flex: 1,
    position: "relative",
  },
  capturedImage: {
    flex: 1,
    borderRadius: 15,
  },
  retakeButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  retakeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
