import { Component, OnInit, Output, Input } from '@angular/core';
import { Task } from './shared/task';
import { TaskService } from './shared/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  filteredTasks: Task[] = [];

  @Output() tasks: Task[] = [];

  @Output() completedTasksCount: number = 0;
  @Output() ongoingTasksCount: number = 0;

  @Input() private _filterKeyword: string = '';

  set filterKeyword(value: string) {
    this._filterKeyword = value.toLowerCase();
    this.filteredTasks = this.tasks.filter((task: Task) =>
      task.text.toLowerCase().includes(this._filterKeyword)
    );
  }

  ngOnInit(): void {
    this.updateAppState();
  }

  createNewTask($taskText: string): void {
    $taskText = $taskText.trim();
    if (!$taskText) return;

    const newTask: Task = {
      id: this.taskService.generateTaskId(),
      text: $taskText,
      checked: false,
    };

    this.tasks.push(newTask);
    this.taskService.setTasks(this.tasks);
    this.ongoingTasksCount++;
  }

  updateAppState(): void {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = this.tasks;
    this.completedTasksCount = this.updateCompletedTasksCount();
    this.ongoingTasksCount = this.updateOngoingTasksCount();
  }

  updateCompletedTasksCount(): number {
    return this.tasks.filter((task: Task) => task.checked === true).length;
  }

  updateOngoingTasksCount(): number {
    return this.tasks.length - this.completedTasksCount;
  }
}
