import React from 'react'
//render list of objectjs
export const NestedFolder = ({ folders, addNodeToData, deleteNodeToData }) => {
    const [isExpanded, setIsExpanded] = React.useState({

    });
    return (
        <div className='container'>
            {
                folders.map((folder, index) => {
                    return <div key={folder?.id}>
                        {folder?.isFolder && <span className='folder-icon' onClick={() => {
                            setIsExpanded(prev => {
                                return {
                                    ...prev,
                                    [folder?.name]: !prev?.[folder?.name]
                                }
                            });
                        }}>{isExpanded?.[folder?.name] ? '-' : '+'}</span>}
                        <span className='folder-icon'>{folder?.name}</span>
                        <span style={{ marginLeft: '5px' }} onClick={() => {
                            addNodeToData(folder?.id);
                        }}>
                            {folder?.isFolder ? <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ4zi1YtAPHRDNI4EYDA4wNngAp3EtpEuufA&s' height={'15px'} width={'15px'} /> : ''}

                        </span>
                        <span style={{ marginLeft: '15px' }} onClick={() => {
                            //debugger
                            deleteNodeToData(folder?.id);
                        }}>
                            {
                                folder?.isFolder ? <img height={'15px'} width={'15px'} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAADHx8c4ODhISEihoaHBwcHy8vLg4OCCgoJNTU0WFhZ2dnYTExN/f3/q6upFRUWXl5f5+flwcHAxMTHr6+vT09O6urrLy8tgYGB5eXkoKCimpqYjIyMtLS2KioqdnZ1qamqvr68+Pj6JiYnZ2dlYWFgcHBwM3Ia6AAADzklEQVR4nO2d6VbqMBhFKYOgiECZZFYBff83vJcmIAVbBnOSstz7Z83iZDcFSkzzlUoAAAAAAAAAAAAAAAAAAL6o5xO6e7+k3a1G56h226G7eTPx5KyeYRKH7uptNKYXCkbRtBG6s7fQuNhvyx0qxv2rDPv3d6F2rxKMom7oDl9LvOt55SWfyq7hvQ3iyPb742zLD9ty5KFXLumZbs8uaDozTXvyPrnFfNPPL7n04nnStiPvk1v6V/TanI2+uEeuucbwCcNCguEhxTWM240s2ouk16vsFgdtO0nbRc6rBbkbGC6rrStvzG6nVV0OPfuNFt7sdix83vQ0Ot79tqy8/cQane+MCE/DOAsmGEU1H4IPAQW9jOLB5MTTuuaH9dN3qP69uA9b+5wEHKz3p1UdtfuUmW/USUds5p6u05WJafqfq643TXRFGzO0J9L3CG7Z2Gzt3c3ShDxKQ7J4NOFLaUjV1wfaT7RNuHa6w0dGNvb8KiPqIS/S/WWq/JSz10mo+Wk7j678IsZQDIYOwFAMhg74M4Zvwog83rwZzleVEKzmesNBVAQGQsNSaLkEpeDu92FQtL8P48vXOamYiv9NUw8zof9NRz9D9NDrVBPsSphKVUk6pNPzuibl1YSXfYS8SkOyKJvwBx8h2tN4JhxDJyEYSsMxdBKCoTQcQychGErDMXQSgqE0HEMnIRhKwzF0EoKhNPwvG27KpzN/7fLpWpx6OXuJVZEN48/odMXr9sngydGx2v9jn1nTvEU2fE7+ml6EZpYXpx9oM0vlnvNDimgYm6WEL6mDZnFqeomoWQbUzBjEAhvaxZLpsTGG1dQxM9atjMl6DKVgiKEFQwyFYIihBUMMhWCIoQVDDIVgiKEFQwyFYIihBUMMhWCIoQVDDIVgiKEFQwyFYIihBUMMhWCIoQVDDIVgiKEFQwyFYIihBUMMhTh6ZuYlOXaHz8zYql3p7Y9qybG31DGzT9J7fkghDZNdwY73kHz/QWa732PmDl5FNiyVhqPT/f8ao9NnDQej7G3Wi23oMARDaTiGTkIwlIZj6CQEQ2k4hk5CMJSGY/g7HkIa2tpP2nJ2tlCf7wqWBrtB+1gaMjYhPmu8HfBl0pXFn2ylvi9hRB4TE6+sZvdpIrL2dlGzK8KWNcfye96jkG/D0r6QXrTQbLf92revv5K8/CXsqtlF0bT36Jre9xb+wYZwXxZFjLYYwhnGHgS1X0dn6ckFdZ9jF1ITC3qpAJxPWzmMvUA3M0e0Z+OmwK41nhXDzxDXXSMutgIAAAAAAAAAAAAAAAAAf5B/xWxOu+UwG5wAAAAASUVORK5CYII=' /> : ''
                            }
                        </span>
                        {isExpanded?.[folder?.name] && folder?.children && <NestedFolder folders={folder?.children} addNodeToData={addNodeToData} deleteNodeToData={deleteNodeToData} />}
                    </div>;
                })
            }
        </div>
    )
}
