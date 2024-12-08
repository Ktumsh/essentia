import { IconSvgProps } from "@/types/common";

const EyeIcon = ({ id, ...props }: IconSvgProps) => {
  return (
    <svg
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="currentColor"
        d="M3.26 11.602C3.942 8.327 6.793 6 10 6s6.057 2.327 6.74 5.602a.5.5 0 0 0 .98-.204C16.943 7.673 13.693 5 10 5s-6.943 2.673-7.72 6.398a.5.5 0 0 0 .98.204M9.99 8a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7"
      ></path>
    </svg>
  );
};

const EyeOffIcon = ({ id, ...props }: IconSvgProps) => {
  return (
    <svg
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="currentColor"
        d="M2.854 2.146a.5.5 0 1 0-.708.708l3.5 3.498a8.1 8.1 0 0 0-3.366 5.046a.5.5 0 1 0 .979.204a7.1 7.1 0 0 1 3.108-4.528L7.95 8.656a3.5 3.5 0 1 0 4.884 4.884l4.313 4.314a.5.5 0 0 0 .708-.708zm7.27 5.857l3.363 3.363a3.5 3.5 0 0 0-3.363-3.363M7.53 5.41l.803.803A6.6 6.6 0 0 1 10 6c3.206 0 6.057 2.327 6.74 5.602a.5.5 0 1 0 .98-.204C16.943 7.673 13.693 5 10 5c-.855 0-1.687.143-2.469.41"
      ></path>
    </svg>
  );
};

const ClockIcon = (props: IconSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
      <path d="M12 7v5l3 3"></path>
    </svg>
  );
};

const CalendarFillIcon = (props: IconSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M7.75 2.5a.75.75 0 0 0-1.5 0v1.58c-1.44.115-2.384.397-3.078 1.092c-.695.694-.977 1.639-1.093 3.078h19.842c-.116-1.44-.398-2.384-1.093-3.078c-.694-.695-1.639-.977-3.078-1.093V2.5a.75.75 0 0 0-1.5 0v1.513C15.585 4 14.839 4 14 4h-4c-.839 0-1.585 0-2.25.013z"
        fill="currentColor"
      />
      <path
        clipRule="evenodd"
        d="M2 12c0-.839 0-1.585.013-2.25h19.974C22 10.415 22 11.161 22 12v2c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14zm15 2a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

const CalendarIcon = (props: IconSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 4h-.8c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C4 5.52 4 6.08 4 7.2V8m4-4h8M8 4V2m8 2h.8c1.12 0 1.68 0 2.107.218c.377.192.683.497.875.874c.218.427.218.987.218 2.105V8m-4-4V2M4 8v8.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h9.606c1.118 0 1.677 0 2.104-.218c.377-.192.683-.498.875-.874c.218-.428.218-.986.218-2.104V8M4 8h16m-4 8h.002v.002H16zm-4 0h.002v.002H12zm-4 0h.002v.002H8zm8.002-4v.002H16V12zM12 12h.002v.002H12zm-4 0h.002v.002H8z"
      />
    </svg>
  );
};

const CenterLocationIcon = (props: IconSvgProps) => {
  return (
    <svg
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

const LocationIcon = (props: IconSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zm4.95-7.778a7 7 0 1 0-9.9 0L12 20.9zM12 13a2 2 0 1 1 0-4a2 2 0 0 1 0 4"
      />
    </svg>
  );
};

const LocationSelfIcon = (props: IconSvgProps) => {
  return (
    <svg
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

const SystemIcon = (props: IconSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8 21v-2h2v-2H4q-.825 0-1.412-.587T2 15V5q0-.825.588-1.412T4 3h16q.825 0 1.413.588T22 5v10q0 .825-.587 1.413T20 17h-6v2h2v2zm-4-6h16V5H4zm0 0V5z"
      />
    </svg>
  );
};

const PhoneIcon = (props: IconSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M20 12q-.4 0-.712-.288T18.925 11q-.325-2.325-1.963-3.963T13 5.076q-.425-.05-.712-.35T12 4t.3-.712t.7-.238q3.15.35 5.375 2.575T20.95 11q.05.4-.238.7T20 12m-4.175 0q-.325 0-.575-.225t-.375-.6q-.2-.725-.763-1.287t-1.287-.763q-.375-.125-.6-.375T12 8.15q0-.5.35-.812t.775-.213q1.4.325 2.413 1.338t1.337 2.412q.1.425-.225.775t-.825.35m4.125 9q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3"
      />
    </svg>
  );
};

const SpinnerIcon = (props: IconSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx="4" cy="12" r="3" fill="currentColor">
        <animate
          id="svgSpinners3DotsFade0"
          fill="freeze"
          attributeName="opacity"
          begin="0;svgSpinners3DotsFade1.end-0.25s"
          dur="0.75s"
          values="1;.2"
        />
      </circle>
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity=".4">
        <animate
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinners3DotsFade0.begin+0.15s"
          dur="0.75s"
          values="1;.2"
        />
      </circle>
      <circle cx="20" cy="12" r="3" fill="currentColor" opacity=".3">
        <animate
          id="svgSpinners3DotsFade1"
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinners3DotsFade0.begin+0.3s"
          dur="0.75s"
          values="1;.2"
        />
      </circle>
    </svg>
  );
};

const CheckCircleFillIcon = (props: IconSvgProps) => {
  return (
    <svg
      height="24"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="24"
      style={{ color: "currentcolor" }}
      {...props}
      className="-rotate-45"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11.5303 6.53033L12.0607 6L11 4.93934L10.4697 5.46967L6.5 9.43934L5.53033 8.46967L5 7.93934L3.93934 9L4.46967 9.53033L5.96967 11.0303C6.26256 11.3232 6.73744 11.3232 7.03033 11.0303L11.5303 6.53033Z"
        fill="currentColor"
      />
    </svg>
  );
};

export {
  EyeIcon,
  EyeOffIcon,
  ClockIcon,
  CalendarFillIcon,
  CalendarIcon,
  CenterLocationIcon,
  LocationIcon,
  LocationSelfIcon,
  SystemIcon,
  PhoneIcon,
  SpinnerIcon,
  CheckCircleFillIcon,
};
