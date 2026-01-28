interface IconProps {
  size: number;
  fill?: string;
  ariaHidden: boolean;
}

export const TimerStartIcon = (props: IconProps) => {
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={props.size} 
      viewBox="0 -960 960 960" 
      width={props.size} 
      fill={props.fill}
      aria-hidden={props.ariaHidden}
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
      aria-hidden={props.ariaHidden}
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
      aria-hidden={props.ariaHidden}
    >
      <path d="m798-274-60-60q11-27 16.5-53.5T760-440q0-116-82-198t-198-82q-24 0-51 5t-56 16l-60-60q38-20 80.5-30.5T480-800q60 0 117.5 20T706-722l56-56 56 56-56 56q38 51 58 108.5T840-440q0 42-10.5 83.5T798-274ZM520-552v-88h-80v8l80 80ZM792-56l-96-96q-48 35-103.5 53.5T480-80q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-60 18.5-115.5T192-656L56-792l56-56 736 736-56 56ZM480-160q42 0 82-13t75-37L248-599q-24 35-36 75t-12 84q0 116 82 198t198 82ZM360-840v-80h240v80H360Zm83 435Zm113-112Z"/>
    </svg>
  )
}

export const PlusMinusIcon = (props: IconProps) => {
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={props.size}
      viewBox="0 -960 960 960" 
      width={props.size}
      fill={props.fill}
      aria-hidden={props.ariaHidden}
    >
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560L200-200Zm380-40v-80h-80v-60h80v-80h60v80h80v60h-80v80h-60ZM240-620h200v-60H240v60Z"/>
    </svg>
  )
}

export const DeleteIcon = (props: IconProps) => {
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={props.size}
      viewBox="0 -960 960 960" 
      width={props.size}
      fill={props.fill}
      aria-hidden={props.ariaHidden}
    >
      <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/>
    </svg>
  )
}

export const SortIcon = (props: IconProps) => {
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={props.size}
      viewBox="0 -960 960 960" 
      width={props.size}
      fill={props.fill}
      aria-hidden={props.ariaHidden}
    >
      <path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z"/>
    </svg>
  )
}

export const NextIcon = (props: IconProps) => {
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={props.size}
      viewBox="0 -960 960 960" 
      width={props.size}
      fill={props.fill}
      aria-hidden={props.ariaHidden}
    >
      <path d="M240-400h80q0-59 43-99.5T466-540q36 0 67 16.5t51 43.5h-64v80h200v-200h-80v62q-32-38-76.5-60T466-620q-95 0-160.5 64T240-400ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
    </svg>
  )
}

export const AddNewIcon = (props: IconProps) => {
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={props.size}
      viewBox="0 -960 960 960" 
      width={props.size}
      fill={props.fill}
      aria-hidden={props.ariaHidden}
    >
      <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/>
    </svg>
  )
}

export const NewRoundIcon = (props: IconProps) => {
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={props.size}
      viewBox="0 -960 960 960" 
      width={props.size}
      fill={props.fill}
      aria-hidden={props.ariaHidden}
    >
      <path d="m360-120-57-56 64-64h-7q-117 0-198.5-81.5T80-520q0-117 81.5-198.5T360-800h240q117 0 198.5 81.5T880-520q0 117-81.5 198.5T600-240v-80q83 0 141.5-58.5T800-520q0-83-58.5-141.5T600-720H360q-83 0-141.5 58.5T160-520q0 83 58.5 142.5T360-312h16l-72-72 56-56 160 160-160 160Z"/>
    </svg>
  )
}

export const HeartPlusIcon = (props: IconProps) => {
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={props.size}
      viewBox="0 -960 960 960" 
      width={props.size}
      fill={props.fill}
      aria-hidden={props.ariaHidden}
    >
      <path d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q81 0 136 45.5T831-680h-85q-18-40-53-60t-73-20q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Zm280-160v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z"/>
    </svg>
  )
}

export const HeartMinusIcon = (props: IconProps) => {
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={props.size}
      viewBox="0 -960 960 960" 
      width={props.size}
      fill={props.fill}
      aria-hidden={props.ariaHidden}
    >
      <path d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q84 0 153 59t69 160q0 14-2 29.5t-6 31.5h-85q5-18 8-34t3-30q0-75-50-105.5T620-760q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Zm160-280v-80h320v80H600Z"/>
    </svg>
  )
}

export const LinkIcon = (props: IconProps) => {
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={props.size}
      viewBox="0 -960 960 960" 
      width={props.size}
      fill={props.fill}
      aria-hidden={props.ariaHidden}
    >
      <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/>    
    </svg>
  )
}

export const ResetIcon = (props: IconProps) => {
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={props.size}
      viewBox="0 -960 960 960" 
      width={props.size}
      fill={props.fill}
      aria-hidden={props.ariaHidden}
    >
      <path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z"/>    
    </svg>
  )
}

export const MeunIcon = (props: IconProps) => {
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={props.size}
      viewBox="0 -960 960 960" 
      width={props.size}
      fill={props.fill}
      aria-hidden={props.ariaHidden}
    >
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>    
    </svg>
  )
}

export const CloseIcon = (props: IconProps) => {
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height={props.size}
      viewBox="0 -960 960 960" 
      width={props.size}
      fill={props.fill}
      aria-hidden={props.ariaHidden}
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>    
    </svg>
  )
}