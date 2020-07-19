import React from "react";
import { reactive } from "../../helpers/reactive";
import { useStores } from "../../hooks/useStores";

const StatsComponent: React.FC = () => {
  const {
    baseStore: {
      gameStore: { userLivesRemaining },
    },
  } = useStores();

  return <div>{userLivesRemaining}</div>;
};

export const Stats = reactive(StatsComponent);
