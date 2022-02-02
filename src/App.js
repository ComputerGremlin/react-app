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
                    if (list.id === selectedList) {
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

    console.log("=================================");
    console.log("localStorage -> "+localStorage.lists+"selectedList -> "+localStorage.selectedList);
    console.log("myLists[selectedList] -> "+JSON.stringify(myLists[selectedList]));

    // TODO: pasar solo los indices y nombres a SideMenu
    // TODO: arregla lo de selectedList-1, usar solo id
    return (
        <>
            <SideMenu
                myLists={myLists}
                selectList={selectList}
            />
            <List 
                list={myLists[selectedList-1]}
                updateActualList={updateList}
            />
        </>
    );
};

export default App;
