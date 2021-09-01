import './styles/Job.css';
import { Card } from 'antd';
import { FC } from "react";
import { JobItemContent } from './JobItemContent';
import { JobItemStatusBar } from './JobItemStatusBar';
import { JobItemExtra } from './JobItemExtra';

interface JobItemProps {
    job: Job;
    jobsList: Array<Job>;
    setJobsList: ChangeList;
}

export const JobItem: FC<JobItemProps> = ({ job, jobsList, setJobsList }: JobItemProps) => {
    return (    
        <Card title={job.title} extra={<JobItemExtra job={job} jobsList={jobsList} setJobsList={setJobsList}/>} className="job-card">

            <JobItemContent job={job} />

            <JobItemStatusBar job={job} />
                    
        </Card>
    );
};