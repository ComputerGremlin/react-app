import { useState } from "react";
import ListItem from './ListItem';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import InputModal from "./InputModal";

const List = (props) => {
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [showNewItemModal, setShowNewItemModal] = useState(false);
    const [itemToRename, setItemToRename] = useState('');

	const createListItem = (value, index) => {
		return(
			<ListItem
				value={value}
				key={index}
				onChildCheck={() => handleCheck(index)}
				deleteItem={() => deleteItem(index)}
				changeName={() => changeName(index)}
			/>
		);
	};

	const addListItem = (name) => {
		if (name && name.trim()) {
			props.updateActualList({
				list: [...props.list.list, {text: name, checked: false}],
				name: props.list.name,
				id: props.list.id
			});
		}
	};

	const handleCheck = (index) => {
		const actualList = props.list.list.map((item, i) => {
			if (index === i) return {text: item.text, checked: !item.checked};
			else return item;
		});
		props.updateActualList({
			list: actualList,
			name: props.list.name,
			id: props.list.id
		});
	};

	const clearList = () => {
		props.updateActualList(null);
	};

	const deleteItem = (index) => {
		const actualList = props.list.list.filter((_, i) => {
			return index !== i;
		});
		props.updateActualList({
			list: actualList,
			name: props.list.name,
			id: props.list.id
		});
	};
	
	const changeName = (index) => {
		setItemToRename(index);
		setShowRenameModal(true);
	};

	const handleRename = (newName) => {
		props.updateActualList({
			name: props.list.name,
			id: props.list.id,
			list: props.list.list.map(
				(item,i) => i === itemToRename
				? {text: newName, checked: item.checked}
				: {text: item.text, checked: item.checked}
			)
		});
	};

	const checkAll = () => {
		const firstItemValue = props.list.list[0].checked;
		for (const listItem of props.list.list) {
			if (listItem.checked !== firstItemValue) {
				props.updateActualList(
					{
						name: props.list.name,
						id: props.list.id,
						list: props.list.list.map((item) => { return {text: item.text, "checked": true}})
					}
				);
				return;
			}
		}
		if (firstItemValue === false) {
			props.updateActualList(
				{
					name: props.list.name,
					id: props.list.id,
					list: props.list.list.map((item) => { return {text: item.text, "checked": true}})
				}
			);
		} else {
			props.updateActualList(
				{
					name: props.list.name,
					id: props.list.id,
					list: props.list.list.map((item) => { return {text: item.text, "checked": false}})
				}
			);
		}

	};

	return (
		<Container className="p-5 m-5 border overflow-auto flex-nowrap">
			<h1 className="text-center">{props.list.name}</h1>
			<div className="form-check">
			{props.list.list.map((value, index) => createListItem(value, index))}
			</div>
			<Button className='m-1' variant="dark" onClick={() => setShowNewItemModal(true)}>
				Añadir check
			</Button>
			<Button className='m-1' variant="secondary" onClick={clearList}>
				Vaciar lista
			</Button>
			<Button className='m-1' variant="dark" onClick={() => checkAll()}>
				Checkea todo
			</Button>
			<InputModal
                showModal={showRenameModal}
                closeModal={() => setShowRenameModal(false)}
                title="Nuevo nombre"
                action="Confirmar"
                handleSubmit={handleRename}
            />
			<InputModal
                showModal={showNewItemModal}
                closeModal={() => setShowNewItemModal(false)}
                title="Nuevo checkBox"
                action="Confirmar"
                handleSubmit={addListItem}
            />
		</Container>
	);
};

export default List;
