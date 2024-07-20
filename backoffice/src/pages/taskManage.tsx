import React, { useState, useEffect } from 'react';
import Task from '../components/Task';
import AuthCheck from '../components/AuthCheck';
import Modal from '../components/Modal';
import '../styles/taskManage.css';

type TaskType = {
    id?: number;
    title: string;
    description: string;
    deadline: Date;
    assignedTo: number;
    assigned_date: Date;
    status: 'ongoing' | 'completed' | 'failed';
    createdBy: number;
    failedDate?: Date;
    completedDate?: Date;
};

type UserType = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
}

function TaskManager() {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const userId = Number(localStorage.getItem('userId'));
    const [message, setMessage] = useState<string>('');
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');
    const [newTask, setNewTask] = useState<TaskType>({
        title: '',
        description: '',
        deadline: new Date(),
        assignedTo: 0,
        assigned_date: new Date(),
        status: 'ongoing',
        createdBy: userId || 0
    });
    const [users, setUsers] = useState<UserType[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed' | 'failed'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [taskMessages, setTaskMessages] = useState<{ [key: number]: { message: string; type: 'success' | 'error' } }>({});
    const [showModal, setShowModal] = useState<boolean>(false);
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

    useEffect(() => {
        fetch('http://localhost:8088/tasks')
            .then(response => response.json())
            .then(data => {
                const parsedTasks = data.map((task: TaskType) => ({
                    ...task,
                    deadline: new Date(task.deadline),
                    assigned_date: new Date(task.assigned_date)
                }));
                setTasks(parsedTasks);
            })
            .catch(error => {
                setMessage('Error fetching tasks');
                setMessageType('error');
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 5000);
                console.error('Error fetching tasks:', error);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8088/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => {
                setMessage('Error fetching users');
                setMessageType('error');
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 5000);
                console.error('Error fetching users:', error);
            });
    }, []);

    const validateDateTime = (inputDateTime: Date) => {
        const inputDate = new Date(inputDateTime);
        const currentDate = new Date();
        return inputDate >= currentDate;
    };

    const isValidDate = (dateString: any) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    };

    const handleCreate = () => {
        if (newTask.title.trim() === '') {
            setMessage('Le titre ne peut pas être vide.');
            setMessageType('error');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 5000);
            return;
        }

        if (newTask.description.trim() === '') {
            setMessage('La description ne peut pas être vide.');
            setMessageType('error');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 5000);
            return;
        }

        if (!isValidDate(newTask.deadline)) {
            setMessage('Date limite invalide.');
            setMessageType('error');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 5000);
            return;
        }

        if (!validateDateTime(newTask.deadline)) {
            setMessage('La date limite doit être dans le futur.');
            setMessageType('error');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 5000);
            return;
        }

        if (newTask.assignedTo === 0) {
            setMessage('L\'utilisateur doit être assigné.');
            setMessageType('error');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 5000);
            return;
        }

        fetch('http://localhost:8088/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        })
            .then(response => {
                if (!response.ok) {
                    console.error('Network response was not ok');
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const createdTask = {
                    ...data,
                    deadline: new Date(data.deadline),
                    assigned_date: new Date(data.assigned_date)
                };
                setTasks(prevTasks => [...prevTasks, createdTask]);
                setNewTask({
                    title: '',
                    description: '',
                    deadline: new Date(),
                    assignedTo: 0,
                    assigned_date: new Date(),
                    status: 'ongoing',
                    createdBy: userId || 0
                });
                setIsCreating(false);
                setMessage('Tâche créée avec succès.');
                setMessageType('success');
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 5000);
            })
            .catch(error => {
                setMessage('Échec de création de la tâche.');
                setMessageType('error');
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 5000);
                console.error('Error creating task:', error);
            });
    };


    const handleUpdate = (updatedTask: TaskType) => {
        const currentDate = new Date();
        if (updatedTask.status === 'failed') {
            updatedTask.failedDate = currentDate;
        } else if (updatedTask.status === 'completed') {
            updatedTask.completedDate = currentDate;
        }
        fetch(`http://localhost:8088/tasks/${updatedTask.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        })
            .then(response => {
                if (!response.ok) {
                    console.error('Network response was not ok');
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const updatedTaskWithDate = {
                    ...data,
                    deadline: new Date(data.deadline),
                    assigned_date: new Date(data.assigned_date),
                    failedDate: data.status === 'failed' ? new Date() : data.failedDate ? new Date(data.failedDate) : undefined,
                    completedDate: data.status === 'completed' ? new Date() : data.completedDate ? new Date(data.completedDate) : undefined,
                };
                setTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTaskWithDate : task));
                setTaskMessages(prevMessages => ({
                    ...prevMessages,
                    [updatedTask.id!]: { message: 'Tâche mis à jour', type: 'success' }
                }));
                setTimeout(() => {
                    setTaskMessages(prevMessages => {
                        const { [updatedTask.id!]: _, ...rest } = prevMessages;
                        return rest;
                    });
                }, 5000);
                setShowMessage(false);
            })
            .catch(error => {
                setTaskMessages(prevMessages => ({
                    ...prevMessages,
                    [updatedTask.id!]: { message: 'Erreur mis à jour de la tâche.', type: 'error' }
                }));
                setTimeout(() => {
                    setTaskMessages(prevMessages => {
                        const { [updatedTask.id!]: _, ...rest } = prevMessages;
                        return rest;
                    });
                }, 5000);
                setShowMessage(false);
                console.error('Error updating task:', error);
            });
    };

    const handleDelete = (taskId: number) => {
        setShowModal(true);
        setTaskToDelete(taskId);
    };

    const confirmDelete = () => {
        if (taskToDelete !== null) {
            fetch(`http://localhost:8088/tasks/${taskToDelete}`, {
                method: 'DELETE',
            })
                .then(() => {
                    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskToDelete));
                    setTaskMessages(prevMessages => ({
                        ...prevMessages,
                        [taskToDelete]: { message: 'Tâche Supprimé', type: 'success' }
                    }));
                    setTimeout(() => {
                        setTaskMessages(prevMessages => {
                            const { [taskToDelete]: _, ...rest } = prevMessages;
                            return rest;
                        });
                    }, 5000);
                    setShowModal(false);
                    setTaskToDelete(null);
                })
                .catch(error => {
                    setTaskMessages(prevMessages => ({
                        ...prevMessages,
                        [taskToDelete]: { message: 'Erreur de suppression. Réessayer.', type: 'error' }
                    }));
                    setTimeout(() => {
                        setTaskMessages(prevMessages => {
                            const { [taskToDelete]: _, ...rest } = prevMessages;
                            return rest;
                        });
                    }, 5000);
                    setShowModal(false);
                    setTaskToDelete(null);
                    console.error('Error deleting task:', error);
                });
        }
    };

    const cancelDelete = () => {
        setShowModal(false);
        setTaskToDelete(null);
    };

    const filteredTasks = tasks
        .filter(task => filter === 'all' || task.status === filter)
        .filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.description.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            {showMessage && (
                <div className={`message-task ${messageType}`}>
                    {message}
                </div>
            )}
            <div className='filter-container'>
                <label htmlFor='status-filter'>Status : </label>
                <select id='status-filter' value={filter} onChange={e => setFilter(e.target.value as typeof filter)}>
                    <option value='all'>Tous</option>
                    <option value='ongoing'>En cours</option>
                    <option value='completed'>Complétée</option>
                    <option value='failed'>échoué</option>
                </select>
            </div>
            <div className='search-container'>
                <label htmlFor='task-search'>Recherche : </label>
                <input
                    id='task-search'
                    type='text'
                    placeholder='par titre ou description...'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <div className='create-task'>
                <button className='task-create-btn' onClick={() => setIsCreating(true)} style={{ backgroundColor: isCreating ? 'gray' : 'green' }}>Créer un task</button>
                {isCreating && (
                    <div>
                        <h2>Créer une tâche</h2>
                        Titre: <input className='input-task' value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
                        Description: <input className='input-task' value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
                        Deadline: <input
                            className='input-task'
                            type="date"
                            value={newTask.deadline.toISOString().split('T')[0]}
                            onChange={e => {
                                const value = e.target.value;
                                if (isValidDate(value)) {
                                    setNewTask({ ...newTask, deadline: new Date(value) });
                                }
                            }}
                        />
                        Assigner :
                        <select className='select-task-user' value={newTask.assignedTo} onChange={e => setNewTask({ ...newTask, assignedTo: Number(e.target.value) })}>
                            <option value="">Choisir l'utilisateur</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.firstname} ({user.email})
                                </option>
                            ))}
                        </select>
                        <button className='task-create-btn' onClick={handleCreate} >Créer</button>
                        <button className='task-cancel-btn' onClick={() => setIsCreating(false)}>Annuler</button>
                    </div>
                )}
            </div>
            <div className='task-list'>
                {filteredTasks.map(task => (
                    <div key={task.id}>
                        {taskMessages[task.id!] && (
                            <div className={`message-task ${taskMessages[task.id!].type}`}>
                                {taskMessages[task.id!].message}
                            </div>
                        )}
                        <Task
                            key={task.id}
                            task={task}
                            onUpdate={handleUpdate}
                            onDelete={() => handleDelete(task.id!)}
                        />
                    </div>
                ))}
            </div>
            <Modal
                show={showModal}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                message="Etes vous sur de supprimer la tâche?"
            />
        </div>
    );
}

export default AuthCheck(TaskManager);
