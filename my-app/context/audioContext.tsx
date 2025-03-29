import React, { createContext, useContext, useState } from "react";

// Context type
interface AudioContextType {
  audioUri: string | null;
  setAudioUri: (uri: string | null) => void;
}

// default value undefined
const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Provider component
export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [audioUri, setAudioUri] = useState<string | null>(null);

  return (
    <AudioContext.Provider value={{ audioUri, setAudioUri }}>
      {children}
    </AudioContext.Provider>
  );
};

// hook to use the context
export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};