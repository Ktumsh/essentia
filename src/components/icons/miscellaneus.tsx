import type { IconSvgProps } from "@/types/common";

const AvatarIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx="12" cy="6" r="4" fill="currentColor" />
      <path
        fill="currentColor"
        d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
      />
    </svg>
  );
};

const HospitalIcon = (props: IconSvgProps) => {
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
        fillRule="evenodd"
        d="M10.75 2h2c1.886 0 2.828 0 3.414.586S16.75 4.114 16.75 6v15.25h5a.75.75 0 0 1 0 1.5h-20a.75.75 0 0 1 0-1.5h5V6c0-1.886 0-2.828.586-3.414S8.864 2 10.75 2m1 2.25a.75.75 0 0 1 .75.75v1.25h1.25a.75.75 0 0 1 0 1.5H12.5V9A.75.75 0 0 1 11 9V7.75H9.75a.75.75 0 0 1 0-1.5H11V5a.75.75 0 0 1 .75-.75M9 12a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4A.75.75 0 0 1 9 12m0 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4A.75.75 0 0 1 9 15m2.75 3.25a.75.75 0 0 1 .75.75v2.25H11V19a.75.75 0 0 1 .75-.75"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M20.913 5.889c.337.504.337 1.206.337 2.611v12.75h.5a.75.75 0 0 1 0 1.5h-20a.75.75 0 1 1 0-1.5h.5V8.5c0-1.405 0-2.107.337-2.611a2 2 0 0 1 .552-.552c.441-.295 2.537-.332 3.618-.336q-.005.437-.004.91V7.25H4.25a.75.75 0 1 0 0 1.5h2.503v1.5H4.25a.75.75 0 0 0 0 1.5h2.503v1.5H4.25a.75.75 0 0 0 0 1.5h2.503v6.5h10v-6.5h2.497a.75.75 0 1 0 0-1.5h-2.497v-1.5h2.497a.75.75 0 1 0 0-1.5h-2.497v-1.5h2.497a.75.75 0 0 0 0-1.5h-2.497V5.91q.001-.471-.004-.91c1.081.005 3.17.042 3.612.337a2 2 0 0 1 .552.552"
        opacity="0.5"
      />
    </svg>
  );
};

const PharmacyIcon = (props: IconSvgProps) => {
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
        fillRule="evenodd"
        d="m10.01 13.109l-.495.095l-1.923-1.923a5.437 5.437 0 1 1 7.69-7.689l1.922 1.923l-.096.495l-.001.009l-.013.054a4 4 0 0 1-.07.244c-.07.22-.19.545-.385.948c-.388.806-1.076 1.923-2.264 3.11c-1.188 1.189-2.304 1.876-3.11 2.265c-.403.194-.73.314-.948.383a4 4 0 0 1-.298.084zm3.52-8.64a.75.75 0 1 0-1.06 1.061l1.5 1.5a.75.75 0 1 0 1.06-1.06z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="m20.408 8.718l-1.953-1.952l-.003.008c-.09.28-.235.672-.462 1.143c-.454.943-1.236 2.201-2.554 3.52s-2.577 2.1-3.52 2.554a9 9 0 0 1-1.143.461l-.007.003l1.953 1.952a5.437 5.437 0 1 0 7.688-7.689"
      />
      <path
        fill="currentColor"
        d="M6.717 10.138c.234.409.526.794.875 1.144l5.127 5.126c.349.35.734.641 1.143.876a6 6 0 0 1-1.62 2.959a6 6 0 1 1-5.526-10.105"
        opacity="0.5"
      />
    </svg>
  );
};

