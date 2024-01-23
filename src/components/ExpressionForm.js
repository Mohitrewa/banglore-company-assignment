// ExpressionForm.js
import React, { useState } from 'react';
import { Button, Form, Dropdown } from 'react-bootstrap';
import './styles.css'; // Import your custom styles


const ExpressionForm = () => {
  const [connector, setConnector] = useState('AND');
  const [expressions, setExpressions] = useState([]);

  const handleAddExpression = () => {
    setExpressions([...expressions, { ruleType: 'Age', operator: '>=', value: '', score: '' }]);
  };

  const handleDeleteExpression = (index) => {
    const updatedExpressions = [...expressions];
    updatedExpressions.splice(index, 1);
    setExpressions(updatedExpressions);
  };

  const handleExpressionChange = (index, field, value) => {
    const updatedExpressions = [...expressions];
    updatedExpressions[index][field] = value;
    setExpressions(updatedExpressions);
  };

  const handleSubmit = () => {
    // Implement your logic to handle the submitted data
    console.log({
      rules: expressions.map((exp) => ({
        key: exp.ruleType.toLowerCase().replace(' ', '_'),
        output: {
          value: exp.value,
          operator: exp.operator,
          score: exp.score,
        },
      })),
      combinator: connector.toLowerCase(),
    });
  };

  return (
    <Form>
      <Form.Group controlId="connector">
        <Form.Label>Connector Type</Form.Label>
        <Form.Control as="select" value={connector} onChange={(e) => setConnector(e.target.value)}>
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </Form.Control>
      </Form.Group>

      {expressions.map((expression, index) => (
        <div key={index}>
          <Form.Group controlId={`ruleType${index}`}>
            <Form.Label>Rule Type</Form.Label>
            <Dropdown onSelect={(value) => handleExpressionChange(index, 'ruleType', value)}>
              <Dropdown.Toggle variant="success" id={`dropdown-ruleType${index}`}>
                {expression.ruleType || 'Select Rule Type'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Age">Age</Dropdown.Item>
                <Dropdown.Item eventKey="Credit Score">Credit Score</Dropdown.Item>
                <Dropdown.Item eventKey="Account Balance">Account Balance</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>

          {/* Similar Form.Group for Operator, Value, and Score */}

          <Button variant="danger" onClick={() => handleDeleteExpression(index)}>
            Delete
          </Button>
        </div>
      ))}

      <Button variant="primary" onClick={handleAddExpression}>
        Add Expression
      </Button>

      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default ExpressionForm;
