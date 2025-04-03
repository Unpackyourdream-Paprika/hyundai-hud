import React from "react";
import { NavigationData } from "../../../../hooks/useSocket";

interface TopVisionRoadProps {
  navigationState: NavigationData;
}

export default function TopVisionRoad({ navigationState }: TopVisionRoadProps) {
  console.log(
    navigationState?.velocityData.bEnableSpline,
    " ??navigationState?.velocityData.bEnableSpline"
  );

  const firstNavigation = {
    isVisible: navigationState?.velocityData.bEnableSpline || false,
    name: navigationState?.velocityData.splineName || "",
    remainingDistance:
      navigationState?.velocityData.remainingDistanceToNextSpline || 0,
  };

  const secondNavigation = {
    isVisible: navigationState?.velocityData.bEnableNextSpline || false,
    name: navigationState?.velocityData.nextSplineName || "",
    remainingDistance: navigationState?.velocityData.nextSplineDistance || 0,
  };

  return (
    <div className="flex flex-row gap-[60px] items-start w-full h-full p-[200px]  justify-center">
      {firstNavigation.isVisible && (
        <div className="h-[120px]   text-white  flex items-center px-3">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center justify-center">
              <img
                className="w-[64px] h-[64px]"
                src={
                  firstNavigation.name ===
                  "염곡IC에서 '양재대로, 서울추모공원' 방면으로 오른쪽 방향"
                    ? "/marker/arrow-slight-right.png"
                    : firstNavigation.name === "'양재IC' 방면으로 우회전"
                    ? "/marker/arrow-right.png"
                    : firstNavigation.name ===
                      "양재IC에서 '한남대교, 서초IC' 방면으로 오른쪽 고속도로 진입"
                    ? "/marker/road-in.png"
                    : firstNavigation.name ===
                      "양재IC에서 '한남대교, 서초IC' 방면으로 오른쪽 방향"
                    ? "/marker/arrow-slight-right.png"
                    : firstNavigation.name ===
                      "한남IC에서 '올림픽대로(김포공항)' 방면으로 오른쪽 고속도로 출구"
                    ? "/marker/road-out.png"
                    : firstNavigation.name ===
                      "'반포한강공원' 방면으로 오른쪽 도시고속도로 출구"
                    ? "/marker/road-out.png"
                    : "/marker/arrow-right.png"
                }
                alt="direction"
              />
            </div>
            <div className="flex flex-row">
              <p className="text-[26px] font-medium">
                {firstNavigation.remainingDistance >= 1000
                  ? `${(firstNavigation.remainingDistance / 1000).toFixed(
                      1
                    )} km`
                  : `${firstNavigation.remainingDistance} m`}
              </p>
              <p className="text-[26px] truncate max-w-[230px]">
                {firstNavigation.name}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* {firstNavigation.isVisible && (
        <div className="h-[120px]   text-white  flex items-center px-3">
          <div className="flex gap-2">
            <div className="flex items-center justify-center">
              <img
                className="w-[64px] h-[64px]"
                src="/marker/destination-img.png"
                alt="destination"
              />
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
