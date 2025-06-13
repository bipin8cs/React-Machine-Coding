// Display 4 checkboxes with different names and 
// a button named selectallUser can select each checkbox 
// Select all button click will check all checkboxesButton should be disabled 
// once all checkboxes are selected.Display selected checkboxes count and names in ui.

import React, { useState } from 'react';
import { render } from 'react-dom';

const Checkbox = ({ label, checked, onChange }) => {
    return (<div>
        <label>
            <input type='checkbox' checked={checked} onChange={onChange} />
            {label}
        </label>
    </div>)
};
const DynamicCheckbox = () => {
    const [checkboxes, setCheckboxes] = useState([{
        id: 1, label: 'Checkbox 1', checked: false
    }, {
        id: 2, label: 'Checkbox 2', checked: false
    }, {
        id: 3, label: 'Checkbox 3', checked: false
    }, {
        id: 4, label: 'Checkbox 4', checked: false
    }]);

    const [selectedAllDisabled, setSelectedAllDisabled] = useState(false);
    const handleCheckboxChange = (id) => {
        const upadtedCheckboxes = checkboxes.map((checkbox) => {
            return checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox;
        });
        setCheckboxes(upadtedCheckboxes);
        const allChecked = upadtedCheckboxes.every((checkbox) => checkbox.checked);
        selectedAllDisabled(allChecked);
    }
    const handleSelectAll = () => {
        const updatedCheckboxes = checkboxes.map(e => {
            return { ...e, checked: !selectedAllDisabled }
        })
        setCheckboxes(updatedCheckboxes);
    }
    
    const checkedCheckboxes = checkboxes.filter(e => e.checked);
    const selectedCheckboxCount = checkedCheckboxes.length

    return (<div>
        {
            checkboxes.map((checkbox) => {
                return <Checkbox key={checkbox.id} label={checkbox.label} checked={checkbox.checked} onChange={() => {
                   handleCheckboxChange(checkbox.id)
                }} />
            })
        }
        <button onClick={handleSelectAll}>{selectedAllDisabled ? 'Deselect all' : 'Select All'}</button>
        <p>Selected:{selectedCheckboxCount}</p>
        <ul>
            {
                checkedCheckboxes.map(e => {
                    return <li id={e.id}>{e.label}</li>
                })
            }
        </ul>
    </div>)
}
export default DynamicCheckbox;
