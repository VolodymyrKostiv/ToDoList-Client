import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { URLtoBack } from "../App";
import { JobItem } from "./JobItem";

export const JobItemList: FC = () => {
    
    const [jobsList, setJobsList] = useState<Array<Job>>();

    useEffect(() => {
        try{
            fetchJobs();
        } catch (error) {
            console.log("Can't get items list. " + error);
        }
    }, [])

    async function fetchJobs() {
        const response = await axios.get(URLtoBack);
        setJobsList(response.data);           
        console.log(response.data);
        console.log(jobsList);
    }

    if(jobsList !== undefined) {
        return (
            <>  {
                    jobsList.map(jobIterator => {
                        return (
                            <JobItem key={jobIterator.id} job={jobIterator} />
                        );
                    })
                }
            </>
        );
    } else {
        return (
            <h2>No elements</h2>
        );
    }
}
