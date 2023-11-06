import React, { useState, useRef, useEffect } from 'react';
import { Input, DatePicker, Button, List, Space, Card, message } from 'antd';
import axios from 'axios';
import '../styles/InjuryReportingComponent.css';


const { RangePicker } = DatePicker;

const InjuryReportingComponent = () => {
  const [name, setName] = useState('');
  const [injuryDate, setInjuryDate] = useState(null);
  const [injuryAreas, setInjuryAreas] = useState([]);
  const labelCounter = injuryAreas.length + 1;
  const canvasRef = useRef(null);
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    drawCircles();
  }, [circles]);

  const drawCircles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach((circle) => {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  };

  const handleBodyMapClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
  
    const newCircle = {
      x,
      y,
      radius: 10,
      label: '',
      description: '',
    };
  
    setCircles([...circles, newCircle]);
  
    // Create a new injury area with default values
    setInjuryAreas([...injuryAreas, { label: `Area ${circles.length + 1}`, location: '', details: '' }]);
  };
  
  



  const addInjuryArea = () => {
    setInjuryAreas([...injuryAreas, { label: labelCounter }]);
  };

  const removeInjuryArea = (labelToRemove) => {
    const updatedAreas = injuryAreas.filter((area) => area.label !== labelToRemove);
    setInjuryAreas(updatedAreas);
  };

  const saveInjuryReport = () => {
    const currentDate = new Date();
  
    if (name && injuryDate && injuryDate.length === 2) {
      const injuryDateStart = injuryDate[0].toDate();
      const injuryDateEnd = injuryDate[1].toDate();
  
      const bodyMapAreas = injuryAreas.map((area) => ({
        label: area.location || '',
        description: area.details || '',
      }));
  
      const formattedReport = {
        reporterName: name,
        dateOfInjuryStart: injuryDateStart,
        dateOfInjuryEnd: injuryDateEnd,
        dateOfReport: currentDate,
        bodyMapAreas: bodyMapAreas,
      };
  
      console.log('Injury Report Data:', formattedReport);
  
      // Send a POST request to your backend server using Axios
      axios
        .post('https://my-app-4psy.onrender.com/reports', formattedReport)
        .then((response) => {
          console.log('Injury Report saved successfully.');
          message.success('Injury Report saved successfully');
          // Reset the form fields
          setName('');
          setInjuryDate(null);
          setInjuryAreas([]);
          setCircles([]);
        })
        .catch((error) => {
          console.error('Failed to save Injury Report:', error);
          // You can add code here to handle errors, like showing an error message.
        });
    }
  };
  

  return (
    <div className="injury-report-container">
      <Card title="Create Injury Report" className="report-card">
        <Space direction="vertical">
          <Input
            placeholder="Name of Reporter"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <RangePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder={['Date & Time of Injury', 'Date & Time of Injury']}
            value={injuryDate}
            onChange={(dates) => setInjuryDate(dates)}
          />

          <div className="body-map-container">
            <img
              src="/assets/BodyMap.png"
              alt="Body Map"
              className="body-map"
            />
            <canvas
              ref={canvasRef}
              className="canvas"
              width={800}
              height={600}
              onClick={handleBodyMapClick}
            />
          </div>

          <div>
            <Button type="primary" onClick={() => setInjuryAreas([...injuryAreas, { label: `Area ${circles.length + 1}`, location: '', details: '' }])}>
              Add Injury Area
            </Button>
            <List
              itemLayout="horizontal"
              dataSource={injuryAreas}
              renderItem={(area) => (
                <List.Item>
                  <Space>
                    <Input
                      placeholder={`Location for ${area.label}`}
                      value={area.location || ''}
                      onChange={(e) => {
                        const updatedAreas = injuryAreas.map((a) =>
                          a.label === area.label ? { ...a, location: e.target.value } : a
                        );
                        setInjuryAreas(updatedAreas);
                      }}
                    />
                    <Input
                      placeholder={`Details for ${area.label}`}
                      value={area.details || ''}
                      onChange={(e) => {
                        const updatedAreas = injuryAreas.map((a) =>
                          a.label === area.label ? { ...a, details: e.target.value } : a
                        );
                        setInjuryAreas(updatedAreas);
                      }}
                    />
                    <Button type="danger" onClick={() => removeInjuryArea(area.label)}>
                      Remove
                    </Button>
                  </Space>
                </List.Item>
              )}
            />
          </div>
          <div>
            <Button type="primary" onClick={saveInjuryReport}>
              Save Injury Report
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default InjuryReportingComponent;