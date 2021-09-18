import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons"
import { DatePicker, Divider, Form, Input, message, Modal, Popconfirm } from "antd"
import { useForm } from "antd/lib/form/Form";
import { Content } from "antd/lib/layout/layout"
import axios from "axios";
import { FC, useState } from "react";
import { URLtoBack } from "../ConnectionString";

interface JobItemExtraProps {
    job: Job;
    jobsList: Array<Job>;
    setJobsList: ChangeList;
}

export const JobItemExtra: FC<JobItemExtraProps> = ({ job, jobsList, setJobsList }: JobItemExtraProps) => {

    const [form] = useForm<Job>();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    
    const [dateOfAssigning, setDateOfAssigning] = useState<string | null>();
    const [dueToDate, setDueToDate] = useState<string | null>(); 

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const handleOnEditClick = () => {
        setIsModalVisible(true)
    } 

    const handleDelete = () => {
        axios.delete(URLtoBack + job.id)
            .catch(e => {
                console.log('Error during deleting Item with id = ' + job.id);
                message.error('Error during deleting');
            });

        message.success('Task was deleted');

        setJobsList(jobsList.filter(item => item.id !== job.id));
    }

    const handleCancel = () => { 
        setIsModalVisible(false);
        form.resetFields();
    }
   
    const handleUpdate = () => {

        const newJob: Job = {
            id: job.id,
            title: form.getFieldValue(['job', 'title']) ? form.getFieldValue(['job', 'title']) : job.title,
            description: form.getFieldValue(['job', 'description']) ? form.getFieldValue(['job', 'description']) : 'No description',
            whoAssigned: form.getFieldValue(['job', 'whoAssigned']) ? form.getFieldValue(['job', 'whoAssigned']) : job.whoAssigned,
            assignedTo: form.getFieldValue(['job', 'assignedTo']) ? form.getFieldValue(['job', 'assignedTo']) : job.assignedTo,
            dateOfAssigning: dateOfAssigning? new Date(dateOfAssigning) : new Date(job.dateOfAssigning),
            dueToDate: dueToDate? new Date(dueToDate) : new Date(job.dueToDate),
            status: job.status,
        }
        axios.put(
                URLtoBack + job.id, 
                newJob)
            .then(data => {
                console.log(data);

                message.success('Job was updated successfully!');

                fetchJobs()

                setIsModalVisible(false);
            })
            .catch((error: Error) => {
                console.log('Error during updating Item with id = ' + job.id);
                console.log(error);

                message.error('Error during updating');
                message.error(error.message);
            })
            .finally(() => {
                form.resetFields();
            });
    }

    async function fetchJobs() {
        const response = await axios.get(URLtoBack);
        const arrOfJobs : Array<Job> = response.data;
        setJobsList(arrOfJobs.reverse());           
        console.log(response.data);
    }
    
    return (
        <Content> 

            <EditTwoTone onClick={handleOnEditClick}/> 
            <Divider type="vertical" />
            <Popconfirm title="Are you sure to delete this task?" onConfirm={handleDelete} okText="Yes" cancelText="No">
                <DeleteTwoTone  /> 
            </Popconfirm>   

            <Modal title="Edit task" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                <Form form={form} {...layout} name="nest-messages" onFinish={handleUpdate}>
                    <Form.Item required={true} name={['job', 'title']} label="Title" initialValue={job.title}>
                        <Input required={true} type="text" maxLength={100} />
                    </Form.Item>
                    <Form.Item name={['job', 'description']} label="Description" initialValue={job.description}> 
                        <Input.TextArea maxLength={300} />
                    </Form.Item>
                    <Form.Item required={true} name={['job', 'whoAssigned']} label="Who assigned" initialValue={job.whoAssigned}>
                        <Input required={true} type="text" maxLength={50} />
                    </Form.Item>
                    <Form.Item required={true} name={['job', 'assignedTo']} label="Assigned to" initialValue={job.assignedTo}>
                        <Input required={true} type="text" maxLength={50} />
                    </Form.Item>
                    <Form.Item required={true} name={['job', 'dateOfAssigning']} label="Date of assigning">
                        <DatePicker onChange={x => setDateOfAssigning(x?.toString())} />
                    </Form.Item>
                    <Form.Item required={true} name={['job', 'dueToDate']} label="Due to">
                        <DatePicker onChange={x => setDueToDate(x?.toString())} />
                    </Form.Item>
                </Form>
            </Modal>    

        </Content>
    );
}