import { useRef } from "react";

const TextEditor = ({ parentRef }) => {
    return <textarea onChange={(e) => {
        parentRef.current = e.target.value;
    }}></textarea>
}

const RefPssingChildToParent = () => {
    const textArearef = useRef();
    console.log(textArearef)
    return <>
        <TextEditor parentRef={textArearef} />
        <button onClick={() => {
            console.log('s', textArearef?.current)
        }}>Getting value from child text area</button>
    </>
}
export default RefPssingChildToParentp



//There are 4 common ways to send data from child component to parentcomponent. They are.,
//How to send data from child to parentusing callback functions 
//pass the function as props  which set THE SET IN PARENT call that function with appropriate parameter
//  Callback Functions
//  Context API
//  React Hooks (useRef)
//  Redux