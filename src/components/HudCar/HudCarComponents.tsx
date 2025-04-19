import { NavigationData } from "../../hooks/useSocket";
import styled from "styled-components";
import { hudCarImage } from "../../types/public/images";

interface HudCarProps {
  navigationState: NavigationData;
}

const CAR_IMAGE = "/hud/hud_car2.png";

const GradientEffect = styled.div<{ height: number }>`
  width: 200px;
  height: ${(props) => props.height}px;
  background: radial-gradient(
    ellipse at center top,
    rgba(99, 180, 250, 0.1) 0%,
    rgba(0, 136, 255, 0.3) 60%,
    rgba(0, 136, 255, 0) 100%
  );
  box-shadow: 0 0 20px rgba(0, 136, 255, 0.3);
  transform: rotateX(70deg) translateY(400px);
  transform-origin: center top;
  transition: height 0.3s ease-in-out; // 부드러운 높이 변화
`;

const HudCarComponents = ({ navigationState }: HudCarProps) => {
  const normalizedDrivingState = navigationState?.velocityData;
  const MyCarLaneIndex = navigationState?.playerLaneIndex;

  // 현재 차선의 앞차 거리 계산
  // 현재 차선의 앞차 거리 계산
  const currentLane = navigationState.lanes.find(
    (lane) => lane.laneIndex === MyCarLaneIndex
  );
  const frontVehicles =
    currentLane?.vehicleData.filter(
      (vehicle) => vehicle.playerToDistance > 0
    ) || [];
  const closestFrontDistance = frontVehicles.length
    ? Math.min(...frontVehicles.map((v) => v.playerToDistance))
    : null;

  // 스케일과 높이 계산
  const calculateScale = (distance: number | null) => {
    if (!distance) return 0; // 앞차 없으면 숨김

    if (distance <= 4) {
      // 0~4: 100%~70% (가까울수록 크고, 조금 작아짐)
      return 100 - (distance / 4) * 30; // 0 -> 100%, 4 -> 70%
    } else if (distance <= 10) {
      // 4~10: 70%~40% (점진적으로 작아짐)
      return 70 - ((distance - 4) / 6) * 30; // 4 -> 70%, 10 -> 40%
    } else if (distance <= 30) {
      // 10~30: 40%~20% (멀어질수록 더 작아짐)
      return 40 - ((distance - 10) / 20) * 20; // 10 -> 40%, 30 -> 20%
    } else {
      // 30 이상: 20% 고정 (너무 멀면 최소 크기)
      return 20;
    }
  };

  const calculateGradientHeight = (distance: number | null) => {
    if (!distance) return 200; // 기본값
    if (distance <= 4) return 100 + (distance / 4) * 50; // 0~4: 50px~100px
    if (distance <= 10) return 200 + ((distance - 4) / 6) * 100; // 4~10: 100px~200px
    return 300; // 10 이상: 200px (멀면 길게 유지)
  };

  const scale = calculateScale(closestFrontDistance);
  const gradientHeight = calculateGradientHeight(closestFrontDistance);

  if (process.env.NODE_ENV === "development") {
    console.log(MyCarLaneIndex, "내차 라인 ");
    console.log(navigationState.lanes, "여기 뭔대 ");
  }

  return (
    <div className="absolute left-[50%] bottom-[40%] transform -translate-x-1/2 -translate-y-1/2">
      {scale > 0 && (
        <img
          src={hudCarImage}
          alt="car-image"
          className={`transition-transform duration-300`}
          style={{ transform: `scale(${scale / 100})` }} // 부드러운 스케일 변화
        />
      )}

      {normalizedDrivingState?.enableHDA && (
        <>
          <div
            className="absolute -bottom-[20%] left-[50%] transform -translate-x-1/2"
            style={{ perspective: "1000px" }}
          >
            <GradientEffect height={gradientHeight} />
          </div>
          <div className="w-[200px] h-[78px] scale-[200%] absolute left-[50%] -bottom-[60%] -translate-x-1/2 -translate-y-[8px] opacity-15 overflow-hidden">
            <img
              src="/hud/hud_car2.png"
              alt="car-image"
              className="w-[200px] h-[200px]"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HudCarComponents;
