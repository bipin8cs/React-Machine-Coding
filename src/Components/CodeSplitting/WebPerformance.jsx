import React, { useState, useEffect } from "react";
const WebPerformance = () => {
    const [condition, setCondition] = useState(true);
    const [dynamicComponents, setDynamicComponents] = useState({});
    console.log(dynamicComponents)
    const importComponent = async ({ name, path }) => {
        try {
            const component = await import(`${path}`);
            console.log("Components")
            setDynamicComponents(prev => ({
                ...prev,
                [name]: component.default,
            }));
        } catch (error) {
            console.error(`Error loading ${name}:`, error);
        }
    };
    useEffect(() => {
        const loadComponent = async () => {
            if (condition) {
                await importComponent({
                    name: "SuccessComponent",
                    path: "./SuccessComponent",
                });
            } else {
                await importComponent({
                    name: "FailureComponent",
                    path: "./FailureComponent",
                });
            }
        };
        loadComponent();
    }, [condition]);

    const { SuccessComponent, FailureComponent } = dynamicComponents;

    const toggleCondition = () => {
        setCondition(prev => !prev);
        setDynamicComponents({}); // clear old component
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>🚀 Dynamic Component Loader Example</h1>
            <button onClick={toggleCondition} style={{ marginBottom: 20 }}>
                Toggle Component
            </button>
            <div>
                {condition ? (
                    SuccessComponent ? <SuccessComponent /> : <p>Loading Success Component...</p>
                ) : (
                    FailureComponent ? <FailureComponent /> : <p>Loading Failure Component...</p>
                )}
            </div>
        </div>
    );
};

export default WebPerformance;
