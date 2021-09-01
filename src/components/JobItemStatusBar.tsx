import { message, Steps } from "antd";
import axios from "axios";
import { FC, useState } from "react";
import { URLtoBack } from "../ConnectionString";

const { Step } = Steps;

interface JobStatusBarProps {
    job: Job;
}

export const JobItemStatusBar: FC<JobStatusBarProps> = ({ job }: JobStatusBarProps) => {

    const [currentStatus, setCurrentStatus] = useState<number>(job.status);

    const handleUpdateStatus = (newStatus : number) => {

        const newJob: Job = {
            id: job.id,
            title: job.title,
            description: job.description,
            whoAssigned: job.whoAssigned,
            assignedTo: job.assignedTo,
            dateOfAssigning: job.dateOfAssigning,
            dueToDate: job.dueToDate,
            status: newStatus,
        }

        axios.put(URLtoBack + job.id, newJob)
            .catch(e => {
                console.log('Error during updating status of item with id = ' + job.id);
                message.error('Error during status updating!');
            });
        setCurrentStatus(newStatus);
    }
    
    return (
        <Steps current={currentStatus} onChange={handleUpdateStatus} size="small">
            <Step title="Waiting"/>
            <Step title="In progress" />
            <Step title="Done" />
        </Steps>
    );    
}
