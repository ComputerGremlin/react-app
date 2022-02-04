import { useEffect, useState } from "react";
import List from "./List";
import SideMenu from "./SideMenu";
import Alert from 'react-bootstrap/Alert';
import InputModal from "./InputModal";

const App = () => {
    const [showNewListModal, setShowNewListModal] = useState(false);
    const [selectedList, setSelectedList] = useState(localStorage.selectedList ? 
        parseInt(localStorage.selectedList) : 1);

    const [myLists, setMyLists] = useState(localStorage.lists ? 
        JSON.parse(localStorage.lists) : []);

    const updateList = (actualList) => {
        if (actualList === null) {
            setMyLists(
                myLists.map((list) => {
                    if (list.id === selectedList) {
                        return {
                            id: list.id,
                            name: list.name,
                            list: []
                        };
                    }
                    return list;
                })
            );
        } else {
            setMyLists(
                myLists.map((list) => {
                    if (list.id === actualList.id) {
                        return actualList;
                    }
                    return list;
                })
            );
        }
    };

    useEffect(() => {
        localStorage.lists = JSON.stringify(myLists);
    });
    
    const selectList = (listIndex) => {
        setSelectedList(listIndex);
        localStorage.selectedList = listIndex;
    };

    const displayedList = () => {
        let returnedList = null;
        myLists.forEach((list) => {
            if (list.id === selectedList) {
                returnedList = list;
            }
        });
        return returnedList;
    }

    const createList = () => {
        const name = prompt("Nombre de la lista:");
        if (name === null) {
            return "operation cancelled";
        } else if (!name) {
            alert("Inserta un nombre válido");
            return "invalid name";
        }
        let maxId = 0;
        myLists.forEach((list) => {
            if (list.id > maxId) {
                maxId = list.id;
            }
        });
        setMyLists([
            ...myLists, 
            {
                name: name, 
                id: maxId + 1, 
                list: []
            }
        ]);
    }

    const deleteList = (id) => {
        setMyLists(myLists.filter((list) => {
            return id !== list.id;
        }));
    }

    return (
        <>
            <SideMenu
                myLists={myLists}
                selectedList={selectedList}
                selectList={selectList}
                updateList={updateList}
                createList={
                    createList
                    // Error: Too many re-renders.
                    //setShowNewListModal(true)
                }
                deleteList={deleteList}
            />
            {
                !displayedList() 
                    ? <Alert variant='info'>
                        No hay listas!
                    </Alert>
                    : <List 
                        list={displayedList()}
                        updateActualList={updateList}
                    />
            }
            <InputModal
                showModal={showNewListModal}
                closeModal={() => setShowNewListModal(false)}
                title="Nueva lista"
                action="Confirmar"
                handleSubmit={createList}
            />
        </>
    );
};

export default App;
