interface IconProps {
  size: number;
  fill: string;
}

export const TimerStartIcon = (props: IconProps) => {
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={props.size} 
      viewBox="0 -960 960 960" 
      width={props.size} 
      fill={props.fill}
    >
      <path d="M360-840v-80h240v80H360ZM480-80q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Zm-80 160 240-160-240-160v320Z"/>
    </svg>
  )
}

export const TimerPauseIcon = (props: IconProps) => {
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={props.size} 
      viewBox="0 -960 960 960" 
      width={props.size}
      fill={props.fill}
    >
      <path d="M360-840v-80h240v80H360ZM480-80q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280ZM360-280h80v-320h-80v320Zm160 0h80v-320h-80v320Z"/>
    </svg>
  )
}

export const TimerResetIcon = (props: IconProps) => {
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={props.size}
      viewBox="0 -960 960 960" 
      width={props.size}
      fill={props.fill}
    >
      <path d="m798-274-60-60q11-27 16.5-53.5T760-440q0-116-82-198t-198-82q-24 0-51 5t-56 16l-60-60q38-20 80.5-30.5T480-800q60 0 117.5 20T706-722l56-56 56 56-56 56q38 51 58 108.5T840-440q0 42-10.5 83.5T798-274ZM520-552v-88h-80v8l80 80ZM792-56l-96-96q-48 35-103.5 53.5T480-80q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-60 18.5-115.5T192-656L56-792l56-56 736 736-56 56ZM480-160q42 0 82-13t75-37L248-599q-24 35-36 75t-12 84q0 116 82 198t198 82ZM360-840v-80h240v80H360Zm83 435Zm113-112Z"/>
    </svg>
  )
}