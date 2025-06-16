
import { useEffect } from "react";
import { useState, useRef } from "react"
const OTP_DIGITS_COUNT = 5;
//What no digit will 
const otpDigitBox = Array.from({ length: OTP_DIGITS_COUNT }, (value, index) => {
    return {
        'id': index
    }
}
);

const OtpInput = () => {
    const [inputArr, setInputArr] = useState(new Array(otpDigitBox).fill(''));
    const refArr = useRef([]);

    useEffect(() => {
        refArr.current[0]?.focus();
    }, [])

    console.log('refArray', refArr)
    const handleOnChange = (val, i) => {
        if (isNaN(val)) return;
        setInputArr((prev) => {
            const updatedInput = [...prev];
            updatedInput[i] = val.slice(-1);
            return updatedInput;
        })
        val && refArr.current[i + 1]?.focus();
    }
    const handleOnKeyDown = (e, i) => {
        if (!e.target.value && e.key === 'Backspace') {
            //!e.target.value if do not add the focus will goes first tp prev then 
            refArr.current[i - 1]?.focus()
        }
    }
    return <div style={{ textAlign: 'center' }}>
        <h1>Enter the Input</h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {
                otpDigitBox.map((e, i) => {
                    return <input
                        ref={(input) =>
                            refArr.current[i] = input
                        }
                        key={e.id} type="text" style={{
                            height: '50px', width: '50px', fontSize: '40px',
                            textAlign: 'center', margin: '5px',
                        }}
                        value={inputArr[i]}
                        onChange={(e) => {

                            handleOnChange(e.target.value.trim(), i)
                        }}
                        onKeyDown={(e) => {
                            handleOnKeyDown(e, i);
                        }}
                    />
                })
            }
        </div>
    </div>
}
export default OtpInput
