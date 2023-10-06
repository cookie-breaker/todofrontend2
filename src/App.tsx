// Omalshi Rajapaksha - IN070359

import React, { useState } from 'react';
import { Button, Input, List, Space, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>('');

  const addTask = () => {
    if (newTaskText.trim() === '') {
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div style={{ width: '80%', maxWidth: '600px', textAlign: 'center'  }}>
        <div style={{ padding: '20px', border: '2px solid #ccc', borderRadius: '10px' , backgroundColor : '#b8bbbf' }}>
        <h1 style={{ color: '#2c3e50',  fontSize: '48px' }}>ToDo Agenda</h1>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Input
              value={newTaskText}
              onChange={e => setNewTaskText(e.target.value)}
              placeholder="Enter a new task"
              style={{ flex: 1, marginRight: '10px' }}
            />
            <Button onClick={addTask} type="primary" >
              Add Task
            </Button>
          </div>
          <List
            dataSource={tasks}
            renderItem={task => (
              <List.Item>
                <Space>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleTaskCompletion(task.id)}
                  />
                  <span
                    style={{
                      fontSize: '18px',
                      textDecoration: task.completed ? 'line-through' : 'none',
                      flex: 1,
                      color: '#444444',
                    }}
                  >
                    {task.text}
                  </span>
                  <Button
                    type="text"
                    icon={<DeleteOutlined style={{ color: 'red' }} />}
                    onClick={() => deleteTask(task.id)}
                  />
                </Space>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
