'use client';

import { httpService } from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { CreateUserModal } from './components/create-user-modal';
import { DeleteUserModal } from './components/delete-user-modal';
import { EditUserModal } from './components/edit-user-modal';
import { UserTable } from './components/user-table';
import { CreateUserSchema, UpdateUserSchema, User } from './forms/user-schema';

// API functions
const fetchUsers = async (): Promise<User[]> => {
  const response = await httpService.findAll('users');
  return response.data;
};

const createUser = async (data: CreateUserSchema): Promise<User> => {
  const response = await httpService.create('users', data);
  return response.data;
};

const updateUser = async (data: UpdateUserSchema): Promise<User> => {
  const response = await httpService.update('users', data.id, data);
  return response.data;
};

const deleteUser = async (id: string): Promise<User> => {
  const response = await httpService.delete(`users/${id}`);
  return response.data;
};

export default function UserManagementPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const queryClient = useQueryClient();

  // Fetch users
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created successfully');
    },
    onError: (error: any) => {
      toast.error(error.responseMessage || 'Failed to create user');
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.responseMessage || 'Failed to update user');
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.responseMessage || 'Failed to delete user');
    },
  });

  // Event handlers
  const handleCreate = () => {
    setCreateModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleCreateSubmit = async (data: CreateUserSchema) => {
    await createUserMutation.mutateAsync(data);
  };

  const handleEditSubmit = async (data: UpdateUserSchema) => {
    await updateUserMutation.mutateAsync(data);
  };

  const handleDeleteConfirm = async (user: User) => {
    await deleteUserMutation.mutateAsync(user.id);
  };

  const handleCloseModals = () => {
    setCreateModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedUser(null);
  };

  if (error) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-center'>
          <h2 className='text-lg font-semibold text-red-600'>
            Error Loading Users
          </h2>
          <p className='text-gray-600'>Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-6'>
      <UserTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
      />

      {/* Modals */}
      <CreateUserModal
        isOpen={createModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleCreateSubmit}
      />

      <EditUserModal
        isOpen={editModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleEditSubmit}
        user={selectedUser}
      />

      <DeleteUserModal
        isOpen={deleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={handleDeleteConfirm}
        user={selectedUser}
      />
    </div>
  );
}
