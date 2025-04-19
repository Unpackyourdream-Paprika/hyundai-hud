import { create } from "zustand";


interface PlayAudioStore {

  playing: boolean;
  currentTime: number;
  sound: number;
  repeat: boolean;
  turnNum: number;
  audioType: string;

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

  setPlaying: (playing) => set({ playing: playing }),
  setCurrentTime: (currentTime) => set({ currentTime: currentTime }),
  setTurnNum: (turnNum) => set({ turnNum: turnNum }),
  setAudioType: (type) => set({ audioType: type }),
  setSound: (sound) => set({ sound: sound }),

  resetPlayAudioStore: () =>
    set({

      playing: false,
      currentTime: 0,
      sound: 0,
      repeat: false,
      turnNum: 0,
      audioType: "",
    }),
}));
