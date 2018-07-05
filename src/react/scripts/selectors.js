export function countOfNotCompleted(curTasks){
    const countOfCompleted=curTasks.reduce((count,task)=> (task.isDone)?count+1:count , 0);
    const countOfNotCompleted=curTasks.length-countOfCompleted;
    return countOfNotCompleted;
}