const MailIcon = (props: IconSvgProps) => {
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
        fillRule="evenodd"
        d="M3.172 5.172C2 6.343 2 8.229 2 12s0 5.657 1.172 6.828S6.229 20 10 20h4c3.771 0 5.657 0 6.828-1.172S22 15.771 22 12s0-5.657-1.172-6.828S17.771 4 14 4h-4C6.229 4 4.343 4 3.172 5.172M18.576 7.52a.75.75 0 0 1-.096 1.056l-2.196 1.83c-.887.74-1.605 1.338-2.24 1.746c-.66.425-1.303.693-2.044.693s-1.384-.269-2.045-.693c-.634-.408-1.352-1.007-2.239-1.745L5.52 8.577a.75.75 0 0 1 .96-1.153l2.16 1.799c.933.777 1.58 1.315 2.128 1.667c.529.34.888.455 1.233.455s.704-.114 1.233-.455c.547-.352 1.195-.89 2.128-1.667l2.159-1.8a.75.75 0 0 1 1.056.097"
        clipRule="evenodd"
      />
    </svg>
  );
};

const GuidesIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 8c0-2.828 0-4.243.879-5.121C5.757 2 7.172 2 10 2h4c2.828 0 4.243 0 5.121.879C20 3.757 20 5.172 20 8v8c0 2.828 0 4.243-.879 5.121C18.243 22 16.828 22 14 22h-4c-2.828 0-4.243 0-5.121-.879C4 20.243 4 18.828 4 16z" />
        <path d="M19.898 16h-12c-.93 0-1.395 0-1.777.102A3 3 0 0 0 4 18.224" />
        <path strokeLinecap="round" d="M8 7h8m-8 3.5h5m6.5 8.5H8" />
      </g>
    </svg>
  );
};

const GuidesFillIcon = (props: IconSvgProps) => {
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
        d="M7.426 18H20c-.003.93-.022 1.623-.113 2.17c-.11.653-.31.998-.616 1.244c-.307.246-.737.407-1.55.494c-.837.09-1.946.092-3.536.092h-4.43c-1.59 0-2.7-.001-3.536-.092c-.813-.087-1.243-.248-1.55-.494s-.506-.591-.616-1.243l-.022-.151c-.04-.291-.06-.437.066-.78c.127-.344.181-.397.291-.505a2.6 2.6 0 0 1 1.285-.667c.29-.062.67-.068 1.753-.068"
      />
      <path
        fill="currentColor"
        d="M4.727 2.733c.306-.308.734-.508 1.544-.618C7.105 2.002 8.209 2 9.793 2h4.414c1.584 0 2.688.002 3.522.115c.81.11 1.238.31 1.544.618c.305.308.504.74.613 1.557c.112.84.114 1.955.114 3.552V18H7.426c-1.084 0-1.462.006-1.753.068c-.513.11-.96.347-1.285.667c-.11.108-.164.161-.291.505A1.3 1.3 0 0 0 4 19.7V7.842c0-1.597.002-2.711.114-3.552c.109-.816.308-1.249.613-1.557"
        opacity="0.5"
      />
      <path
        fill="currentColor"
        d="M7.25 7A.75.75 0 0 1 8 6.25h8a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 7M8 9.75a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z"
      />
    </svg>
  );
};

const KitIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 14c0-3.771 0-5.657 1.172-6.828S6.229 6 10 6h4c3.771 0 5.657 0 6.828 1.172S22 10.229 22 14s0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14Zm14-8c0-1.886 0-2.828-.586-3.414S13.886 2 12 2s-2.828 0-3.414.586S8 4.114 8 6" />
        <path strokeLinecap="round" d="M13.5 14h-3m1.5-1.5v3" />
        <circle cx="12" cy="14" r="4" />
      </g>
    </svg>
  );
};

