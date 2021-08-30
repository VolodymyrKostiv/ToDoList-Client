import axios from "axios";
import React, { FC, useEffect, useState } from "react";
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
        const response = await axios.get('https://localhost:44360/api/jobs/');
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
            <div>No elements</div>
        );
    }
}
