import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GithubService } from '../../service/github.service';
import { Store } from '@ngrx/store';
import { selectHistoryState } from '../../state/history.selectors';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NgIf],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  allUsers: any[] = [];
  history: number[] = [];
  users: Observable<any[]> = new Observable<any[]>();

  service = inject(GithubService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  store = inject(Store);

  constructor() {}

  ngOnInit() {
    this.fetchUsers();
    this.users.subscribe((users) => {
      this.allUsers = users;
    });
  }

  fetchUsers() {
    this.store.select(selectHistoryState).subscribe((historyState) => {
      if (historyState) {
        this.history = historyState.history;
      }
    });
    this.history.forEach((element) => {
      var data = this.service.getUserById(element);
      data.subscribe((userData) => {
        this.allUsers.push(userData);
      });
    });
  }

  browseUser(userId: number) {
    this.router.navigate(['/user', userId]);
  }
}
