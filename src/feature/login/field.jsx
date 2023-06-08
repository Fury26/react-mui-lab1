import React, { useRef } from 'react';
import { FormControl, Input, InputLabel } from '@mui/material';
import uuid from 'uuid4';

const Field = ({ label, value, onChange, type = 'text', placeholder }) => {
	const id = useRef(uuid());
	return (
		<FormControl>
			{label && <InputLabel htmlFor={id.current}>{label}</InputLabel>}
			<Input
				id={id.current}
				aria-describedby="my-helper-text"
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</FormControl>
	);
};

export default Field;
