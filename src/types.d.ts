enum JobStatus {
    Waiting = 0,
    InProgress,
    Done
}

type Job = {
    id: number;
    title: string;
    description: string;
    whoAssigned: string;
    assignedTo: string;
    dateOfAssigning: Date;
    dueToDate: Date;
    status: JobStatus;
}