import React, { useState, useEffect } from 'react';
import Tag from '@/classes/Tag';
import toast from 'react-hot-toast';

const HealthHistory = ({ tagId, healthHistory, triggerRefetch }) => {
    const [showForm, setShowForm] = useState(false);
    const [newEntry, setNewEntry] = useState({
        medicine: '',
        dateApplied: '',
        details: '',
        nextApplication: ''
    });

    useEffect(() => {
        healthHistory.sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied));
    }, [healthHistory]);

    const handleChange = (e) => {
        setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Tag.addHistoryEntry(tagId, newEntry).then((data) => {
            setNewEntry({
                medicine: '',
                dateApplied: '',
                details: '',
                nextApplication: ''
            });
            triggerRefetch();
        })
            .catch(error => {
                console.error("There was an error adding the health history entry!", error);
            });
    };

    return (
        <div className='p-4'>
            <div className='flex justify-between pb-2'>
                <h2 className='font-bold'>Ficha Veterinaria</h2>
                {
                    showForm
                        ? <button onClick={() => setShowForm(false)} className='bg-red-500 text-white rounded-md p-1'>Ocultar formulario</button>
                        : <button onClick={() => setShowForm(true)} className='bg-green-500 text-white rounded-md p-1'>Agregar nuevo registro</button>
                }
            </div>
            {showForm &&
                <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                    <fieldset className={styles.fieldset}>
                        <label htmlFor="medicine">
                            Medicación
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            name="medicine"
                            value={newEntry.medicine}
                            onChange={handleChange}
                            placeholder="Medicine"
                        />
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label htmlFor="details">
                            Detalles
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            name="details"
                            value={newEntry.details}
                            onChange={handleChange}
                            placeholder="Details"
                        />
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label htmlFor="dateApplied">
                            Fecha de aplicación
                        </label>
                        <input
                            className={styles.input}
                            type="date"
                            name="dateApplied"
                            value={newEntry.dateApplied}
                            onChange={handleChange}
                        />
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label htmlFor="nextApplication">
                            Próxima aplicación
                        </label>
                        <input
                            className={styles.input}
                            type="date"
                            name="nextApplication"
                            value={newEntry.nextApplication}
                            onChange={handleChange}
                        />
                    </fieldset>
                    <button type="submit" className='bg-blue-500 text-white rounded-md p-1'>Agregar</button>
                </form>
            }
            <p className='text-sm text-gray-500'>
                Puede borrarlos haciendo clic en la fila
            </p>
            <table className='table-auto w-full text-center'>
                <thead className='bg-gray-200'>
                    <tr>
                        <th>Fecha</th>
                        <th>Medicina</th>
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody className='bg-gray-100'>
                    {healthHistory &&
                        healthHistory.map((entry, index) => (
                            <tr key={index} className='border-b border-gray-300 text-sm active:bg-gray-200'
                                onClick={() => {
                                    toast.dismiss()
                                    toast((t) => (
                                        <div>
                                            <p>¿Desea eliminar el registro? </p>
                                            <div className='flex justify-between text-white'>
                                                <button onClick={() => toast.dismiss(t.id)}
                                                    className='bg-red-400 p-1 rounded-sm'
                                                >
                                                    Cancelar
                                                </button>
                                                <button onClick={
                                                    () => {
                                                        Tag.deleteHistoryEntry(tagId, entry._id).then(() => {
                                                            triggerRefetch();
                                                            toast.dismiss(t.id);
                                                            toast.success('Registro eliminado')
                                                        })
                                                    }
                                                }
                                                    className='bg-green-500 p-1 rounded-sm'
                                                >
                                                    Borrar
                                                </button>
                                            </div>
                                        </div>
                                    ),
                                        {
                                            duration: 5000
                                        }
                                    );
                                }}
                            >
                                <td className='p-1'
                                >{new Date(entry.dateApplied).toISOString().split('T')[0]}
                                </td>
                                <td className='text-wrap max-w-1/2 p-1'>{entry.medicine}</td>
                                <td className='text-wrap max-w-[150px] text-left p-1'>
                                    {entry.nextApplication &&
                                        <p className={new Date(entry.nextApplication) < new Date() ? 'text-red-500' : '' + "underline"}>
                                            {'Próx: '}
                                            {new Date(entry.nextApplication).toISOString().split('T')[0]}
                                        </p>
                                    }
                                    {entry.details}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    fieldset: "flex gap-2 items-center justify-between",
    input: "rounded-md p-1"
};

export default HealthHistory;
