import './styles/NewJob.css'
import React, { FC, useState } from "react";
import { Button, DatePicker, Form, Input, message, Modal } from 'antd';
import axios from 'axios';

export const NewJob: FC = () => {

    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [inputJob, setInputJob] = useState<Job>();

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [whoAssigned, setWhoAssigned] = useState<string>("");
    const [assignedTo, setAssignedTo] = useState<string>(""); 
    const [dateOfAssigning, setDateOfAssigning] = useState<string | null>();
    const [dueToDate, setDueToDate] = useState<string | null>(); 

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    const showModal = () => {
        setIsModalVisible(true);
    }
    const handleSubmit = () => { 
        const newJob: Omit<Job, "id"  | "status"> = {
            title: title,
            description: description,
            whoAssigned: whoAssigned,
            assignedTo: assignedTo,
            dateOfAssigning: dateOfAssigning? new Date(dateOfAssigning) : new Date(),
            dueToDate: dueToDate? new Date(dueToDate) : new Date(),
        }
        try {
            const savedJob = axios.post(
                'https://localhost:44360/api/jobs/',
                newJob
            );
            setIsModalVisible(false);
            message.success('Job was updated successfully!');
            form.resetFields();
        } catch {

        }
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
                        <Input type="text" maxLength={100} onChange={x => setTitle(x.target.value)}/>
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