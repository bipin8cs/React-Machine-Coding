import React, { useState } from 'react';

function ChipsInput() {
    const [inputText, setInputText] = useState("");
    const [chips, setChips] = useState(["Akshay", "Bipin"]);
    const handleKeyDown = (e) => {
        debugger
        if (e.key === 'Enter'&&inputText!=='') {
            setChips(prev => {
                return [...prev, e?.target?.value];
            })
            setInputText('')
        }

    }
    const handleDeleteChips = (i) => {
        const copyChipis = [...chips];
        copyChipis.splice(i, 1);
        setChips(copyChipis);

    }
    return <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
        <h2>Chip input</h2>
        <input style={{ height: '30px', width: '500px' }} type="text" value={inputText} placeholder="Type a chip and press tag" onChange={(e) => {
            setInputText(e.target.value);
        }}
            onKeyDown={(e) => {
                handleKeyDown(e)

            }} />
            <div style={{display:'flex'}}>
  {
            chips.map((e, i) => {
                return <div style={{ margin: '10px', boarder: '1px solid blue', backgroundColor: 'Gray', padding: '5px', padding: '10px' }}>{e}
                    <button style={{ color: 'red' }} onClick={(i) => {
                        handleDeleteChips(i)
                    }}>remove</button>
                </div>
            })
        }
            </div>

        

    </div>
}
export default ChipsInput;
