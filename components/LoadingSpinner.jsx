import * as React from "react";

const LoadingSpinner = (props) => (
  <div className=" inset-0 relative   flex items-center justify-center">
    <div className="h-24 w-24 absolute top-[20rem] ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        xmlSpace="preserve"
        {...props}
      >
        <circle
          fill="hsl(220, 98%, 61%)"
          stroke="#fff"
          strokeWidth={6}
          strokeMiterlimit={15}
          strokeDasharray="14.2472,14.2472"
          cx={50}
          cy={50}
          r={47}
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="5s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          fill="none"
          stroke="#fff"
          strokeMiterlimit={10}
          strokeDasharray="10,10"
          cx={50}
          cy={50}
          r={39}
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="5s"
            from="0 50 50"
            to="-360 50 50"
            repeatCount="indefinite"
          />
        </circle>
        <g fill="#fff">
          <path d="M30 35h5v30h-5z">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite"
              begin={0.1}
            />
          </path>
          <path d="M40 35h5v30h-5z">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite"
              begin={0.2}
            />
          </path>
          <path d="M50 35h5v30h-5z">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite"
              begin={0.3}
            />
          </path>
          <path d="M60 35h5v30h-5z">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite"
              begin={0.4}
            />
          </path>
          <path d="M70 35h5v30h-5z">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite"
              begin={0.5}
            />
          </path>
        </g>
      </svg>
    </div>
  </div>
);

export default LoadingSpinner;