const KitFillIcon = (props: IconSvgProps) => {
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
        d="M12.052 1.25h-.104c-.899 0-1.648 0-2.242.08c-.628.084-1.195.27-1.65.725c-.456.456-.642 1.023-.726 1.65c-.08.595-.08 1.345-.08 2.243v.078q.684-.021 1.5-.024V6c0-.964.002-1.612.067-2.095c.062-.461.169-.659.3-.789s.327-.237.788-.3c.483-.064 1.131-.066 2.095-.066s1.612.002 2.095.067c.461.062.659.169.789.3s.237.327.3.788c.064.483.066 1.131.066 2.095v.002a55 55 0 0 1 1.5.024v-.078c0-.898 0-1.648-.08-2.242c-.084-.628-.27-1.195-.726-1.65c-.455-.456-1.022-.642-1.65-.726c-.594-.08-1.344-.08-2.242-.08"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2 14c0-3.771 0-5.657 1.172-6.828S6.229 6 10 6h4c3.771 0 5.657 0 6.828 1.172S22 10.229 22 14s0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14m10.75-1.5a.75.75 0 0 0-1.5 0v.75h-.75a.75.75 0 0 0 0 1.5h.75v.75a.75.75 0 0 0 1.5 0v-.75h.75a.75.75 0 0 0 0-1.5h-.75z"
        clipRule="evenodd"
        opacity="0.5"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 18a4 4 0 1 0 0-8a4 4 0 0 0 0 8m.75-5.5a.75.75 0 0 0-1.5 0v.75h-.75a.75.75 0 0 0 0 1.5h.75v.75a.75.75 0 0 0 1.5 0v-.75h.75a.75.75 0 0 0 0-1.5h-.75z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const EmergenciesIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 22v-6a8 8 0 1 0-16 0v6" />
        <path
          strokeLinecap="round"
          d="M14.29 11.5a4 4 0 0 1 2.21 2.21M2 22h20M12 2v3m9 1l-1.5 1.5M3 6l1.5 1.5"
        />
        <path d="M13.5 17.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Z" />
        <path strokeLinecap="round" d="M12 19v3" />
      </g>
    </svg>
  );
};

const EmergenciesFillIcon = (props: IconSvgProps) => {
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
        d="M4 16v5.25h16V16a8 8 0 1 0-16 0"
        opacity="0.5"
      />
      <path
        fill="currentColor"
        d="M12.75 2a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0zm8.78 3.47a.75.75 0 0 1 0 1.06l-1.5 1.5a.75.75 0 1 1-1.06-1.06l1.5-1.5a.75.75 0 0 1 1.06 0m-18 0a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.06-1.06zm11.042 5.335a.75.75 0 0 0-.563 1.39c.814.33 1.466.981 1.795 1.796a.75.75 0 1 0 1.39-.563a4.76 4.76 0 0 0-2.622-2.623M12.75 18.8a1.5 1.5 0 1 0-1.5 0v2.45h1.5zM4 21.25H2a.75.75 0 0 0 0 1.5h20a.75.75 0 0 0 0-1.5z"
      />
    </svg>
  );
};

const FruitIcon = (props: IconSvgProps) => {
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
        d="M12 21q-2.925 0-4.962-2.037T5 14q0-2.35 1.388-4.212t3.637-2.513q-.825-.2-1.437-.712T7.6 5.325T7.075 3.75t-.05-1.725q1.025-.125 1.95.125t1.675.8t1.238 1.325t.587 1.75q.325-.775.788-1.463T14.3 3.3q.275-.275.7-.275t.7.275t.275.7t-.275.7q-.55.55-.975 1.213T14.1 7.325q2.2.7 3.55 2.538T19 14q0 2.925-2.037 4.963T12 21"
      />
    </svg>
  );
};

const HeartbeatIcon = (props: IconSvgProps) => {
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
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 12h4.5L9 6l4 12l2-9l1.5 3H21"
      />
    </svg>
  );
};

const SaveFillIcon = (props: IconSvgProps) => {
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
        d="m19.352 7.617l-3.96-3.563c-1.127-1.015-1.69-1.523-2.383-1.788L13 5c0 2.357 0 3.536.732 4.268S15.643 10 18 10h3.58c-.362-.704-1.012-1.288-2.228-2.383"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14v-4c0-3.771 0-5.657 1.172-6.828S6.239 2 10.03 2c.606 0 1.091 0 1.5.017q-.02.12-.02.244l-.01 2.834c0 1.097 0 2.067.105 2.848c.114.847.375 1.694 1.067 2.386c.69.69 1.538.952 2.385 1.066c.781.105 1.751.105 2.848.105h4.052c.043.534.043 1.19.043 2.063V14c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22m-3.502-7.56a.75.75 0 0 1 .063 1.058l-2.667 3a.75.75 0 0 1-1.121 0l-1.334-1.5a.75.75 0 0 1 1.122-.996l.772.87l2.106-2.37a.75.75 0 0 1 1.06-.063"
        clipRule="evenodd"
      />
    </svg>
  );
};

