import { useEffect, useState } from "react";
import { styled } from "styled-components";
import useSocket from "../../../hooks/useSocket";
import { resetAllStores } from "../../../stroe/useResetAllStore";
import TopVisionRoad from "./TopVisionRoad/TopVisionRoad";
import HudCarComponents from "../../HudCar/HudCarComponents";

const Main = () => {
  const {
    navigationState,
    startFlagState,
    setNavigationState,
    setAutoDrivingState,
    setMdaqButtonState,
    setStartFlagState,
    setCarSelectState,
  } = useSocket(
    // "http://192.168.10.101:4000"
    "http://192.168.0.39:4000"
  );

  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (startFlagState.start) {
      setStarting(true);
    } else {
      setNavigationState({
        velocityData: {
          velocity: 0,
          angle: 0,
          offsetX: 0,
          autoParkingState: 0,
          offsetY: 0,
          gear: "P",
          bActivate: false,
          remainingDistanceToDest: 0,
          bEnableSpline: false,
          splineName: "",
          remainingDistanceToNextSpline: 0,
          nextSplineName: "",
          bEnableNextSpline: false,
          nextSplineDistance: 0,
          torque: 0,
          rpm: 0,
          hor: 0,
          hORLevel: 0,
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
          sCCTargetActorSpeed: 0,
          lFA: false,
          moveLeft: false,
          moveRight: false,
          remainingDistanceToLimitSpeed: 0,
          bNotifyLimitSpeed: false,
          bTargetLaneIndexActive: false,
          targetLaneIndex: 0,
          bParkingZone: false,
          bTargetLaneActive: false,
          bReadyForChangeLane: false,
          bEnableChangeLaneToLeft: false,
          bEnableChangeLaneToRight: false,
        },
        playerLaneIndex: 2,
        detailPlayerLaneIndex: 0,
        lanes: [
          {
            laneIndex: 1,
            vehicleData: [],
          },
          {
            laneIndex: 2,
            vehicleData: [],
          },
          {
            laneIndex: 3,
            vehicleData: [],
          },
          {
            laneIndex: 4,
            vehicleData: [],
          },
          {
            laneIndex: 5,
            vehicleData: [],
          },
        ],
      });

      // Reset other states
      setAutoDrivingState({ status: false });
      setCarSelectState({
        weather: 1,
        time: 1,
        carSelection: 1,
        map: 1,
        start: false,
      });
      setStartFlagState({
        start: false,
        customerid: 0,
      });
      setMdaqButtonState({
        trunLamp: "",
        warningButton: false,
        start: false,
        etc: "",
        customerId: 0,
      });

      resetAllStores();
    }
  }, [startFlagState.start]); // 의존성 배열을 객체의 특정 속성으로 변경

  const normalizedDrivingState = navigationState?.velocityData;

  return (
    <div
      className={`w-full h-[100vh]  ${
        starting ? "bg-black " : "bg-zinc-800"
      } bg-opacity-20`}
    >
      <div
        className={`${
          starting ? "opacity-1" : "opacity-0"
        } w-full  h-full flex justify-center items-center transition-all duration-700`}
      >
        <div className="relative flex items-center w-full h-full text-white">
          {normalizedDrivingState?.bNotifyLimitSpeed && (
            <div className="absolute z-20 flex flex-col justify-center w-14 left-[52%] bottom-[120px]">
              <div className="flex items-center justify-center ">
                <img
                  src={"/left-electron/red-line.png"}
                  alt="bnotifyLimitspped"
                />
                <p className="absolute font-black text-[22px] font-genesisSansMedium">
                  {normalizedDrivingState?.currentLimitSpeed}
                </p>
              </div>
              <p className="text-center">
                {normalizedDrivingState?.remainingDistanceToLimitSpeed}m
              </p>
            </div>
          )}

          <TopVisionRoad navigationState={navigationState} />

          <LeftLineRoadDivider />

          {/* <img
            src={"/hud/hud_car2.png"}
            alt="car-image"
            className="absolute left-[50%] bottom-[50%]  transform -translate-x-1/2 -translate-y-1/2"
          /> */}
          <HudCarComponents navigationState={navigationState} />

          <img
            src={"/hud/hud-left3.png"}
            alt="left-red-line"
            className="absolute left-[15%] bottom-[40%]"
          />

          <RightLineRoadDivider />

          <img
            src={"/hud/hud-right3.png"}
            alt="right-red-line"
            className="absolute right-[15%] bottom-[40%]"
          />

          <div
            className={`absolute flex flex-col items-center bottom-[120px] ${
              normalizedDrivingState?.bNotifyLimitSpeed
                ? "left-[42%]"
                : "left-[46%]"
            }`}
          >
            <div className="text-[120px] font-bold">
              {normalizedDrivingState.velocity}
            </div>
            <div className="text-[48px] text-[#5D5D5D] font-bold ">km/h</div>
          </div>
          {normalizedDrivingState.enableHDA && (
            <div
              className={`absolute flex flex-col items-center bottom-[130px] ${
                normalizedDrivingState?.bNotifyLimitSpeed
                  ? "left-[26%]"
                  : "left-[32%]"
              }`}
            >
              <img src={"/left-electron/adcontrol.png"} alt="scc-img" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;

const LeftLineRoadDivider = styled.div`
  position: absolute;
  width: 16px;
  height: 70%;
  left: 20%;
  background: linear-gradient(
    to bottom,
    transparent,
    #858484 20%,
    #858484 80%,
    transparent
  );
  top: 20%;
  transform-style: preserve-3d;
  transform: rotate3d(1, -1, -1, -60deg);
`;

const RightLineRoadDivider = styled.div`
  position: absolute;
  width: 16px;
  height: 70%;
  top: 20%;
  right: 20%;
  background: linear-gradient(
    to bottom,
    transparent,
    #858484 20%,
    #858484 80%,
    transparent
  );
  transform-style: preserve-3d;
  transform: rotate3d(1, 1, 1, -60deg);
`;
