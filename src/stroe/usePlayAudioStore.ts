import { create } from "zustand";
import { SpotifyTypeData } from "../constant/SpotifyData";

interface PlayAudioStore {
  audioDetail: SpotifyTypeData | null;
  playing: boolean;
  currentTime: number;
  sound: number;
  repeat: boolean;
  turnNum: number;
  audioType: string;
  setAudioDetail: (audioDetail: SpotifyTypeData | null) => void;
  setPlaying: (playing: boolean) => void;
  setCurrentTime: (currentTime: number) => void;
  setTurnNum: (turnNum: number) => void;
  setAudioType: (type: string) => void;
  setSound: (sound: number) => void;
  resetPlayAudioStore: () => void;
}

export const usePlayAudioStore = create<PlayAudioStore>((set) => ({
  audioDetail: null,
  playing: false,
  currentTime: 0,
  sound: 0.6,
  repeat: false,
  turnNum: 0,
  audioType: "",
  setAudioDetail: (audioDetail) => set({ audioDetail: audioDetail }),
  setPlaying: (playing) => set({ playing: playing }),
  setCurrentTime: (currentTime) => set({ currentTime: currentTime }),
  setTurnNum: (turnNum) => set({ turnNum: turnNum }),
  setAudioType: (type) => set({ audioType: type }),
  setSound: (sound) => set({ sound: sound }),

  resetPlayAudioStore: () =>
    set({
      audioDetail: null,
      playing: false,
      currentTime: 0,
      sound: 0,
      repeat: false,
      turnNum: 0,
      audioType: "",
    }),
}));
