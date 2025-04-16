import { IconSvgProps } from "@/types/common";

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

const HeartIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M240 102c0 70-103.79 126.66-108.21 129a8 8 0 0 1-7.58 0C119.79 228.66 16 172 16 102a62.07 62.07 0 0 1 62-62c20.65 0 38.73 8.88 50 23.89C139.27 48.88 157.35 40 178 40a62.07 62.07 0 0 1 62 62"
      />
    </svg>
  );
};

const QuestionIcon = (props: IconSvgProps) => {
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
        d="M14.6 8.075q0-1.075-.712-1.725T12 5.7q-.725 0-1.312.313t-1.013.912q-.4.575-1.088.663T7.4 7.225q-.35-.325-.387-.8t.237-.9q.8-1.2 2.038-1.862T12 3q2.425 0 3.938 1.375t1.512 3.6q0 1.125-.475 2.025t-1.75 2.125q-.925.875-1.25 1.363T13.55 14.6q-.1.6-.513 1t-.987.4t-.987-.387t-.413-.963q0-.975.425-1.787T12.5 11.15q1.275-1.125 1.688-1.737t.412-1.338M12 22q-.825 0-1.412-.587T10 20t.588-1.412T12 18t1.413.588T14 20t-.587 1.413T12 22"
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

const AboutCrop = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      {...props}
    >
      <path
        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
        opacity=".25"
        className="fill-white"
      ></path>
      <path
        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
        opacity=".5"
        className="fill-white"
      ></path>
      <path
        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
        className="fill-white"
      ></path>
    </svg>
  );
};

const BrainIcon = (props: IconSvgProps) => {
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
        d="M21.33 12.91c.09 1.55-.62 3.04-1.89 3.95l.77 1.49c.23.45.26.98.06 1.45c-.19.47-.58.84-1.06 1l-.79.25a1.69 1.69 0 0 1-1.86-.55L14.44 18c-.89-.15-1.73-.53-2.44-1.1c-.5.15-1 .23-1.5.23c-.88 0-1.76-.27-2.5-.79c-.53.16-1.07.23-1.62.22c-.79.01-1.57-.15-2.3-.45a4.1 4.1 0 0 1-2.43-3.61c-.08-.72.04-1.45.35-2.11c-.29-.75-.32-1.57-.07-2.33C2.3 7.11 3 6.32 3.87 5.82c.58-1.69 2.21-2.82 4-2.7c1.6-1.5 4.05-1.66 5.83-.37c.42-.11.86-.17 1.3-.17c1.36-.03 2.65.57 3.5 1.64c2.04.53 3.5 2.35 3.58 4.47c.05 1.11-.25 2.2-.86 3.13c.07.36.11.72.11 1.09m-5-1.41c.57.07 1.02.5 1.02 1.07a1 1 0 0 1-1 1h-.63c-.32.9-.88 1.69-1.62 2.29c.25.09.51.14.77.21c5.13-.07 4.53-3.2 4.53-3.25a2.59 2.59 0 0 0-2.69-2.49a1 1 0 0 1-1-1a1 1 0 0 1 1-1c1.23.03 2.41.49 3.33 1.3c.05-.29.08-.59.08-.89c-.06-1.24-.62-2.32-2.87-2.53c-1.25-2.96-4.4-1.32-4.4-.4c-.03.23.21.72.25.75a1 1 0 0 1 1 1c0 .55-.45 1-1 1c-.53-.02-1.03-.22-1.43-.56c-.48.31-1.03.5-1.6.56c-.57.05-1.04-.35-1.07-.9a.97.97 0 0 1 .88-1.1c.16-.02.94-.14.94-.77c0-.66.25-1.29.68-1.79c-.92-.25-1.91.08-2.91 1.29C6.75 5 6 5.25 5.45 7.2C4.5 7.67 4 8 3.78 9c1.08-.22 2.19-.13 3.22.25c.5.19.78.75.59 1.29c-.19.52-.77.78-1.29.59c-.73-.32-1.55-.34-2.3-.06c-.32.27-.32.83-.32 1.27c0 .74.37 1.43 1 1.83c.53.27 1.12.41 1.71.4q-.225-.39-.39-.81a1.038 1.038 0 0 1 1.96-.68c.4 1.14 1.42 1.92 2.62 2.05c1.37-.07 2.59-.88 3.19-2.13c.23-1.38 1.34-1.5 2.56-1.5m2 7.47l-.62-1.3l-.71.16l1 1.25zm-4.65-8.61a1 1 0 0 0-.91-1.03c-.71-.04-1.4.2-1.93.67c-.57.58-.87 1.38-.84 2.19a1 1 0 0 0 1 1c.57 0 1-.45 1-1c0-.27.07-.54.23-.76c.12-.1.27-.15.43-.15c.55.03 1.02-.38 1.02-.92"
      />
    </svg>
  );
};

