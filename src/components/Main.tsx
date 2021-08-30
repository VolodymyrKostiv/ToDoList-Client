import './styles/Main.css';
import './styles/Top.css';
import './styles/Down.css';
import React, { FC } from "react";
import { Layout } from 'antd';
import { Top } from './MainTop';
import { Center } from './MainCenter';
import { Down } from './MainDown';

const { Header, Footer, Content } = Layout;

export const Main:FC = () => {
    return (
        <Layout>
            <Header className="main-header">
                <Top title="ToDoList"/>
            </Header>
            <Content>
                <Center />
            </Content>
            <Footer className="main-footer">
                <Down title="Volodymyr Kostiv, 2021"/>
            </Footer>
        </Layout>
    );
}