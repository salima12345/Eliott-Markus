import React from 'react'

interface ArrowUpRightIconProps {
  color?: string
  width?: number
  height?: number
}

const ArrowUpRightIcon: React.FC<ArrowUpRightIconProps> = ({ 
  color = 'currentColor', 
  width = 17.879, 
  height = 17.879 
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 17.879 17.879"
    >
      <g id="Icon_feather-arrow-up-right" data-name="Icon feather-arrow-up-right" transform="translate(-9.086 -9.086)">
        <path 
          id="Tracé_2300" 
          data-name="Tracé 2300" 
          d="M10.5,25.55,25.55,10.5" 
          fill="none" 
          stroke={color} 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2"
        />
        <path 
          id="Tracé_2301" 
          data-name="Tracé 2301" 
          d="M10.5,10.5H25.55V25.55" 
          fill="none" 
          stroke={color} 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2"
        />
      </g>
    </svg>
  )
}

export default ArrowUpRightIcon

