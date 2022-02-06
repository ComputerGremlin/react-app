import { useState } from "react";
import SideMenuItem from "./SideMenuItem";
import Button from 'react-bootstrap/Button';
import InputModal from './InputModal';
import SimpleModal from './SimpleModal';

const SideMenu = (props) => {
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [listToRename, setListToRename] = useState('');
    const [listToDelete, setListToDelete] = useState('');

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
                setShowRenameModal(true);
            }
        });
    };

    const handleSubmit = (inputValues) => {
        let newName = '';
        if (inputValues.nombre && inputValues.nombre.trim()) {
            newName = inputValues.nombre;
        } else {
            newName = listToRename.name;
            props.setToastBody("Inserta un nombre válido");
        }
        props.updateList({
            list: listToRename.list,
            id: listToRename.id,
            name: newName
        });
    };

    const handleConfirm = () => {
        setShowConfirmDeleteModal(false);
        props.deleteList(listToDelete)
    };

    const selectList = props.selectList;
    const deleteList = (id) => {
        setShowConfirmDeleteModal(true);
        setListToDelete(id);
    };

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
                showModal={showRenameModal}
                closeModal={() => setShowRenameModal(false)}
                title="Nuevo nombre"
                action="Confirmar"
                handleSubmit={handleSubmit}
                inputs={[{name: 'nombre'}]}
            />
            <SimpleModal
                showModal={showConfirmDeleteModal}
                closeModal={() => setShowConfirmDeleteModal(false)}
                title="¿Seguro que quiere eliminar esta lista?"
                body="Esta acción no se puede deshacer."
                action="Confirmar"
                handleConfirm={handleConfirm}
                buttonType="danger"
            />
        </div>
    );
};

export default SideMenu;
