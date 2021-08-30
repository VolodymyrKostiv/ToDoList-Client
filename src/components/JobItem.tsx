import './styles/Job.css';
import React, { FC, useState } from "react";
import { Form, Input, Card, Typography, Modal, Steps, Popconfirm, message, Divider, DatePicker, Space } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import { URLtoBack } from '../App';

const { Paragraph, Text } = Typography;
const { Step } = Steps;

interface JobItemProps {
    job: Job;
}

export const JobItem: FC<JobItemProps> = ({job} : JobItemProps) => {

    const [ellipsis, setEllipsis] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [form] = useForm();

    const [title, setTitle] = useState<string>(job.title);
    const [description, setDescription] = useState<string>(job.description);
    const [whoAssigned, setWhoAssigned] = useState<string>(job.whoAssigned);
    const [assignedTo, setAssignedTo] = useState<string>(job.assignedTo); 
    const [dateOfAssigning, setDateOfAssigning] = useState<Date | string | null>();
    const [dueToDate, setDueToDate] = useState<Date | string | null>(); 
    const [current, setCurrent] = useState<number>(job.status);

    const showModal = () => { 
        setIsModalVisible(true);
    }
    const handleCancel = () => { 
        setIsModalVisible(false);
        form.resetFields();
    }
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const handleDelete = () => {
        try { 
            axios.delete(URLtoBack + job.id);
            message.success('Task was deleted');
        } catch {
            console.log('Error during deleting Item with id = ' + job.id);
            message.error('Error during deleting');
        } 
    }

    const handleUpdate = () => {
        const newJob: Omit<Job, "id"  | "status"> = {
            title: title,
            description: description,
            whoAssigned: whoAssigned,
            assignedTo: assignedTo,
            dateOfAssigning: dateOfAssigning? new Date(dateOfAssigning) : new Date(),
            dueToDate: dueToDate? new Date(dueToDate) : new Date(),
        }

        try {
            axios.put(URLtoBack + job.id, newJob);
            message.success('Job was updated successfully!');
        } catch {
            console.log('Error during updating Item with id = ' + job.id);
            message.error('Error during updating');
        }
        
        setIsModalVisible(false);
        form.resetFields();
    }
    
    const handleUpdateStatus = (current : number) => {

        const newJob: Job = {
            id: job.id,
            title: job.title,
            description: job.description,
            whoAssigned: job.whoAssigned,
            assignedTo: job.assignedTo,
            dateOfAssigning: job.dateOfAssigning,
            dueToDate: job.dueToDate,
            status: current,
        }

        try {
            axios.put(URLtoBack + job.id, newJob);
        } catch {
            console.log('Error during updating Item with id = ' + job.id);
            message.error('Error during updating');
        }

        setCurrent(current);
    }

    const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
    };

    return (
             
        <Card title={job.title} extra={
            <Content> 
                <EditTwoTone onClick={showModal}/> 
                <Divider type="vertical" />
                <Popconfirm title="Are you sure to delete this task?" onConfirm={handleDelete} okText="Yes" cancelText="No">
                    <DeleteTwoTone  /> 
                </Popconfirm>  
            </Content>
            } className="job-card">

            <Paragraph ellipsis={ellipsis ? { rows: 3, expandable: true, symbol: 'more'} : false}>
                {job.description == "" ? "\'No description\'" : job.description}
            </Paragraph>

            <Divider />

            <Text>Assigned to </Text>
            <Text strong>{job.assignedTo}</Text>
            <Text> by {job.whoAssigned} on {job.dateOfAssigning.toLocaleString()} due to </Text>
            <Text strong>{job.dueToDate.toLocaleString()}</Text>
           
            <Divider />

            <Steps current={current} onChange={handleUpdateStatus} size="small">
                <Step title="Waiting"/>
                <Step title="In progress" />
                <Step title="Done" />
            </Steps>

            <Modal title="Edit task" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                <Form form={form} {...layout} name="nest-messages" onFinish={handleUpdate} validateMessages={validateMessages}>
                    <Form.Item name={['job', 'title']} label="Title">
                        <Input type="text" maxLength={100} onChange={x => setTitle(x.target.value)} defaultValue={job.title}/>
                    </Form.Item>
                    <Form.Item name={['job', 'description']} label="Description">
                        <Input.TextArea maxLength={300} onChange={x => setDescription(x.target.value)} defaultValue={job.description}/>
                    </Form.Item>
                    <Form.Item name={['job', 'whoAssigned']} label="Who assigned">
                        <Input type="text" maxLength={50} onChange={x => setWhoAssigned(x.target.value)} defaultValue={job.whoAssigned}/>
                    </Form.Item>
                    <Form.Item name={['job', 'assignedTo']} label="Assigned to">
                        <Input type="text" maxLength={50} onChange={x => setAssignedTo(x.target.value)} defaultValue={job.assignedTo}/>
                    </Form.Item>
                    <Form.Item name={['job', 'dateOfAssigning']} label="Date of assigning">
                        <DatePicker onChange={x => setDateOfAssigning(x?.toString())} />
                    </Form.Item>
                    <Form.Item name={['job', 'dueToDate']} label="Due to">
                        <DatePicker onChange={x => setDueToDate(x?.toString())} />
                    </Form.Item>
                </Form>
            </Modal>

        </Card>
    );
};