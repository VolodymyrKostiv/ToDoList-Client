import './styles/Job.css';

import React, { FC, useState } from "react";
import { Form, Input, InputNumber, Button, Card, Typography, Modal, Steps, Popconfirm, message } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';

const { Paragraph } = Typography;

const { Step } = Steps;

export enum JobStatus {
    Waiting,
    InProgress,
    Done
}

export interface JobProps {
    title: string;
    description: string;
    assignedTo: string;
    dateOfAssigning: Date;
    dueToDate: Date;
    status: JobStatus;
}

export const Job : FC = () => {

    const [ellipsis, setEllipsis] = React.useState(true);
    const [current, setCurrent] = React.useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const onChange = (current : number) => setCurrent(current);
    const showModal = () => setIsModalVisible(true);
    const handleSubmit = () => { 
        setIsModalVisible(false);
        console.log(1);
    }
    const handleCancel = () => { 
        setIsModalVisible(false);
        form.resetFields();
    }
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const confirmDelete = () => {
        message.success('Task was deleted');
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
        <Card title="AD" className="job-card">

            <Paragraph ellipsis={ellipsis ? { rows: 3, expandable: true, symbol: 'more'} : false}>
                Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                Design, a design language for background applications, is refined by Ant UED Team.
                Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
            </Paragraph>

            <Steps current={current} onChange={onChange} size="small">
                <Step title="Waiting"/>
                <Step title="In progress" />
                <Step title="Done" />
            </Steps>

            <Content>
                <Button type="primary" className="job-button" onClick={showModal}>
                    Edit
                </Button>
                <Popconfirm
                    title="Are you sure to delete this task?"
                    onConfirm={confirmDelete}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger className="job-button">
                                    Delete
                                </Button>
                </Popconfirm>
            </Content>   

            <Modal title="Edit task" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                <Form form={form} {...layout} name="nest-messages" onFinish={handleSubmit} validateMessages={validateMessages}>
                    <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'introduction']} label="Introduction">
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};