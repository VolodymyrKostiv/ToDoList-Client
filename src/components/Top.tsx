import React, { FC } from "react"

interface TopProps {
  title : string;
}

export const Top:FC<TopProps> = ({ title } : TopProps) => {
    return (
      <h1 className="text">{title}</h1>
    );
}