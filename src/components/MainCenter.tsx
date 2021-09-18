import './styles/Center.css';
import React, { FC, useEffect, useState } from "react"
import { AddNewJob } from './AddNewJob';
import { JobItemList } from './JobItemsList';
import { URLtoBack } from '../ConnectionString';
import axios from 'axios';

export const MainCenter: FC = () => {

  const [jobsList, setJobsList] = useState<Array<Job>>([]);

  useEffect(() => {
    async function fetchJobs() {
      const response = await axios.get(URLtoBack);
      const arrOfJobs : Array<Job> = response.data;
      setJobsList(arrOfJobs.reverse());           
      console.log(response.data);
    }
    fetchJobs();
  }, [])

  return (
    <>
      <AddNewJob jobsList={jobsList} setJobsList={setJobsList}/>
      <JobItemList jobsList={jobsList} setJobsList={setJobsList}/>
    </>
  );
}