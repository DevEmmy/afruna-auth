import React from 'react';
import { Button } from '@nextui-org/react';
import { TrashIcon } from '../assets/svgs';

const DeleteDataPanel = ({
    title,
    description,
    onDelete,
    onCancel, 
    isLoading,
}: {
    title: string;
    description: string;
    onDelete: () => void;
    onCancel: () => void; 
    isLoading: boolean;
}) => {
    return (
        <div className="text-center my-5">
            <center>
                <TrashIcon />
            </center>
            <p className="my-2">{description || 'Are you sure you want to delete this?'}</p>
            <div className="flex justify-end gap-2 mt-4">
                <Button className="border rounded-full bg-white w-1/2" onClick={onCancel} disabled={isLoading}>
                    Cancel
                </Button>
                <Button className="bg-red-500 text-white rounded-full w-1/2" onClick={onDelete} isLoading={isLoading}>
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default DeleteDataPanel;
