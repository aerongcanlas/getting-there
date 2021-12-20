import React from 'react'
import { ITask } from '../Interfaces'

interface Props {
    task: ITask;
    undoTask(completedTask: string): void;
}

const CompletedTask = ({ task, undoTask }: Props) => {
    return (
        <div className='completedTask'>
            <div className='content'>
                <span>{task.taskName}</span>
                <span>{(task.dateCreated.getUTCMonth()+1) + '/' + task.dateCreated.getUTCDate()}</span>
            </div>
            <button onClick={() => {undoTask(task.taskName)}}>Undo</button>
        </div>
    )
}

export default CompletedTask
