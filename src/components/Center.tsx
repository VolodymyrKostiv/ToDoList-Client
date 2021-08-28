import './styles/Center.css';

import React, { FC } from "react"
import { Job, JobProps, JobStatus } from './Job';


interface DownProps {
  readonly title: string;
}

export const Center: FC = () => {
    return (
      <Job />
    );
}