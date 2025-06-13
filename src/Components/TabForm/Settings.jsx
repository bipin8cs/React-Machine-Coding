import React from 'react'


const Settings = ({ tabFormData, setTabFormData}) => {
  const { theme } = tabFormData;
  const handleThemeChange = (e) => {
    setTabFormData((prevData) => ({
      ...prevData,
      theme: e.target.name,
    }));
  }
  return (
    <div>
      <div>
        <label>
          <input type="radio" name="dark" value="dark" checked={tabFormData.theme === "dark"} onChange={handleThemeChange} />
          {'Dark'}</label>
      </div>
      <div>
        <label>
          <input type="radio" name="light" checked={tabFormData.theme === "light"} onChange={handleThemeChange} />
          {'Light'}</label>
      </div>

    </div>
  )
}

export default React.memo(Settings);