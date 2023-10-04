import React, { ReactElement } from "react";
import './ChooseNodeType.css';

interface ChooseNodeTypeProps {
    handleChooseNodeType: (type: 'category' | 'service' | null) => void;
}

const ChooseNodeType: React.FC<ChooseNodeTypeProps> = ({ handleChooseNodeType }): ReactElement => {
    return (
        <div className="choose-container">
            <p>What do you want to create?</p>
            <div className="choose-container--buttons">
                <button type="button" onClick={() => handleChooseNodeType('category')}>Category</button>
                <button type="button" onClick={() => handleChooseNodeType('service')}>Service</button>
            </div>
        </div>
    )
};

export default ChooseNodeType;
