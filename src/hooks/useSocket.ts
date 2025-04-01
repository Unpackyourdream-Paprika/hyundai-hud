import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export interface StartFlagData {
  start: boolean;
  customerid: number;
}

export interface PageState {
  message: string;
  data: {
    drivingMode: number;
    drivingMap: number;
    simRacingMap: number;
    weather: number;
    time: number;
    traffic: number;
    carSelection: number;
    pageNum: number;
  };
}
export interface NavigationData {
  velocityData: VelocityData;
}

export interface VelocityData {
  velocity: number;
  // 속도
  angle: number;
  // 게임 앵글
  offsetX: number;
  // 게임 좌표 X
  offsetY: number;
  // 게임 좌표 Y
  gear: string;
  // 기어

  bActivate: boolean;
  // 서울 진입시 내비게이션 Ture , false  Boolean

  remainingDistanceToDest: number;
  // 최종 목적지 까지 남은 거리

  remainingDistanceToNextSpline: number;
  // 다음 스플라인까지 남은 거리

  splineName: string;
  // 현재 스플라인 이름

  nextSplineName: string;
  // 다음 스플라인 이름

  bEnableSpline: boolean;
  // 500m 전 알림

  distance500: number;
  // 500 전 거리

  direction500: string;
  // 500 전 방향

  // 500m 전 알림2
  bEnableNextSpline: boolean;
  // 다음 500전 알림

  distanceNext500: number;

  // 다음 500m 거리

  directionNext500: string;

  // 다음 500m 방향 string

  nextSplineDistance: number;

  // 다음 500m 거리 숫자

  torque: number;
  // 그래프용 토크

  rpm: number;
  // 그래프용 rpm

  hor: number;
  //  hor 핸들 잘 안잡고 있을때 알람  1,2,3,4 단계로 피그마 비상정지 체크
  hORLevel: number;

  eor: number;
  // eor
  eORLevel: number;

  dca: number;
  dCALevel: number;

  sound: number;

  acceleator: number;

  brake: number;

  carName: number;

  drivingDistance: number;

  drivingTime: number;

  idleTime: number;

  currentLimitSpeed: number;

  enableHDA: boolean;

  notifyDisableHDA: boolean;

  scc: boolean;

  sccSpeed: number;

  targetDistance: number;

  lfa: boolean;

  horLevel: number;

  eorLevel: number;
  moveLeft: boolean;
  moveRight: boolean;

  remainingDistanceToLimitSpeed: number;
  bNotifyLimitSpeed: boolean;
}

export interface LaneData {
  laneIndex: number; // 차선의 맵에서의 Index인데 당장은 사용 X
  vehicleData: VehicleData[]; // 현재 차선에서 달리고 있는 차량의 데이터들 (플레이어 제외)
}

export interface VehicleData {
  playerToDistance: number; // 플레이어와의 거리값, 차선은 상위에서 나뉘기 Axis 값 하나의 길이
  trafficVehicleTypeIndex: number;
}

export interface MDAQButtonData {
  trunLamp: string;
  warningButton: boolean;
  start: boolean;
  etc: string;
  customerId: number;
}

export interface AutoDriveData {
  status: boolean;
}

export interface StartingSettingData {
  weather: number;
  carSelection: number;
  time: number;
  start: boolean;
}

export default function useSocket(url: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  // const [speed, setSpeed] = useState<number>(0);

  const [CarSelectData, setCarSelectData] = useState<StartingSettingData>({
    weather: 0,
    carSelection: 0,
    time: 0,
    start: false,
  });

  // 1: 맑음
  // 2: 비
  // 3: 눈

  // 1: 낮
  // 2: 밤
  // 3: 저녁

  //  Car 1 = IONINC5
  //  Car 2 = Avante
  //  Car 3 = GV80

  const [navigationState, setNavigationState] = useState<NavigationData>({
    velocityData: {
      velocity: 0,
      angle: 0,
      offsetX: 0,
      offsetY: 0,
      gear: "P",
      bActivate: false,
      remainingDistanceToDest: 0,
      bEnableSpline: false, // 처음
      splineName: "", // 첫번째 네이밍
      direction500: "", // 처음
      distance500: 0, // 처음
      remainingDistanceToNextSpline: 0, // 처음
      nextSplineName: "", // 두번째 네이밍
      bEnableNextSpline: false, // 두번째
      directionNext500: "", // 두번째
      distanceNext500: 0, // 두번째
      nextSplineDistance: 0, // 두번째
      torque: 0,
      rpm: 0,
      hor: 0,
      hORLevel: 0,
      eor: 0,
      eORLevel: 0,
      dca: 0,
      dCALevel: 0,
      sound: 0,
      acceleator: 0,
      brake: 0,
      carName: 0,
      drivingDistance: 0,
      drivingTime: 0,
      idleTime: 0,
      currentLimitSpeed: 0,
      enableHDA: false,
      notifyDisableHDA: false,
      scc: false,
      sccSpeed: 0,
      targetDistance: 0,
      lfa: false,
      horLevel: 0,
      eorLevel: 0,
      moveLeft: false,
      moveRight: false,
      remainingDistanceToLimitSpeed: 100,
      bNotifyLimitSpeed: false,
    },
  });

  const [autoDrivingState, setAutoDrivingState] = useState<AutoDriveData>({
    status: false,
  });

  const [mdaqButtonState, setMdaqButtonState] = useState<MDAQButtonData>({
    trunLamp: "",
    warningButton: false,
    start: false,
    etc: "",
    customerId: 0,
  });

  const [startFlagState, setStartFlagState] = useState<StartFlagData>({
    start: true,
    customerid: 0,
  });

  // const []

  useEffect(() => {
    const socketInstance = io(url);
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to server in useSocket");
      socketInstance.emit("register", { clientType: "electron" });
    });

    socketInstance.on("NavigationData", (state: NavigationData) => {
      // console.log("NavigationData state received:", state);
      setNavigationState(state);
    });

    socketInstance.on("AutoDriveData", (state: AutoDriveData) => {
      // console.log("AutoDriveData state received:", state);
      setAutoDrivingState(state);
    });

    socketInstance.on("MDAQButtonData", (state: MDAQButtonData) => {
      // console.log("MDAQButtonData state received:", state);
      setMdaqButtonState(state);
    });

    socketInstance.on("StartFlag", (state: StartFlagData) => {
      // console.log("MDAQButtonData state received:", state);
      setStartFlagState(state);
    });

    socketInstance.on("VehicleData", (state: VehicleData) => {
      console.log("VehicleData state received:", state);
    });

    socketInstance.on("CarSelectData", (state: StartingSettingData) => {
      console.log("CarSelectData state received:", state);
      setCarSelectData(state);
    });

    // 연결 종료 처리
    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  return {
    socket,
    navigationState,
    autoDrivingState,
    mdaqButtonState,
    startFlagState,
    setNavigationState,
    setAutoDrivingState,
    setMdaqButtonState,
    setStartFlagState,
    CarSelectData,
    setCarSelectData,
  };
}
