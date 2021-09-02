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

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const [form] = useForm<Job>();
    const [title, setTitle] = useState<string>(job.title);
    const [description, setDescription] = useState<string>(job.description);
    const [whoAssigned, setWhoAssigned] = useState<string>(job.whoAssigned);
    const [assignedTo, setAssignedTo] = useState<string>(job.assignedTo); 
    const [dateOfAssigning, setDateOfAssigning] = useState<Date | string | null>();
    const [dueToDate, setDueToDate] = useState<Date | string | null>(); 

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const validateMessages = {
        required: '${label} is required!',
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
            title: title,
            description: description,
            whoAssigned: whoAssigned,
            assignedTo: assignedTo,
            dateOfAssigning: dateOfAssigning? new Date(dateOfAssigning) : new Date(),
            dueToDate: dueToDate? new Date(dueToDate) : new Date(),
            status: job.status,
        }
        axios.put(
                URLtoBack + job.id, 
                newJob)
            .then(data => {
                console.log(data);

                message.success('Job was updated successfully!');

                const index = jobsList.findIndex(emp => emp.id === job.id);
                const alterJobsList = [...jobsList];
                alterJobsList[index] = newJob;

                setJobsList(alterJobsList);

                setIsModalVisible(false);
            })
            .catch((error: Error) => {
                console.log('Error during updating Item with id = ' + job.id);
                console.log(error);
                message.error('Error during updating');
                message.error(error.message);
            });
    }


    
    return (
        <Content> 

            <EditTwoTone onClick={handleOnEditClick}/> 
            <Divider type="vertical" />
            <Popconfirm title="Are you sure to delete this task?" onConfirm={handleDelete} okText="Yes" cancelText="No">
                <DeleteTwoTone  /> 
            </Popconfirm>   

            <Modal title="Edit task" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                <Form form={form} {...layout} name="nest-messages" onFinish={handleUpdate} validateMessages={validateMessages}>
                    <Form.Item name={['job', 'title']} label="Title" initialValue={job.title}>
                        <Input type="text" maxLength={100} onChange={x => setTitle(x.target.value)} />
                    </Form.Item>
                    <Form.Item name={['job', 'description']} label="Description">
                        <Input.TextArea maxLength={300} onChange={x => setDescription(x.target.value)} defaultValue={job.description}/>
                    </Form.Item>
                    <Form.Item name={['job', 'whoAssigned']} label="Who assigned" initialValue={job.whoAssigned}>
                        <Input type="text" maxLength={50} onChange={x => setWhoAssigned(x.target.value)} />
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

        </Content>
    );
}
