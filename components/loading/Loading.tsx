import { memo } from "react";
import css from "styled-jsx/css";

type Props = {
  width: number; // of entire container, in pixels
  boxes?: number; // total number of boxes (default: 3)
  timing?: number; // staggered timing between each box's pulse, in seconds (default: 0.1s)
};

const Loading = ({ width, boxes = 3, timing = 0.1 }: Props) => {
  // each box is just an empty div
  const divs = [];

  // box styles (extracted here so they're not defined for each individual box)
  const { className: boxClassName, styles: boxStyles } = css.resolve`
    div {
      display: inline-block;
      width: ${width / (boxes + 1)}px;
      height: 100%;
      animation: loading 1.5s infinite ease-in-out both;
      background-color: var(--medium-light);
    }

    @keyframes loading {
      0%,
      80%,
      100% {
        transform: scale(0);
      }
      40% {
        transform: scale(0.6);
      }
    }
  `;

  // allow a custom number of pulsing boxes (defaults to 3)
  for (let i = 0; i < boxes; i++) {
    // width of each box correlates with number of boxes (with a little padding)
    // each individual box's animation has a staggered start in corresponding order
    divs.push(
      <div key={i} className={boxClassName} style={{ animationDelay: `${i * timing}s` }}>
        {boxStyles}
      </div>
    );
  }

  return (
    <div>
      {divs}

      <style jsx>{`
        div {
          width: ${width}px;
          height: ${width / 2}px;
          display: inline-block;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default memo(Loading);
