import { useState } from "react";
import ListItem from './ListItem';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import InputModal from "./InputModal";

const List = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [itemToRename, setItemToRename] = useState('');

	const createListItem = (value, index) => {
		return(
			<ListItem
				value={value}
				key={index}
				onChildCheck={() => handleChange(index)}
				deleteItem={() => deleteItem(index)}
				changeName={() => changeName(index)}
			/>
		);
	};

	const addListItem = () => {
		const item = prompt("Añade un elemento:");
		if (item && item.trim()) {
			props.updateActualList({
				list: [...props.list.list, {text: item, checked: false}],
				name: props.list.name,
				id: props.list.id
			});
		}
	};

	const handleChange = (index) => {
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

	const clearState = () => {
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
		console.log(index);
		setShowModal(true);
	};

	const handleSubmit = (newName) => {
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

	return (
		<Container className="p-5 m-5 border overflow-auto flex-nowrap">
			<h1 className="text-center">{props.list.name}</h1>
			<div className="form-check">
			{props.list.list.map((value, index) => createListItem(value, index))}
			</div>
			<Button variant="dark" onClick={addListItem}>
				Añadir check
			</Button>
			<Button className='ms-1' variant="secondary" onClick={clearState}>
				Vaciar lista
			</Button>
			<InputModal
                showModal={showModal}
                closeModal={() => setShowModal(false)}
                title="ayy lmao"
                action="activate almonds"
                handleSubmit={handleSubmit}
            />
		</Container>
	);
};

export default List;
