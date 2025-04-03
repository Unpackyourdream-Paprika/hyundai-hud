import { useEffect, useState } from "react";
import { styled } from "styled-components";
import useSocket from "../../../hooks/useSocket";
import { resetAllStores } from "../../../stroe/useResetAllStore";
import TopVisionRoad from "./TopVisionRoad/TopVisionRoad";

const Main = () => {
  const {
    navigationState,

    startFlagState,
    setNavigationState,
    setAutoDrivingState,
    setMdaqButtonState,
    setStartFlagState,
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
          offsetY: 0,
          gear: "P",
          bActivate: false,
          remainingDistanceToDest: 0,
          bEnableSpline: false,
          splineName: "",
          direction500: "",
          distance500: 0,
          remainingDistanceToNextSpline: 0,
          nextSplineName: "",
          bEnableNextSpline: false,
          directionNext500: "",
          distanceNext500: 0,
          nextSplineDistance: 0,
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
          remainingDistanceToLimitSpeed: 0,
          bNotifyLimitSpeed: false,
        },
      });

      // Reset auto driving state
      setAutoDrivingState({
        status: false,
      });

      setStartFlagState({
        start: false,
        customerid: 0,
      });

      // Reset MDAQ button state
      setMdaqButtonState({
        trunLamp: "",
        warningButton: false,
        start: false,
        etc: "",
        customerId: 0,
      });

      resetAllStores();
    }
  }, [startFlagState]);

  const normalizedDrivingState = navigationState?.velocityData;

  return (
    <div
      className={`w-full h-[100vh]  ${
        starting ? "bg-[#A6A6A6]" : "bg-zinc-800"
      }`}
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

          <img src={"/hud/hud-left.png"} alt="left-red-line" />

          <RightLineRoadDivider />

          <img src={"/hud/hud-right.png"} alt="right-red-line" />

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
