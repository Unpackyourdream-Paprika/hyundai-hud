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
      <img src="/hud/hud_car2.png" alt="car-image" className="scale-[70%]" />

      {/* 차량 상태 표시 UI (선택사항) */}
      {normalizedDrivingState?.enableHDA && (
        <div
          className="absolute -bottom-[40%] left-[50%] transform -translate-x-1/2"
          style={{ perspective: "1000px" }}
        >
          <div
            className="w-[200px] h-[300px] "
            style={{
              background:
                "radial-gradient(ellipse at center top, rgba(99, 180, 250, 0.1) 0%, rgba(0, 136, 255, 0.3) 60%, rgba(0, 136, 255, 0) 100%)",
              boxShadow: "0 0 20px rgba(0, 136, 255, 0.3)",
              transform: "rotateX(70deg) translateY(400px)",
              transformOrigin: "center top",
            }}
          ></div>
          <div className="w-[200px] h-[78px] scale-[200%] absolute -translate-y-[8px]  opacity-15 overflow-hidden">
            <img
              src="/hud/hud_car2.png"
              alt="car-image"
              className="w-[200px] h-[200px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HudCarComponents;
