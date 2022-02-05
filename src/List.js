import { useState } from "react";
import ListItem from './ListItem';
import {Button,	Container,	Card,	ListGroup,	InputGroup,	FormControl, Tooltip, OverlayTrigger} 
	from 'react-bootstrap';
import InputModal from "./InputModal";

const List = (props) => {
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [itemToRename, setItemToRename] = useState('');
    const [newListItemInputValue, setNewListItemInputValue] = useState('');
	
	const renderTooltip = (overlayProps, description) => {
		return (
			<Tooltip id="button-tooltip" {...overlayProps}>
				{description}
			</Tooltip>
		);
	};

	const createOverlay = (body, data) => {
		return (
			<OverlayTrigger
				placement="bottom"
				delay={{ show: 250, hide: 400 }}
				overlay={
					(overlayProps) => renderTooltip(overlayProps, data)
				}
			>
				<div>{body}</div>
			</OverlayTrigger>
		);
	}

	const createListItem = (value, index) => {
		const listItem = (
			<ListItem
				value={value}
				key={index}
				onChildCheck={() => handleCheck(index)}
				deleteItem={() => deleteItem(index)}
				changeName={() => changeName(index)}
			/>
		);

		return(
			<ListGroup.Item key={index} >
				{value.description ? createOverlay(listItem, value.description) : listItem}
			</ListGroup.Item>
		);
	};

	const addListItem = (name) => {
		if (name && name.trim()) {
			props.updateActualList({
				list: [...props.list.list, {text: name, description: '', checked: false}],
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
		props.updateActualList({
			list: [],
			name: props.list.name,
			id: props.list.id
		});
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

	const handleRename = (inputValues) => {
		if (!inputValues.nombre) {
			props.setToastBody("Inserta un nombre válido");
            return;
        }
		props.updateActualList({
			name: props.list.name,
			id: props.list.id,
			list: props.list.list.map(
				(item,i) => i === itemToRename
				? {
					text: inputValues.nombre, 
					description: inputValues.descripcion, 
					checked: item.checked
				}
				: item
			)
		});
	};

	const getItemToRenameData = () => {
		let itemToReturn = {};
		for (let i in props.list.list) {
			if (i == itemToRename) {
				itemToReturn = props.list.list[i];
			}
		}
		return itemToReturn;
	}

	const checkAll = () => {
		const firstItemValue = props.list.list[0].checked;
		let checked = !firstItemValue;
		
		for (const listItem of props.list.list) {
			if (listItem.checked !== firstItemValue) {
				checked = true;
			}
		}

		props.updateActualList(
			{
				name: props.list.name,
				id: props.list.id,
				list: props.list.list.map((item) => { 
					return {
						text: item.text, 
						description: item.description, 
						checked: checked
					}
				})
			}
		);
	};

	
	const handleListItemInputChange = (event) => {
        setNewListItemInputValue(event.target.value);
    }

	const handleListItemSubmit = (event) => {
        event.preventDefault();
        addListItem(newListItemInputValue);
        setNewListItemInputValue('');
    };

	return (
		<Container className="p-5 m-5 border overflow-auto flex-nowrap">
			<h1 className="text-center">{props.list.name}</h1>
			<Card className="my-5">
				<ListGroup variant="flush">
					{props.list.list.map((value, index) => createListItem(value, index))}
					<ListGroup.Item>
						<form onSubmit={handleListItemSubmit}>
							<InputGroup>
								<FormControl 
									onChange={handleListItemInputChange}
									value={newListItemInputValue}
								/>
								<Button variant="outline-primary" type="submit">
									Añadir
								</Button>
							</InputGroup>
						</form>
					</ListGroup.Item>
				</ListGroup>
			</Card>
			<Button className='m-1' variant="dark" onClick={() => checkAll()}>
				<i className="bi-check-all"></i> Checkea todo
			</Button>
			<Button className='m-1' variant="danger" onClick={clearList}>
				Vaciar lista
			</Button>
			<InputModal
                showModal={showRenameModal}
                closeModal={() => setShowRenameModal(false)}
                title="Modificar checkbox"
                action="Confirmar"
                handleSubmit={handleRename}
				inputs={[
					{
						name: 'nombre', 
						label: 'Nombre', 
						value: getItemToRenameData().text
					}, 
					{
						name: 'descripcion', 
						label: 'Descripción', 
						as: 'textarea', 
						value: getItemToRenameData().description
					}
				]}
            />
		</Container>
	);
};

export default List;