const LightbulbIcon = (props: IconSvgProps) => {
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
        d="M12 22q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22m-3-3q-.425 0-.712-.288T8 18t.288-.712T9 17h6q.425 0 .713.288T16 18t-.288.713T15 19zm-.75-3q-1.725-1.025-2.738-2.75T4.5 9.5q0-3.125 2.188-5.312T12 2t5.313 2.188T19.5 9.5q0 2.025-1.012 3.75T15.75 16zm.6-2h6.3q1.125-.8 1.738-1.975T17.5 9.5q0-2.3-1.6-3.9T12 4T8.1 5.6T6.5 9.5q0 1.35.613 2.525T8.85 14M12 14"
      />
    </svg>
  );
};

const AcademicIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="currentColor">
        <path d="M12.486 5.414a1 1 0 0 0-.972 0L5.06 9l6.455 3.586a1 1 0 0 0 .972 0L18.94 9l-6.455-3.586zm-1.943-1.749a3 3 0 0 1 2.914 0l8.029 4.46a1 1 0 0 1 0 1.75l-8.03 4.46a3 3 0 0 1-2.913 0l-8.029-4.46a1 1 0 0 1 0-1.75l8.03-4.46z" />
        <path d="M21 8a1 1 0 0 1 1 1v7a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1zM6 10a1 1 0 0 1 1 1v5.382l4.553 2.276a1 1 0 0 0 .894 0L17 16.382V11a1 1 0 1 1 2 0v6a1 1 0 0 1-.553.894l-5.105 2.553a3 3 0 0 1-2.684 0l-5.105-2.553A1 1 0 0 1 5 17v-6a1 1 0 0 1 1-1z" />
      </g>
    </svg>
  );
};

const ItineraryIcon = (props: IconSvgProps) => {
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
        d="M5 14q-.425 0-.712-.288T4 13t.288-.712T5 12h5q.425 0 .713.288T11 13t-.288.713T10 14zm0-4q-.425 0-.712-.288T4 9t.288-.712T5 8h9q.425 0 .713.288T15 9t-.288.713T14 10zm0-4q-.425 0-.712-.288T4 5t.288-.712T5 4h9q.425 0 .713.288T15 5t-.288.713T14 6zm8 13v-1.65q0-.2.075-.387t.225-.338l5.225-5.2q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.2 5.2q-.15.15-.337.225T15.65 20H14q-.425 0-.712-.287T13 19m7.5-5.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zm3.525-3.525l-.475-.45l.925.925z"
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
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m3.604 7.197l7.138-3.109a.96.96 0 0 1 1.27.527l4.924 11.902a1 1 0 0 1-.514 1.304L9.285 20.93a.96.96 0 0 1-1.271-.527L3.09 8.5a1 1 0 0 1 .514-1.304zM15 4h1a1 1 0 0 1 1 1v3.5M20 6q.396.168.768.315a1 1 0 0 1 .53 1.311L19 13"
      />
    </svg>
  );
};

const GuidesFillIcon = (props: IconSvgProps) => {
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
        d="m10.348 3.169l-7.15 3.113a2 2 0 0 0-1.03 2.608l4.92 11.895a1.96 1.96 0 0 0 2.59 1.063l7.142-3.11a2 2 0 0 0 1.036-2.611l-4.92-11.894a1.96 1.96 0 0 0-2.588-1.064M16 3a2 2 0 0 1 1.995 1.85L18 5v3.5a1 1 0 0 1-1.993.117L16 8.5V5h-1a1 1 0 0 1-.117-1.993L15 3zm3.08 2.61a1 1 0 0 1 1.31-.53c.257.108.505.21.769.314a2 2 0 0 1 1.114 2.479l-.056.146l-2.298 5.374a1 1 0 0 1-1.878-.676l.04-.11l2.296-5.371l-.366-.148l-.402-.167a1 1 0 0 1-.53-1.312z"
      />
    </svg>
  );
};

const LinksIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z" />
        <path strokeLinecap="round" d="M14 6.5L9 10m5 7.5L9 14" />
        <path d="M19 18.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Zm0-13a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z" />
      </g>
    </svg>
  );
};

