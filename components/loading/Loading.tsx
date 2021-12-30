type Props = {
  boxes?: number;
  timing?: number;
  width: number;
};

export default function Loading({ boxes = 3, timing = 0.1, width }: Props) {
  // each box is just an empty div
  const divs = [];

  // allow a custom number of pulsing boxes (defaults to 3)
  for (let i = 0; i < boxes; i++) {
    // width of each box correlates with number of boxes (with a little padding)
    // each individual box's animation has a staggered start in corresponding order
    divs.push(
      <div key={i}>
        <style jsx>{`
          div {
            display: inline-block;
            width: ${width / (boxes + 1)}px;
            height: 100%;
            animation: loading 1.5s infinite ease-in-out both;
            animation-delay: ${i * timing}s;
            background-color: var(--medium-light);
          }

          /* modified from https://tobiasahlin.com/spinkit/ */
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
        `}</style>
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
}
