import React, { FC } from "react"

interface TopProps {
  readonly title: string;
}

export const Top:FC<TopProps> = (topProps : TopProps) => {
    return (
      <h1 className="text">{topProps.title}</h1>
    );
}