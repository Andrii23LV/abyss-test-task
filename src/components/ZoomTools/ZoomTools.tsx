import React, { ReactElement } from 'react';
import './ZoomTools.css';

interface ZoomToolsProps {
    zoomFactor: number
    zoomIn: () => void
    zoomOut: () => void
    handleZoomChange: (percent: number) => void
}

const ZoomTools: React.FC<ZoomToolsProps> = ({ zoomFactor, zoomIn, zoomOut, handleZoomChange }): ReactElement => {
    const zoomPercent = Math.round(zoomFactor * 100);
    return (
        <div className="zoom-container">
            <button onClick={zoomIn}>+</button>
            <select value={zoomPercent} onChange={(e) => handleZoomChange(Number(e.target.value))}>
                <option value={70}>70%</option>
                <option value={80}>80%</option>
                <option value={90}>90%</option>
                <option value={100}>100%</option>
                <option value={110}>110%</option>
                <option value={120}>120%</option>
                <option value={130}>130%</option>
            </select>
            <button onClick={zoomOut}>-</button>
        </div>
    );
};

export default ZoomTools;
