import './styles/Center.css';
import React, { FC, useState } from "react"
import { JobItem } from './JobItem';
import { NewJob } from './NewJob';
import { JobItemList } from './JobItemList';

export const Center: FC = () => {
    return (
      <>
        <NewJob />
        <JobItemList />
      </>
    );
}