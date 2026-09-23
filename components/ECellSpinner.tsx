"use client";

type ECellSpinnerProps = {
  animated?: boolean;
  className?: string;
  label?: string;
  progress?: number;
};

const markPaths = [
  "M0 51.8V26C0 11.65 11.65 0 26 0h74v18.8c0 3.98-3.22 7.2-7.2 7.2H32.1C18.3 26 6.2 35.8 0 51.8Z",
  "M31.5 38.3H83.7v18.2c0 4.1-3.3 7.4-7.4 7.4H32a6.2 6.2 0 0 0 0 12.4h60.6c4.1 0 7.4 3.3 7.4 7.4V100H31.5C14.1 100 0 85.9 0 68.5v-1.2c0-16 11.5-29 31.5-29Z",
];

export default function ECellSpinner({
  animated = true,
  className = "",
  label = "Loading",
  progress = 1,
}: ECellSpinnerProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  return (
    <div
      aria-label={label}
      className={`inline-flex items-center justify-center ${className}`}
      role={animated ? "status" : "img"}
    >
      <svg
        aria-hidden="true"
        className="h-full w-full overflow-visible"
        fill="none"
        viewBox="-4 -4 108 108"
      >
        {/* Ghost background outline */}
        <g
          className="e-cell-trace-ghost"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          {markPaths.map((path) => (
            <path d={path} key={path} />
          ))}
        </g>

        {/* Animated laser trace */}
        <g
          className={animated ? "e-cell-trace" : ""}
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.8"
        >
          {markPaths.map((path, index) => (
            <path
              className={animated ? `e-cell-trace-path-${index + 1}` : ""}
              d={path}
              key={path}
              pathLength="1"
              style={
                animated
                  ? undefined
                  : {
                    strokeDasharray: 1,
                    strokeDashoffset: 1 - clampedProgress,
                  }
              }
            />
          ))}
        </g>
      </svg>
      {animated && <span className="sr-only">{label}</span>}
    </div>
  );
}
