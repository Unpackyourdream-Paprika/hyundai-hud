import { NavigationData } from "../../hooks/useSocket";

interface HudCarProps {
  navigationState: NavigationData;
}

const HudCarComponents = ({ navigationState }: HudCarProps) => {
  const normalizedDrivingState = navigationState?.velocityData;

  const MyCarLaneIndex = navigationState?.playerLaneIndex;

  console.log(MyCarLaneIndex, "내차 라인 ");

  console.log(navigationState.lanes, "여기 뭔대 ");

  // 차량 회전 각도 계산 (navigationState의 angle 값 사용)
  //   const rotation = normalizedDrivingState?.angle || 0;

  return (
    <div className="absolute left-[50%] bottom-[40%] transform -translate-x-1/2 -translate-y-1/2">
      <img src="/hud/hud_car2.png" alt="car-image" className="scale-[100%]" />

      {/* 차량 상태 표시 UI (선택사항) */}
      {normalizedDrivingState?.enableHDA && (
        <div className="absolute -bottom-[50%] left-[50%] transform -translate-x-1/2 bg-blue-500 "></div>
      )}
    </div>
  );
};

export default HudCarComponents;