const UploadFillIcon = (props: IconSvgProps) => {
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
        d="m19.352 7.617l-3.96-3.563c-1.127-1.015-1.69-1.523-2.383-1.788L13 5c0 2.357 0 3.536.732 4.268S15.643 10 18 10h3.58c-.362-.704-1.012-1.288-2.228-2.383"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M10 22h4c3.771 0 5.657 0 6.828-1.172S22 17.771 22 14v-.437c0-.873 0-1.529-.043-2.063h-4.052c-1.097 0-2.067 0-2.848-.105c-.847-.114-1.694-.375-2.385-1.066c-.692-.692-.953-1.539-1.067-2.386c-.105-.781-.105-1.75-.105-2.848l.01-2.834q0-.124.02-.244C11.121 2 10.636 2 10.03 2C6.239 2 4.343 2 3.172 3.172C2 4.343 2 6.229 2 10v4c0 3.771 0 5.657 1.172 6.828S6.229 22 10 22m-.987-9.047a.75.75 0 0 0-1.026 0l-2 1.875a.75.75 0 0 0 1.026 1.094l.737-.69V18.5a.75.75 0 0 0 1.5 0v-3.269l.737.691a.75.75 0 0 0 1.026-1.094z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const ExcerciseFillIcon = (props: IconSvgProps) => {
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
        fillRule="evenodd"
        d="m3.432 15.62l4.949 4.948c.904.905 1.356 1.357 1.908 1.421q.185.023.371 0c.552-.064 1.004-.516 1.908-1.42c.905-.905 1.357-1.357 1.421-1.909a1.6 1.6 0 0 0 0-.37c-.064-.553-.516-1.005-1.42-1.91l-1.113-1.111l-3.103-3.104l-.734-.733c-.904-.905-1.356-1.357-1.908-1.421a1.6 1.6 0 0 0-.371 0c-.552.064-1.004.516-1.908 1.42c-.905.905-1.357 1.357-1.421 1.909a1.6 1.6 0 0 0 0 .37c.064.553.516 1.005 1.42 1.91m8.733-7.267l3.104 3.104l1.112 1.111c.904.905 1.356 1.357 1.908 1.421q.186.023.371 0c.552-.064 1.004-.516 1.908-1.42c.905-.905 1.357-1.357 1.421-1.909a1.6 1.6 0 0 0 0-.37c-.064-.553-.516-1.005-1.42-1.91l-4.95-4.948c-.904-.905-1.356-1.357-1.908-1.421a1.6 1.6 0 0 0-.371 0c-.552.064-1.004.516-1.908 1.42c-.905.905-1.357 1.357-1.421 1.909a1.6 1.6 0 0 0 0 .37c.064.553.516 1.005 1.42 1.91z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="m11.457 15.269l3.812-3.812l-3.104-3.104l-3.812 3.812z"
        opacity="0.5"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M17.489 1.968a.75.75 0 0 1 1.06 0l3.105 3.104a.75.75 0 0 1-1.061 1.06l-3.104-3.104a.75.75 0 0 1 0-1.06M1.968 17.488a.75.75 0 0 1 1.06 0l3.104 3.104a.75.75 0 0 1-1.06 1.06l-3.104-3.104a.75.75 0 0 1 0-1.06"
        clipRule="evenodd"
        opacity="0.5"
      />
    </svg>
  );
};

export {
  AvatarIcon,
  HospitalIcon,
  PharmacyIcon,
  MailIcon,
  GuidesIcon,
  GuidesFillIcon,
  KitIcon,
  KitFillIcon,
  EmergenciesIcon,
  EmergenciesFillIcon,
  FruitIcon,
  HeartbeatIcon,
  SaveFillIcon,
  UploadFillIcon,
  ExcerciseFillIcon,
};