const LinksFillIcon = (props: IconSvgProps) => {
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
        d="M13.803 5.333c0-1.84 1.5-3.333 3.348-3.333A3.34 3.34 0 0 1 20.5 5.333c0 1.841-1.5 3.334-3.349 3.334a3.35 3.35 0 0 1-2.384-.994l-4.635 3.156a3.34 3.34 0 0 1-.182 1.917l5.082 3.34a3.35 3.35 0 0 1 2.12-.753a3.34 3.34 0 0 1 3.348 3.334C20.5 20.507 19 22 17.151 22a3.34 3.34 0 0 1-3.348-3.333a3.3 3.3 0 0 1 .289-1.356L9.05 14a3.35 3.35 0 0 1-2.202.821A3.34 3.34 0 0 1 3.5 11.487a3.34 3.34 0 0 1 3.348-3.333c1.064 0 2.01.493 2.623 1.261l4.493-3.059a3.3 3.3 0 0 1-.161-1.023"
        clipRule="evenodd"
      />
    </svg>
  );
};

const RecommendationsIcon = (props: IconSvgProps) => {
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
        strokeWidth="1.5"
        d="M7 8h10M7 11h10M7 14h4m-8 4V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7.667a2 2 0 0 0-1.2.4L3 21z"
      />
    </svg>
  );
};

const RecommendationsFillIcon = (props: IconSvgProps) => {
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
        d="M2 6a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7.667a1 1 0 0 0-.6.2L3.6 21.8A1 1 0 0 1 2 21zm5 0a1 1 0 0 0 0 2h10a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const HealthCentersIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none">
        <path
          stroke="currentColor"
          strokeWidth="1.5"
          d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22Z"
        />
        <path
          stroke="currentColor"
          strokeWidth="1.5"
          d="M5.5 8.757C5.5 6.958 7.067 5.5 9 5.5s3.5 1.458 3.5 3.257c0 1.785-1.117 3.868-2.86 4.613a1.64 1.64 0 0 1-1.28 0c-1.743-.745-2.86-2.828-2.86-4.613Z"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
          d="m14 14l6.5 6.5M14 14l-7.605 7.605M14 14l7.607-7.606"
        />
        <path fill="currentColor" d="M10 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0" />
      </g>
    </svg>
  );
};

const HealthCentersFillIcon = (props: IconSvgProps) => {
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
        d="M12 2c4.714 0 7.071 0 8.535 1.464c.504.504.835 1.114 1.052 1.889L5.353 21.587c-.775-.217-1.385-.548-1.889-1.052C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2M5.5 8.757c0 1.785 1.117 3.868 2.86 4.613c.406.173.874.173 1.28 0c1.743-.745 2.86-2.828 2.86-4.613C12.5 6.958 10.933 5.5 9 5.5S5.5 6.958 5.5 8.757"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M10.5 9a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"
      />
      <path
        fill="currentColor"
        d="M21.89 7.172C22 8.433 22 10.006 22 12c0 4.134 0 6.455-.987 7.951L15.06 14zm-1.938 13.84l-5.951-5.951l-6.83 6.828c1.262.111 2.835.111 4.83.111c4.134 0 6.455 0 7.951-.988"
        opacity="0.5"
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
      <path
        fill="currentColor"
        d="M6 20q-.425 0-.712-.288T5 19t.288-.712T6 18h.6l1.975-6.575q.2-.65.738-1.037T10.5 10h3q.65 0 1.188.388t.737 1.037L17.4 18h.6q.425 0 .713.288T19 19t-.288.713T18 20zm2.7-2h6.6l-1.8-6h-3zM11 7V4q0-.425.288-.712T12 3t.713.288T13 4v3q0 .425-.288.713T12 8t-.712-.288T11 7m5.25 1.35l2.125-2.125q.275-.275.688-.288t.712.288q.275.275.275.7t-.275.7l-2.125 2.15q-.3.3-.7.3t-.7-.3t-.3-.712t.3-.713M19 13h3q.425 0 .713.288T23 14t-.288.713T22 15h-3q-.425 0-.712-.288T18 14t.288-.712T19 13M6.35 9.75L4.225 7.625q-.275-.275-.287-.687t.287-.713q.275-.275.7-.275t.7.275l2.15 2.125q.3.3.3.7t-.3.7t-.712.3t-.713-.3M2 15q-.425 0-.712-.288T1 14t.288-.712T2 13h3q.425 0 .713.288T6 14t-.288.713T5 15zm10 3"
      />
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
        d="M6 20q-.425 0-.712-.288T5 19t.288-.712T6 18h.6l1.975-6.575q.2-.65.738-1.037T10.5 10h3q.65 0 1.188.388t.737 1.037L17.4 18h.6q.425 0 .713.288T19 19t-.288.713T18 20zm5-13V4q0-.425.288-.712T12 3t.713.288T13 4v3q0 .425-.288.713T12 8t-.712-.288T11 7m5.25 1.35l2.125-2.125q.275-.275.688-.288t.712.288q.275.275.275.7t-.275.7l-2.125 2.15q-.3.3-.7.3t-.7-.3t-.3-.712t.3-.713M19 13h3q.425 0 .713.288T23 14t-.288.713T22 15h-3q-.425 0-.712-.288T18 14t.288-.712T19 13M6.35 9.75L4.225 7.625q-.275-.275-.287-.687t.287-.713q.275-.275.7-.275t.7.275l2.15 2.125q.3.3.3.7t-.3.7t-.712.3t-.713-.3M2 15q-.425 0-.712-.288T1 14t.288-.712T2 13h3q.425 0 .713.288T6 14t-.288.713T5 15z"
      />
    </svg>
  );
};

