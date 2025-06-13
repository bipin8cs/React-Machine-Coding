import React from 'react'
const totalInterests = [
  "Web Development",
  "Machine Learning",
  "Blockchain",
  "Cloud Computing",
  "DevOps",
  "Cybersecurity",
  "Open Source Contribution",
  "UI/UX Design",
  "Mobile App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
  "Internet of Things (IoT)",
  "Augmented Reality (AR)",
  "Virtual Reality (VR)"
];

const Intersts = ({tabFormData,setTabFormData,errors,setErrors}) => {
  const { intersts } = tabFormData;
  
  return (
    <div>
      {
        totalInterests.map((interest, index) => (
          <div key={index}>
            <input type='checkbox' name={interest}  checked={intersts.includes(interest)} onChange={()=>{
              setTabFormData((prevData) => {
                return {
                  ...prevData,
                  intersts: prevData.intersts.includes(interest) ? prevData.intersts.filter(i => i !== interest) : [...prevData.intersts, interest]
                }
              })
            }}/>
            <label>{interest}</label>
          </div>
        ))
      }
      {errors.intersts && <span className="error">{errors.intersts}</span>}
    </div>
  )
}

export default React.memo(Intersts)