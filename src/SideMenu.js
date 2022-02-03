import { useState } from "react";
import SideMenuItem from "./SideMenuItem";
import Button from 'react-bootstrap/Button';
import InputModal from './InputModal';

const SideMenu = (props) => {
    const [showModal, setShowModal] = useState(false);

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
                const name = prompt("Nuevo nombre:");
                props.updateList({
                    list: list.list,
                    id: list.id,
                    name: name && name.trim() ? name : list.name
                });
            }
        });
    };

    const selectList = props.selectList;
    const deleteList = props.deleteList;

    return (

        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
            <span className="fs-4">Mis listas</span>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto">
                {props.myLists.map((list) => createSideMenuItem(list))} 
            </ul>
            <hr/>
            <Button
                variant="dark" 
                onClick={props.createList}
            >
                Nueva lista
            </Button>
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Launch static backdrop modal
            </Button>
            <InputModal
                showModal={showModal}
                closeModal={() => setShowModal(false)}
            />
        </div>
    );
};

export default SideMenu;
