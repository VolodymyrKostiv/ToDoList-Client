import React, { FC } from "react"

interface DownProps {
  readonly title : string;
}

export const Down:FC<DownProps> = ({title} : DownProps) => {
    return (
      <h4 className="text">{title}</h4>
    );
}
