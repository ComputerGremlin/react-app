import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Stack } from 'react-bootstrap';

const ListItem = (props) => (
	<Stack direction="horizontal">
		<div>
			<Form.Check 
				type="switch"
				label={props.value.text}
				checked={props.value.checked}
				onChange={props.onChildCheck}
			/>
		</div>
		<div className="ms-auto">
			<Button 
				size="sm"
				onClick={props.changeName}
			>
				<i className="bi-pencil-square"></i>
			</Button>
			<Button 
				className='m-1'
				size="sm"
				variant="danger"
				onClick={props.deleteItem}
			>
				<i className="bi-trash3"></i>
			</Button>
		</div>
	</Stack>
);

export default ListItem;
