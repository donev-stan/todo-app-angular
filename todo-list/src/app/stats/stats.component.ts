import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  allTasksCount: number = 0;
  completedTasksCount: number = 0;
  ongoingTasksCount: number = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.updateTaskCounts();
    console.log('in component init');
    console.log(this.allTasksCount);

    this.taskService.taskCountUpdated.subscribe(
      ({ allCount, completedCount, ongoingCount }) => {
        console.log('allCount: ' + allCount);

        this.allTasksCount = allCount;
        this.completedTasksCount = completedCount;
        this.ongoingTasksCount = ongoingCount;
      }
    );
  }

  @Output() filterTasks: EventEmitter<string> = new EventEmitter();

  chnageSeleltedTasks(selector: string): void {
    this.filterTasks.emit(selector);
  }
}
