import React, { FC } from "react"

interface DownProps {
  readonly title: string;
}

export const MainDown: FC<DownProps> = (downProps : DownProps) => {
    return (
      <h4 className="text">{downProps.title}</h4>
    );
}
