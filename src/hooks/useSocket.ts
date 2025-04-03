import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export interface StartFlagData {
  start: boolean;
  customerid: number;
}

export interface CarSelectData {
  weather: number;
  time: number;
  carSelection: number;
  map: number;
  start: boolean;
}

export interface NavigationData {
  velocityData: VelocityData;
  playerLaneIndex: number;
  detailPlayerLaneIndex: number;
  lanes: LaneData[];
}

export interface DrivingModeData {
  drivingMode: string;
}

export interface VelocityData {
  velocity: number;
  // 속도
  angle: number;
  // 게임 앵글

  autoParkingState: number;

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

  // 500m 전 알림2
  bEnableNextSpline: boolean;
  // 다음 500전 알림

  // 다음 500m 방향 string

  nextSplineDistance: number;

  // 다음 500m 거리 숫자

  torque: number;
  // 그래프용 토크

  rpm: number;
  // 그래프용 rpm

  hor: number;
  bHighwayForHOR: boolean;
  //  hor 핸들 잘 안잡고 있을때 알람  1,2,3,4 단계로 피그마 비상정지 체크
  hORLevel: number;

  eor: number;
  // eor
  eORLevel: number;

  dca: number; // 경고 AEB (DCA 레벨)
  dCALevel: number; // 경고 AEB (DCA 레벨)

  sound: number; // -> 그래프 데이터

  acceleator: number; // -> 그래프 데이터

  brake: number; // 언리얼 구조체에는 없음

  carName: number; // -> 그래프 데이터

  drivingDistance: number; // -> 그래프 데이터

  drivingTime: number; // -> 그래프 데이터

  idleTime: number; // -> 그래프 데이터

  currentLimitSpeed: number; // 현재 제한속도

  enableHDA: boolean; // enableHDA Active

  notifyDisableHDA: boolean; // HDA 끝나는 지점에 도착하기 전에 알려줌

  sCC: boolean; // SCC 활성화 여부
  bTargetLaneActive: boolean; // bTargetLaneActive 차간거리 액티브
  sCCTargetActorSpeed: number; // SCC 상태일 때 제한 속도

  targetLaneIndex: number; // 차간 거리 단계 인덱스 0 ~ 4

  lFA: boolean; // LFA 활성화 여부

  moveLeft: boolean; // 좌회전 깜빡이, HDA4 에서 함께 켜지면 Active 발동
  moveRight: boolean; // 우회전 깜빡이, HDA4 에서 함께 켜지면 Active 발동

  bTargetLaneIndexActive: boolean; // 차간거리 모달 전용 Active
  bParkingZone: boolean; // 주차구역 Active 뷰  주차장 진입 여부
  remainingDistanceToLimitSpeed: number; // 제한속도 남은거리
  bNotifyLimitSpeed: boolean; // 단속카메라 단속 카메라 (현재 위치가 단속 카메라 구간인지)
  bReadyForChangeLane: boolean;
  bEnableChangeLaneToLeft: boolean;
  bEnableChangeLaneToRight: boolean;
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
}

export interface ParkingButtonEvent {
  activeButtonParking: number;
}

export default function useSocket(url: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  // const [speed, setSpeed] = useState<number>(0);

  const [carSelectState, setCarSelectState] = useState<CarSelectData>({
    weather: 1,
    time: 1,
    carSelection: 1,
    map: 1,
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
      autoParkingState: 0,
      offsetY: 0,
      gear: "P",
      bActivate: false,
      remainingDistanceToDest: 0,
      bEnableSpline: false, // 처음
      splineName: "", // 첫번째 네이밍
      remainingDistanceToNextSpline: 0, // 처음
      nextSplineName: "", // 두번째 네이밍
      bEnableNextSpline: false, // 두번째
      nextSplineDistance: 0, // 두번째
      torque: 0,
      rpm: 0,
      hor: 0,
      hORLevel: 0,
      // 손 놓고 있을때가 true ,
      bHighwayForHOR: false,
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
      sCC: false,
      sCCTargetActorSpeed: 110,
      lFA: false,
      moveLeft: false,
      moveRight: false,
      remainingDistanceToLimitSpeed: 100,
      bNotifyLimitSpeed: false,
      targetLaneIndex: 0,
      bTargetLaneActive: false,
      bTargetLaneIndexActive: false,
      bParkingZone: false,
      bReadyForChangeLane: false,
      bEnableChangeLaneToLeft: false,
      bEnableChangeLaneToRight: false,
    },
    playerLaneIndex: 2,
    detailPlayerLaneIndex: 0,
    // lanes: [],
    // max distance 60 < 이상 이면 차 안보임 지금
    lanes: [
      {
        laneIndex: 1,
        vehicleData: [],
      },
      {
        laneIndex: 2,
        vehicleData: [
          // { playerToDistance: -3.5 },
          { playerToDistance: 4, trafficVehicleTypeIndex: 1 },
          // { playerToDistance: 6.2 },
        ],
      },
      {
        laneIndex: 3,
        vehicleData: [
          { playerToDistance: 0, trafficVehicleTypeIndex: 1 },
          // { playerToDistance: -10.9 },
          // { playerToDistance: -15.4 },
          // { playerToDistance: -12.3 },
        ],
      },
      {
        laneIndex: 4,
        vehicleData: [
          // { playerToDistance: 6.2 }
        ],
      },
      {
        laneIndex: 5,
        vehicleData: [
          // { playerToDistance: 6.9 }, { playerToDistance: 8.5 }
        ],
      },
      {
        laneIndex: 6,
        vehicleData: [
          // { playerToDistance: 6.9 }, { playerToDistance: 8.5 }
        ],
      },
      {
        laneIndex: 7,
        vehicleData: [
          // { playerToDistance: 6.9 }, { playerToDistance: 8.5 }
        ],
      },
    ],
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
    start: false,
    customerid: 0,
  });

  // SCANNER = 'SCANeR',
  // N_WORLD = 'N World',
  // TWIN_WORLD = 'Twin World',
  // SIM_WORLD = 'Sim World',
  // REPLAY = 'Replay',
  const [drivingModeState, setDrivingModeState] = useState<DrivingModeData>({
    drivingMode: "SCANeR",
  });

  // activeButtonParking : boolean;
  const sendActiveParkingData = <T>(eventName: string, data: T) => {
    if (socket) {
      socket.emit(eventName, data);
      console.log(`Sending ${eventName}:`, data);
    } else {
      console.warn("Socket not connected. Cannot send data.");
    }
  };

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
      console.log("StartFlag state received:", state);
      setStartFlagState(state);
    });

    socketInstance.on("VehicleData", (state: VehicleData) => {
      console.log("VehicleData state received:", state);
    });

    socketInstance.on("CarSelectData", (state: CarSelectData) => {
      console.log("CarSelectData state received:", state);
      // console.log(state, "state?");
      setCarSelectState(state);
    });

    socketInstance.on("DrivingMode", (state: DrivingModeData) => {
      console.log("DrivingMode state received:", state);
      setDrivingModeState(state);
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
    carSelectState,
    drivingModeState,
    setNavigationState,
    setAutoDrivingState,
    setMdaqButtonState,
    setStartFlagState,
    setCarSelectState,
    setDrivingModeState,
    sendActiveParkingData,
  };
}
