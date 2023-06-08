import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Menu,
	MenuItem,
} from '@mui/material';

const ActionMenu = ({ onDelete }) => {
	const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const isActionOpen = !!anchorEl;

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const onDeleteComment = async () => {
		await onDelete();
		closeDeleteConfirm();
	};

	const closeDeleteConfirm = () => setIsDeleteConfirmOpen(false);
	return (
		<div onClick={(e) => e.stopPropagation()}>
			<IconButton
				id="menu-button"
				aria-label="settings"
				aria-controls={isActionOpen ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={isActionOpen ? 'true' : undefined}
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={isActionOpen}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'menu-button',
				}}
			>
				<MenuItem onClick={() => setIsDeleteConfirmOpen(true)}>
					<DeleteIcon color="error" />
				</MenuItem>
			</Menu>
			<Dialog
				open={isDeleteConfirmOpen}
				onClose={closeDeleteConfirm}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description" color="InfoText">
						You will not be able undo this action!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeDeleteConfirm} autoFocus>
						Cancel
					</Button>
					<Button onClick={onDeleteComment} color="error">
						Delete!
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default ActionMenu;
