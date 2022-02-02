import { useEffect, useState } from "react";
import List from "./List";
import SideMenu from "./SideMenu";

const App = () => {
	// TODO: hacer una inicialización correcta del localStorage en caso de que no exista para evitar errores
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

    console.log("=================================");
    console.log("localStorage -> "+localStorage.lists+"\nselectedList -> "+localStorage.selectedList);
    console.log("myLists[selectedList] -> "+JSON.stringify(displayedList()));

    return (
        <>
            <SideMenu
                myLists={myLists}
                selectList={selectList}
                updateList={updateList}
            />
            <List 
                list={displayedList()}
                updateActualList={updateList}
            />
        </>
    );
};

export default App;
