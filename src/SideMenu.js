import { useState } from "react";
import SideMenuItem from "./SideMenuItem";
import Button from 'react-bootstrap/Button';
import InputModal from './InputModal';

const SideMenu = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [listToRename, setListToRename] = useState('');

	const createSideMenuItem = (list) => {
		return(
            <SideMenuItem
                number={list.id} 
                key={list.id}
                name={list.name}
                list={list.list}
                selectedList={props.selectedList}
                selectList={selectList}
                renameList={renameList}
                deleteList={deleteList}
            />
		);
	};

    const renameList = (id) => {
        props.myLists.forEach(list => {
            if (id === list.id) {
                setListToRename(list);
                setShowModal(true);
            }
        });
    };

    const handleSubmit = (newName) => {
        props.updateList({
            list: listToRename.list,
            id: listToRename.id,
            name: newName && newName.trim() ? newName : listToRename.name
        });
    };

    const selectList = props.selectList;
    const deleteList = props.deleteList;

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
            <span className="fs-4">Mis listas</span>
            <hr/>
            <ul className="nav overflow-auto flex-nowrap nav-pills flex-column mb-auto">
                {props.myLists.map((list) => createSideMenuItem(list))} 
            </ul>
            <hr/>
            <Button
                variant="dark" 
                onClick={props.createList}
            >
                Nueva lista
            </Button>
            <InputModal
                showModal={showModal}
                closeModal={() => setShowModal(false)}
                title="ayy lmao"
                action="activate almonds"
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default SideMenu;
