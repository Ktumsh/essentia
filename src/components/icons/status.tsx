import type { IconSvgProps } from "@/lib/types";

const EyeIcon = ({ id, ...props }: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9.75 12a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2 12c0 1.64.425 2.191 1.275 3.296C4.972 17.5 7.818 20 12 20s7.028-2.5 8.725-4.704C21.575 14.192 22 13.639 22 12c0-1.64-.425-2.191-1.275-3.296C19.028 6.5 16.182 4 12 4S4.972 6.5 3.275 8.704C2.425 9.81 2 10.361 2 12m10-3.75a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5"
        clipRule="evenodd"
      />
    </svg>
  );
};

const EyeOffIcon = ({ id, ...props }: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M2.69 6.705a.75.75 0 0 0-1.38.59zm12.897 6.624l-.274-.698zm-6.546.409a.75.75 0 1 0-1.257-.818zm-2.67 1.353a.75.75 0 1 0 1.258.818zM22.69 7.295a.75.75 0 0 0-1.378-.59zM19 11.13l-.513-.547zm.97 2.03a.75.75 0 1 0 1.06-1.06zm-8.72 3.34a.75.75 0 0 0 1.5 0zm5.121-.591a.75.75 0 1 0 1.258-.818zm-10.84-4.25A.75.75 0 0 0 4.47 10.6zm-2.561.44a.75.75 0 0 0 1.06 1.06zM12 13.25c-3.224 0-5.539-1.605-7.075-3.26a13.6 13.6 0 0 1-1.702-2.28a12 12 0 0 1-.507-.946l-.022-.049l-.004-.01l-.001-.001L2 7l-.69.296h.001l.001.003l.003.006l.04.088q.039.088.117.243c.103.206.256.496.462.841c.41.69 1.035 1.61 1.891 2.533C5.54 12.855 8.224 14.75 12 14.75zm3.313-.62c-.97.383-2.071.62-3.313.62v1.5c1.438 0 2.725-.276 3.862-.723zm-7.529.29l-1.413 2.17l1.258.818l1.412-2.171zM22 7l-.69-.296h.001v.002l-.007.013l-.028.062a12 12 0 0 1-.64 1.162a13.3 13.3 0 0 1-2.15 2.639l1.027 1.094a14.8 14.8 0 0 0 3.122-4.26l.039-.085l.01-.024l.004-.007v-.003h.001v-.001zm-3.513 3.582c-.86.806-1.913 1.552-3.174 2.049l.549 1.396c1.473-.58 2.685-1.444 3.651-2.351zm-.017 1.077l1.5 1.5l1.06-1.06l-1.5-1.5zM11.25 14v2.5h1.5V14zm3.709-.262l1.412 2.171l1.258-.818l-1.413-2.171zm-10.49-3.14l-1.5 1.5L4.03 13.16l1.5-1.5z"
      />
    </svg>
  );
};

const CenterLocationIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M11 21.95v-1q-3.125-.35-5.363-2.587T3.05 13h-1q-.425 0-.712-.288T1.05 12t.288-.712T2.05 11h1q.35-3.125 2.588-5.363T11 3.05v-1q0-.425.288-.712T12 1.05t.713.288t.287.712v1q3.125.35 5.363 2.588T20.95 11h1q.425 0 .713.288t.287.712t-.287.713t-.713.287h-1q-.35 3.125-2.587 5.363T13 20.95v1q0 .425-.288.713T12 22.95t-.712-.287T11 21.95M12 19q2.9 0 4.95-2.05T19 12t-2.05-4.95T12 5T7.05 7.05T5 12t2.05 4.95T12 19m0-3q-1.65 0-2.825-1.175T8 12t1.175-2.825T12 8t2.825 1.175T16 12t-1.175 2.825T12 16"
      />
    </svg>
  );
};

const LocationSelfIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2z"
        fill="currentColor"
      />
    </svg>
  );
};

const LoaderAIIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g>
        <circle cx="12" cy="3" r="1" fill="currentColor">
          <animate
            id="svgSpinners12DotsScaleRotate0"
            attributeName="r"
            begin="0;svgSpinners12DotsScaleRotate2.end-0.5s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="16.5" cy="4.21" r="1" fill="currentColor">
          <animate
            id="svgSpinners12DotsScaleRotate1"
            attributeName="r"
            begin="svgSpinners12DotsScaleRotate0.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="7.5" cy="4.21" r="1" fill="currentColor">
          <animate
            id="svgSpinners12DotsScaleRotate2"
            attributeName="r"
            begin="svgSpinners12DotsScaleRotate4.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="19.79" cy="7.5" r="1" fill="currentColor">
          <animate
            id="svgSpinners12DotsScaleRotate3"
            attributeName="r"
            begin="svgSpinners12DotsScaleRotate1.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="4.21" cy="7.5" r="1" fill="currentColor">
          <animate
            id="svgSpinners12DotsScaleRotate4"
            attributeName="r"
            begin="svgSpinners12DotsScaleRotate6.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="21" cy="12" r="1" fill="currentColor">
          <animate
            id="svgSpinners12DotsScaleRotate5"
            attributeName="r"
            begin="svgSpinners12DotsScaleRotate3.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="3" cy="12" r="1" fill="currentColor">
          <animate
            id="svgSpinners12DotsScaleRotate6"
            attributeName="r"
            begin="svgSpinners12DotsScaleRotate8.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="19.79" cy="16.5" r="1" fill="currentColor">
          <animate
            id="svgSpinners12DotsScaleRotate7"
            attributeName="r"
            begin="svgSpinners12DotsScaleRotate5.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="4.21" cy="16.5" r="1" fill="currentColor">
          <animate
            id="svgSpinners12DotsScaleRotate8"
            attributeName="r"
            begin="svgSpinners12DotsScaleRotatea.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="16.5" cy="19.79" r="1" fill="currentColor">
          <animate
            id="svgSpinners12DotsScaleRotate9"
            attributeName="r"
            begin="svgSpinners12DotsScaleRotate7.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="7.5" cy="19.79" r="1" fill="currentColor">
          <animate
            id="svgSpinners12DotsScaleRotatea"
            attributeName="r"
            begin="svgSpinners12DotsScaleRotateb.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="12" cy="21" r="1" fill="currentColor">
          <animate
            id="svgSpinners12DotsScaleRotateb"
            attributeName="r"
            begin="svgSpinners12DotsScaleRotate9.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <animateTransform
          attributeName="transform"
          dur="6s"
          repeatCount="indefinite"
          type="rotate"
          values="360 12 12;0 12 12"
        />
      </g>
    </svg>
  );
};

export {
  EyeIcon,
  EyeOffIcon,
  CenterLocationIcon,
  LocationSelfIcon,
  LoaderAIIcon,
};
