import React from 'react'
import { ITask } from '../Interfaces'

interface Props {
    task: ITask;
    completeTask(completedTask: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
    return (
        <div className='task'>
            <div className='content'>
                <span>{task.taskName}</span>
                <span>{task.deadline}</span>
                <span>{(task.dateCreated.getUTCMonth()+1) + '/' + task.dateCreated.getUTCDate()}</span>
            </div>
            <button onClick={() => {completeTask(task.taskName)}}>X</button>
        </div>
    )
}

export default TodoTask
