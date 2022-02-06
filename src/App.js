import { useEffect, useState } from "react";
import List from "./List";
import SideMenu from "./SideMenu";
import { Alert, Toast, ToastContainer } from 'react-bootstrap';
import InputModal from "./InputModal";

const App = () => {
    const [toastBody, setToastBody] = useState('');
    const [showNewListModal, setShowNewListModal] = useState(false);
    const [selectedList, setSelectedList] = useState(localStorage.selectedList ? 
        parseInt(localStorage.selectedList) : 1);

    const [myLists, setMyLists] = useState(localStorage.lists ? 
        JSON.parse(localStorage.lists) : []);

    const updateList = (actualList) => {
        setMyLists(
            myLists.map((list) => {
                if (list.id === actualList.id) {
                    return actualList;
                }
                return list;
            })
        );
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
        if (returnedList === null && myLists[0]) {
            setSelectedList(myLists[0].id);
        };
        return returnedList;
    }

    const createList = (inputValues) => {
        if (!inputValues.nombre || !inputValues.nombre.trim()) {
            setToastBody("Inserta un nombre válido");
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
                name: inputValues.nombre, 
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
                createList={() => setShowNewListModal(true)}
                deleteList={deleteList}
                setToastBody={setToastBody}
            />
            <div className="flex-grow-1  overflow-auto">
                {
                    !displayedList() 
                        ? 
                            <Alert variant='info m-5'>
                                No hay listas!
                                <span className="ms-3" style={{cursor: 'pointer'}} onClick={() => setShowNewListModal(true)}>
                                    Crear lista
                                </span>
                            </Alert>
                        : <List 
                            list={displayedList()}
                            updateActualList={updateList}
                            setToastBody={setToastBody}
                        />
                }
            </div>
            <InputModal
                showModal={showNewListModal}
                closeModal={() => setShowNewListModal(false)}
                title="Nueva lista"
                action="Confirmar"
                handleSubmit={createList}
                inputs={[{name: 'nombre'}]}
            />

            <ToastContainer className="p-3" position="top-end">
                <Toast 
                    onClose={() => setToastBody('')} show={toastBody !== ''} 
                    bg="warning"
                    delay={3000} 
                    autohide={true}
                >
                    <Toast.Body>
                        <i className="bi-exclamation-triangle"></i> {toastBody}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default App;