const QuantityIcon = (props: IconSvgProps) => {
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
        d="M6.975 22q-.775 0-1.337-.5T5 20.225L3.275 4.475q-.125-1 .55-1.737T5.5 2h13q1 0 1.675.738t.55 1.737L19 20.225q-.075.775-.638 1.275t-1.337.5zm-.4-6H17.45l1.3-12H5.25z"
      />
    </svg>
  );
};

const CaloriesIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
        <path d="M10.367 4.061C9.667 4.567 5 8.158 5 14a7 7 0 0 0 6.92 7a4 4 0 0 1-3.874-4.616c.336-2.254 2.41-4.167 3.412-4.974a.856.856 0 0 1 1.084 0c1.003.807 3.076 2.72 3.412 4.974l.004.034Q16 16.703 16 17a4 4 0 0 1-3.92 4A7 7 0 0 0 19 14.057V14c-.027-4.241-2.896-6.555-3.419-6.942a.14.14 0 0 0-.163 0c-.21.155-.794.618-1.421 1.39a.156.156 0 0 1-.26-.032c-1.18-2.495-2.813-4.009-3.198-4.345a.135.135 0 0 0-.172-.01" />
        <path
          fillOpacity=".25"
          d="M8.046 16.384c.336-2.253 2.41-4.167 3.412-4.974a.856.856 0 0 1 1.084 0c1.003.807 3.076 2.72 3.412 4.974l.004.034Q16 16.703 16 17a4 4 0 1 1-7.954-.616"
        />
      </g>
    </svg>
  );
};

const MealIcon = (props: IconSvgProps) => {
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
        d="M7.505 13.288c.018.015 2.885-2.849 2.885-2.881S5.343 5.333 4.081 4.1c-.462-.45-.862-.82-.885-.82a.7.7 0 0 0-.214.18a3.6 3.6 0 0 0-.752 1.3c-.059.169-.1.308-.1.308a1 1 0 0 1-.026.148A4.2 4.2 0 0 0 2.07 6.9c.213 1.016.527 1.46 2.313 3.264c.59.598 3.017 3.021 3.122 3.124m6.895-1.629a.5.5 0 0 1 .2.128a2.094 2.094 0 0 0 3-.136c.391-.338.589-.531 2.5-2.435L22 7.32l-.477-.482c-.26-.267-.48-.48-.486-.474s-.758.752-1.67 1.661l-1.659 1.656l-.474-.468a9 9 0 0 1-.476-.489c0-.009.743-.767 1.655-1.679l1.653-1.659l-.466-.477a10 10 0 0 0-.486-.476c-.009 0-.764.746-1.676 1.655l-1.664 1.659l-.485-.48l-.486-.48l1.658-1.658a116 116 0 0 0 1.659-1.677c0-.009-.575-.6-.865-.879l-.1-.095l-.965.983c-1.961 2.005-2.832 2.909-3.326 3.46c-.095.106-.184.2-.193.207a4 4 0 0 0-.183.21a1.81 1.81 0 0 0-.228 1.777a4 4 0 0 0 .4.738c.012.009.074.074.14.142l.118.124l-4.969 4.973l-4.97 4.97l.723.729l.72.731l3.554-3.554l3.551-3.551l3.531 3.53a554 554 0 0 0 3.56 3.54c.015.006 1.4-1.36 1.421-1.416c.006-.015-1.581-1.62-3.527-3.566l-3.537-3.539l.548-.542c.741-.735.777-.765.877-.765"
      />
    </svg>
  );
};

const ListIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      >
        <path strokeLinejoin="round" d="M2 5.5L3.214 7L7.5 3" />
        <path strokeLinejoin="round" d="M2 12.5L3.214 14L7.5 10" opacity=".5" />
        <path strokeLinejoin="round" d="M2 19.5L3.214 21L7.5 17" />
        <path d="M22 19H12" />
        <path d="M22 12H12" opacity=".5" />
        <path d="M22 5H12" />
      </g>
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
        d="M12 21q-2.925 0-4.962-2.037T5 14q0-2.35 1.388-4.212t3.637-2.513q-.5-.125-.975-.363T8.2 6.3q-.825-.825-1.062-1.962t-.113-2.313Q8.2 1.9 9.338 2.138T11.3 3.2q.575.575.838 1.3t.337 1.525q.325-.775.788-1.463T14.3 3.3q.275-.275.7-.275t.7.275t.275.7t-.275.7q-.55.55-.975 1.213T14.1 7.325q2.2.7 3.55 2.538T19 14q0 2.925-2.037 4.963T12 21m0-2q2.075 0 3.538-1.463T17 14t-1.463-3.537T12 9t-3.537 1.463T7 14t1.463 3.538T12 19m0-5"
      />
    </svg>
  );
};

const FruitFillIcon = (props: IconSvgProps) => {
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

const EquipmentIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 11 11"
      {...props}
    >
      <path
        d="M7 6H4V5h3zM2 3v1H1v1a.5.5 0 0 0 0 1v1h1v1h1.5V3zm8 2V4H9V3H7.5v5H9V7h1V6a.5.5 0 0 0 0-1z"
        fill="currentColor"
      />
    </svg>
  );
};

const RestIcon = (props: IconSvgProps) => {
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
        d="M12 21q-3.15 0-5.575-1.912T3.275 14.2q-.1-.375.15-.687t.675-.363q.4-.05.725.15t.45.6q.6 2.25 2.475 3.675T12 19q2.925 0 4.963-2.037T19 12t-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H8q.425 0 .713.288T9 9t-.288.713T8 10H4q-.425 0-.712-.288T3 9V5q0-.425.288-.712T4 4t.713.288T5 5v1.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924t1.925 2.85T21 12t-.712 3.513t-1.925 2.85t-2.85 1.925T12 21m0-7q-.825 0-1.412-.587T10 12t.588-1.412T12 10t1.413.588T14 12t-.587 1.413T12 14"
      />
    </svg>
  );
};

const ProgressionIcon = (props: IconSvgProps) => {
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
        d="M3.4 18L2 16.6l7.4-7.45l4 4L18.6 8H16V6h6v6h-2V9.4L13.4 16l-4-4z"
      />
    </svg>
  );
};

const ZapIcon = (props: IconSvgProps) => {
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
        d="m5.67 9.914l3.062-4.143c1.979-2.678 2.969-4.017 3.892-3.734s.923 1.925.923 5.21v.31c0 1.185 0 1.777.379 2.148l.02.02c.387.363 1.003.363 2.236.363c2.22 0 3.329 0 3.704.673l.018.034c.354.683-.289 1.553-1.574 3.29l-3.062 4.144c-1.98 2.678-2.969 4.017-3.892 3.734s-.923-1.925-.923-5.21v-.31c0-1.185 0-1.777-.379-2.148l-.02-.02c-.387-.363-1.003-.363-2.236-.363c-2.22 0-3.329 0-3.703-.673l-.019-.034c-.354-.683.289-1.552 1.574-3.29"
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
  HeartIcon,
  QuestionIcon,
  MailIcon,
  AboutCrop,
  BrainIcon,
  LightbulbIcon,
  AcademicIcon,
  ItineraryIcon,
  GuidesIcon,
  GuidesFillIcon,
  LinksIcon,
  LinksFillIcon,
  RecommendationsIcon,
  RecommendationsFillIcon,
  HealthCentersIcon,
  HealthCentersFillIcon,
  EmergenciesIcon,
  EmergenciesFillIcon,
  QuantityIcon,
  CaloriesIcon,
  MealIcon,
  ListIcon,
  FruitIcon,
  FruitFillIcon,
  HeartbeatIcon,
  EquipmentIcon,
  RestIcon,
  ProgressionIcon,
  ZapIcon,
  SaveFillIcon,
  UploadFillIcon,
  ExcerciseFillIcon,
};
