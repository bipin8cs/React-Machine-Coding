// import React from 'react'
// import './typeHead.css'
// const PRODUCT_LISTS = ["apple", "banana", "orange", "grape", "mango", "pineapple", "strawberry", "blueberry", "kiwi", "watermelon"]
// const TypeHead = () => {
//     const [inputValue, setInputValue] = React.useState('');
//     const [suggestionList, setSuggestionList] = React.useState([]);
//     const [debouncedValue, setDebouncedValue] = React.useState('');
//     const [showSuggestions, setShowSuggestions] = React.useState(false);

//     // Debounce logic
//     React.useEffect(() => {
//         fetch('https://jsonplaceholder.typicode.com/posts')
//         const handler = setTimeout(() => {
//             setDebouncedValue(inputValue);
//         }, 5000); // 500ms delay

//         return () => {
//             clearTimeout(handler); // clear timeout if inputValue changes quickly
//         };
//     }, [inputValue]);

//     // When debouncedValue changes, update suggestions
//     React.useEffect(() => {
//         if (debouncedValue) {
//             const filteredValue = PRODUCT_LISTS.filter((item) =>
//                 item.toLowerCase().includes(debouncedValue.toLowerCase())
//             );
//             setSuggestionList(filteredValue);
//         } else {
//             setSuggestionList([]);
//         }
//     }, [debouncedValue]);
//     console.log("suggestionList", suggestionList)
//     return (
//         <div style={{ height: '600px', width: "600px" }}>
//             <div >
//                 <input type="text" placeholder='Search' name="typehead" className="typehead" value={inputValue} onChange={(e) => {
//                     setShowSuggestions(true);
//                     setInputValue(e.target.value)
//                     const filteredValue = PRODUCT_LISTS.filter((item) => {
//                         return item.toLowerCase().includes(e.target.value.toLowerCase())
//                     });
//                     //for debounced feature 
//                     //setSuggestionList(filteredValue);

//                 }} />
//             </div>
//             <div>
//                 {
//                     showSuggestions && inputValue && suggestionList.map((item, index) => (
//                         <h1 key={index} onClick={(e) => {
//                             setInputValue(e.target.innerText);
//                             setShowSuggestions(false);

//                         }}>{item}</h1>
//                     ))
//                 }
//             </div>



//         </div>
//     )
// }

// export default TypeHead


import React, { useEffect, useRef, useState } from 'react';
import './typeHead.css';

const PRODUCT_LISTS = ["apple", "banana", "orange", "grape", "mango", "pineapple", "strawberry", "blueberry", "kiwi", "watermelon"];

const TypeHead = () => {
    const [inputValue, setInputValue] = useState('');
    const [suggestionList, setSuggestionList] = useState([]);
    const [debouncedValue, setDebouncedValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1); // for keyboard highlight

    const suggestionsRef = useRef([]);

    // Debounce inputValue
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, 500); // 500ms debounce

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue]);

    // Update suggestions when debounced value changes
    useEffect(() => {
        if (debouncedValue) {
            const filteredValue = PRODUCT_LISTS.filter((item) =>
                item.toLowerCase().includes(debouncedValue.toLowerCase())
            );
            setSuggestionList(filteredValue);
            setShowSuggestions(true);
        } else {
            setSuggestionList([]);
            setShowSuggestions(false);
        }
        setActiveIndex(-1); // reset active index when list updates
    }, [debouncedValue]);

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (!showSuggestions) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((prevIndex) => (prevIndex + 1) % suggestionList.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((prevIndex) =>
                prevIndex === 0 || prevIndex === -1
                    ? suggestionList.length - 1
                    : prevIndex - 1
            );
        } else if (e.key === 'Enter') {
            if (activeIndex >= 0 && suggestionList[activeIndex]) {
                setInputValue(suggestionList[activeIndex]);
                setShowSuggestions(false);
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    // Scroll active suggestion into view
    useEffect(() => {
        if (activeIndex >= 0 && suggestionsRef.current[activeIndex]) {
            suggestionsRef.current[activeIndex].scrollIntoView({
                block: 'nearest',
                behavior: 'smooth',
            });
        }
    }, [activeIndex]);

    return (
        <div style={{ height: '600px', width: "600px", position: "relative", top: "300px" }}>
            <div>
                <input
                    style={{ height: '35px' }}
                    type="text"
                    placeholder="Search"
                    name="typehead"
                    className="typehead"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);

                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                        if (suggestionList.length > 0) setShowSuggestions(true);
                    }}
                />
            </div>
            {showSuggestions && inputValue && (
                <div
                    style={{
                        display: showSuggestions ? 'block' : 'hidden',
                        border: '1px solid #ccc',
                        marginTop: '4px',
                        maxHeight: '200px',
                        overflowY: 'auto',
                    }}
                >
                    {suggestionList.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => (suggestionsRef.current[index] = el)}
                            style={{

                                padding: '8px',
                                backgroundColor: activeIndex === index ? '#e0e0e0' : 'white',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseDown={() => {
                                setInputValue(item);
                                setShowSuggestions(false);
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TypeHead;
