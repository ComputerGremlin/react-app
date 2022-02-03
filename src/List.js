import ListItem from './ListItem';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const List = (props) => {
	const createListItem = (value, index) => {
		return(
			<ListItem
				value={value}
				key={index}
				onChildCheck={() => handleChange(index)}
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

	return (
		<Container>
			<h1 className="text-center">{props.list.name}</h1>
			<div className="form-check">
			{props.list.list.map((value, index) => createListItem(value, index))}
			</div>
			<Button variant="dark" onClick={addListItem}>
				Añadir check
			</Button>
			<Button variant="secondary" onClick={clearState}>
				Vaciar lista
			</Button>
		</Container>
	);
};

export default List;
