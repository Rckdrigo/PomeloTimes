import React, {Component} from 'react';
import 'antd/dist/antd.css';
//import { Link} from 'react-router-dom';
import { Input, Tooltip, Icon, Col, Row } from 'antd';


class Signin extends Component{
    render = () => {
        return (
        <div>
            <Row>
                <Col xs={2} sm={4} md={6} lg={18}>
                    <h1>AURORA</h1>
                    <p>Framework 0.1</p>
                </Col>
                <Col xs={2} sm={4} md={8} lg={6}>
                    
                <Input
                    placeholder="Enter your username"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    suffix={
                    <Tooltip title="Extra information">
                        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                    }
                />
                </Col>
            </Row>
        </div>
        
        )
    }
}

export default Signin;