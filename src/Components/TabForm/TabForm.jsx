import React, { useState } from 'react'

const TabForm = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [tabFormData, setTabFormData] = useState({
        name: "Bipin",
        age: 29,
        email: "pradhanbipina27@gmail.com",
        intersts: [],
        theme: "dark",
    })
    const tabs = [
        {
            name: 'Profile',
            component: React.lazy(() => import('./Profile')),
            validate: () => {
                const err={}
                if (!tabFormData.name || tabFormData.name.trim().length < 2) {
                    err.name= "Name is required" ;
                    
                }
                if (!tabFormData.age || isNaN(tabFormData.age) || tabFormData.age <= 0) {
                   
                    err.age= "Valid age is required";
                   
                }
                if (!tabFormData.email || !/\S+@\S+\.\S+/.test(tabFormData.email)) {
                    err.email= "Valid email is required";
                    
                }
                setErrors(err);
                return err.age || err.name || err.email ? false : true;
            }
        },

        {
            name: 'Intersts',
            component: React.lazy(() => import('./Intersts')),
            validate: () => {
                const err = {};
                if (tabFormData.intersts.length === 0) {
                    err.intersts = "At least one interest is required";
                }
                setErrors(err);
                return err.intersts ? false : true;
            }
        },
        {
            name: 'Settings',
            component: React.lazy(() => import('./Settings')),
        },
    
    ]
const [errors, setErrors] = useState({
    name: "",
    age: "",
    email: "",
    intersts: "",
    theme: "",
})
const ActiveTabComponent = tabs[activeTab].component;
//console.log("tabformdata", tabFormData);
return (
    <div>
        <div className="heading-container">
            {
                tabs.map((t, i) => <div key={t.name} className='heading' onClick={() => {
                    setActiveTab(i)
                }}>{t.name}</div>)
            }
        </div>
        <div className='tab-body'>
            <React.Suspense fallback={<div>Loading...</div>}>
                <ActiveTabComponent tabFormData={tabFormData} setTabFormData={setTabFormData} errors={errors} setErrors={setErrors} />
            </React.Suspense>
        </div>
        <div className='tab-footer'>
            {
                activeTab === tabs.length - 1 && <button onClick={() => {
                    console.log("tabFormData", tabFormData);
                }}>Submit</button>
            }
            {
                activeTab > 0 && <button onClick={() => {
                   
                    
                    setActiveTab(activeTab - 1);
                }}>Previous</button>
            }
            {
                activeTab < tabs.length - 1 && <button onClick={() => {
                    const isValid = tabs[activeTab].validate() ;
                    if (isValid) {
                        setActiveTab(activeTab + 1);
                    }
                    
                }}>Next</button>
            }
        </div>


    </div>
)
}

export default TabForm;