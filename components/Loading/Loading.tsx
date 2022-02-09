import { memo } from "react";
import classNames from "classnames";

import styles from "./Loading.module.css";

type LoadingProps = {
  width: number; // of entire container, in pixels
  boxes?: number; // total number of boxes (default: 3)
  timing?: number; // staggered timing between each box's pulse, in seconds (default: 0.1s)
  className?: string;
};

const Loading = ({ width, boxes = 3, timing = 0.1, className }: LoadingProps) => {
  // each box is just an empty div
  const divs = [];

  // allow a custom number of pulsing boxes (defaults to 3)
  for (let i = 0; i < boxes; i++) {
    // width of each box correlates with number of boxes (with a little padding)
    // each individual box's animation has a staggered start in corresponding order
    divs.push(
      <div
        key={i}
        className={styles.box}
        style={{
          width: `${width / (boxes + 1)}px`,
          animationDelay: `${i * timing}s`,
        }}
      />
    );
  }

  return (
    <div
      className={classNames(styles.wrapper, className)}
      style={{
        width: `${width}px`,
        height: `${width / 2}px`,
      }}
    >
      {divs}
    </div>
  );
};

export default memo(Loading);
