import './styles/NewJob.css'
import { FC, useState } from "react";
import { Button, DatePicker, Form, Input, message, Modal } from 'antd';
import axios from 'axios';
import {URLtoBack} from '../ConnectionString';

interface AddNewJobProps {
    jobsList: Array<Job>;
    setJobsList: ChangeList;
}

export const AddNewJob: FC<AddNewJobProps> = ({ jobsList, setJobsList } : AddNewJobProps) => {

    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [whoAssigned, setWhoAssigned] = useState<string>("");
    const [assignedTo, setAssignedTo] = useState<string>(""); 
    const [dateOfAssigning, setDateOfAssigning] = useState<string | null>();
    const [dueToDate, setDueToDate] = useState<string | null>(); 

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleSubmit = () => { 
        const newJob: Job = {
            id: 0,
            title: title,
            description: description,
            whoAssigned: whoAssigned,
            assignedTo: assignedTo,
            dateOfAssigning: dateOfAssigning? new Date(dateOfAssigning) : new Date(),
            dueToDate: dueToDate? new Date(dueToDate) : new Date(),
            status: 0,
        }
        
        axios.post(
            URLtoBack,
            newJob)
            .then(response => {
                console.log(response);
                newJob.id = response.data.id;
            })
            .catch(e => {
                console.log('Error during adding new item');
                message.error('Error during status adding new item!');
            });
        
        message.success('Job was added successfully!');
        setIsModalVisible(false);

        setJobsList([
            ...jobsList, 
            newJob   
        ]);
        form.resetFields();
    }

    const handleCancel = () => { 
        setIsModalVisible(false);
        form.resetFields();
    }

    const validateMessages = {
        required: '${label} is required!',
    };

    return (
        <>
            <Button className="new-job-button" onClick={showModal}>
                Add new job
            </Button>

            <Modal title="New job" visible={isModalVisible} onOk={handleSubmit} onCancel={handleCancel}>
                <Form form={form} {...layout} name="nest-messages" onFinish={handleSubmit} validateMessages={validateMessages}>
                    <Form.Item name={['job', 'title']} label="Title" rules={[{ required: true }]}>
                        <Input type="text" maxLength={100} onChange={x => setTitle(x.target.value)} />
                    </Form.Item>
                    <Form.Item name={['job', 'description']} label="Description">
                        <Input.TextArea maxLength={300} onChange={x => setDescription(x.target.value)}/>
                    </Form.Item>
                    <Form.Item name={['job', 'whoAssigned']} label="Who assigned" rules={[{ required: true }]}>
                        <Input type="text" maxLength={50} onChange={x => setWhoAssigned(x.target.value)}/>
                    </Form.Item>
                    <Form.Item name={['job', 'assignedTo']} label="Assigned to" rules={[{ required: true }]}>
                        <Input type="text" maxLength={50} onChange={x => setAssignedTo(x.target.value)}/>
                    </Form.Item>
                    <Form.Item name={['job', 'dateOfAssigning']} label="Date of assigning" >
                        <DatePicker onChange={x => setDateOfAssigning(x?.toString())} />
                    </Form.Item>
                    <Form.Item name={['job', 'dueToDate']} label="Due to" rules={[{ required: true }]}>
                        <DatePicker onChange={x => setDueToDate(x?.toString())}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}