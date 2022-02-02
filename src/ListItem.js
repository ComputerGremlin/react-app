const ListItem = (props) => (
	<div>
		<label>
			<input
    	        className="form-check-input"
			    type="checkbox"
			    checked={props.value.checked}
			    onChange={props.onChildCheck}
			/>
			{props.value.text}
		</label>
	</div>
);

export default ListItem;
