import { useEffect, useState } from "react";
import List from "./List";
import SideMenu from "./SideMenu";

const App = () => {
	// TODO: hacer una inicialización correcta del localStorage en caso de que no exista para evitar errores
	// TODO: arreglar el bug que no permite insertar elementos hasta cambiar de lista
    const [selectedList, setSelectedList] = useState(localStorage.selectedList ? 
        localStorage.selectedList : 1);

    const [myLists, setMyLists] = useState(localStorage.lists ? 
        JSON.parse(localStorage.lists) : []);

    const updateList = (actualList) => {
    console.log("=================================");
    console.log("lista pal update -> "+JSON.stringify(actualList));
        if (actualList === null) {
            //setMyLists();
            console.log("Borrar");
        } else {
            setMyLists(
                myLists.map((list) => {
                    console.log(list.id+" "+selectedList);
                    if (list.id === selectedList) {
                        console.log("eureka!");
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
    console.log("localStorage -> "+localStorage.lists);
    console.log("state -> "+JSON.stringify(myLists[selectedList]));

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
                // localStorage.selectedList = JSON.stringify(0)
                // localStorage.lists = JSON.stringify([{id:1,name:"lista 1",list:[{"text":"test","checked":false}]},{id:2,name:"lista 2",list:[{"text":"test2","checked":false}]}])
            />
        </>
    );
};

export default App;
