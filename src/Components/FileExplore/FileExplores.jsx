//Nested File Folder Structure
//add remove folders and files
import React, { useState } from 'react'
import data from './data'
import { NestedFolder } from './NestedFolder';
function FileExplores() {
    const [folders, setFolders] = useState(data);
    //console.log(folders);
    const addNodeToData = (id) => {
        const folderName = prompt('Enter folder name');
        const updateTree = (folders) => {

            return folders.map((folder) => {
                if (folder.id === id) {
                    return {
                        ...folder,
                        children: [
                            ...folder?.children || [],
                            {
                                id: Date.now(),
                                name: folderName,
                                isFolder: true,
                                children: []
                            }
                        ]
                    }

                }
                if (folder?.children) {
                    return {
                        ...folder,
                        children: updateTree(folder.children)
                    }
                }
                return folder;
            })
        }
        const updatedFolders = updateTree(folders);
        setFolders(updatedFolders);
    }
    const deleteNodeToData = (id) => {
        //const folderName = prompt('Enter folder name');
        const updateTree = (folders) => {

            return folders.filter((folder) => folder.id !== id).map((folder) => {
                if (folder.children) {
                    return {
                        ...folder,
                        children: updateTree(folder.children)
                    }
                }
                return folder;
            })
        }
        const updatedFolders = updateTree(folders);
        setFolders(updatedFolders);
    }
    return (
        <div className='app'>
            <div>
                <h1>FileExplores</h1>
                <NestedFolder folders={folders} addNodeToData={addNodeToData} deleteNodeToData={deleteNodeToData} />
            </div>


        </div>
    )
}

export default FileExplores