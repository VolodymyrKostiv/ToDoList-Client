import { Row, Col } from 'antd';
import { Main } from './components/Main'

import { Job } from './components/Job';

function App() {
  return (
    <div>
      <Row>
        <Col span={4} />
        <Col span={16}>
          <Main />
        </Col>
        <Col span={4} />
      </Row>
    </div>
  );
}

export default App;
