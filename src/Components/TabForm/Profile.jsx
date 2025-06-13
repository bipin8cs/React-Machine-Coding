import React from 'react'

const Profile = ({ tabFormData, setTabFormData,errors,setErrors }) => {
  const { name, age, email } = tabFormData;
  const handleInputChange = (e, field) => {
    setTabFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };
  return (
    <div>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => {
          handleInputChange(e, 'name');
        }} />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div>
        <label>Age:</label>
        <input type="text" value={age} onChange={(e) => {
          handleInputChange(e, 'age');
        }} />
        {errors.age && <span className="error">{errors.age}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => {
          handleInputChange(e, 'email');
        }} />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
    </div>
  )
}

export default React.memo(Profile)