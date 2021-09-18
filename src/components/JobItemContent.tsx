import { Divider, Typography } from 'antd'
import moment from 'moment';
import { FC, useState } from 'react'

const { Paragraph, Text } = Typography;

interface JobItemContentProps {
    job: Job;
}

export const JobItemContent: FC<JobItemContentProps> = ({ job } : JobItemContentProps) => {

    const [ellipsis, setEllipsis] = useState(true);

    return (
        <>
            <Paragraph ellipsis={ellipsis ? { rows: 3, expandable: true, symbol: 'more'} : false}>
                {job.description == "" ? "\'No description\'" : job.description}
            </Paragraph>

            <Divider />

            <Text>Assigned to </Text>
            <Text strong>{job.assignedTo}</Text>
            <Text> by {job.whoAssigned} on {moment(job.dateOfAssigning.toLocaleString()).format("DD.MM.YYYY")} due to </Text>
            <Text strong>{moment(job.dueToDate.toLocaleString()).format("DD.MM.YYYY")}</Text>
           
            <Divider />
        </>
    );
}
