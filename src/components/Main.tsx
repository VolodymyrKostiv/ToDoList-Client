import './styles/Main.css';
import './styles/Top.css';
import './styles/Down.css';
import React, { FC } from "react";
import { Layout } from 'antd';
import { MainTop } from './MainTop';
import { MainCenter } from './MainCenter';
import { MainDown } from './MainDown';

const { Header, Footer, Content } = Layout;

export const Main: FC = () => {
    return (
        <Layout>
            <Header className="main-header">
                <MainTop title="ToDoList"/>
            </Header>
            <Content>
                <MainCenter />
            </Content>
            <Footer className="main-footer">
                <MainDown title="Volodymyr Kostiv, 2021"/>
            </Footer>
        </Layout>
    );
}