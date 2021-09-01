import './styles/JobsItemsList.css';

import { FC } from "react";
import { JobItem } from "./JobItem";

interface JobItemListProps {
    jobsList: Array<Job>;
    setJobsList: ChangeList;
}

export const JobItemList: FC<JobItemListProps> = ({ jobsList, setJobsList }: JobItemListProps) => {
    
    if(jobsList !== undefined && jobsList !== null && jobsList.length > 0) {
        return (
            <>  {
                    jobsList.map(jobIterator => {
                        return (
                            <JobItem key={jobIterator.id} job={jobIterator} jobsList={jobsList} setJobsList={setJobsList}/>
                        );
                    })
                }
            </>
        );
    } else {
        return (
            <h2 className="no-content-header">No elements</h2>
        );
    }
}
