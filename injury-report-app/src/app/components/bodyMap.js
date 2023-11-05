import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, List, Space } from 'antd';

const BodyMap = () => {
    const canvasRef = useRef(null);
    const [circles, setCircles] = useState([]);
    const [injuryAreas, setInjuryAreas] = useState([]);

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
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

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

    const removeInjuryArea = (label) => {
        const updatedAreas = injuryAreas.filter((area) => area.label !== label);
        setInjuryAreas(updatedAreas);
    };

    const saveInjuryReport = () => {
        const currentDate = new Date();

        if (name && injuryDate && injuryDate.length === 2) {
            const injuryDateStart = injuryDate[0].toDate();
            const injuryDateEnd = injuryDate[1].toDate();

            const bodyMapAreas = injuryAreas.map((area) => ({
                label: area.label,
                location: area.location || '',
                description: area.details || '',
            }));

            const formattedReport = {
                reporterName: name,
                dateOfInjuryStart: injuryDateStart,
                dateOfInjuryEnd: injuryDateEnd,
                dateOfReport: currentDate,
                bodyMapAreas: bodyMapAreas,
            };
            console.log(formattedReport);
        }
    };

    return (
        <div>
            <div className="body-map" style={{ position: 'relative', maxWidth: '50%', margin: '0 auto' }}>
                <img
                    src="/assets/BodyMap.png"
                    alt="Body Map"
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                />
                <canvas
                    ref={canvasRef}
                    className="canvas"
                    width={800}
                    height={600}
                    onClick={handleBodyMapClick}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
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
        </div>
    );
};

export default BodyMap;
