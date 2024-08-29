import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GithubService } from '../../service/github.service';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { addToHistory } from '../../state/history.actions';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, AsyncPipe, NgIf, NgForOf],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  results: any[] = [];
  allUsers: any[] = [];
  users: Observable<any[]> = new Observable<any[]>();

  service = inject(GithubService);
  router = inject(Router);
  store = inject(Store);

  constructor() {}

  ngOnInit() {
    this.fetchUsers();
    this.users.subscribe((users) => {
      this.allUsers = users;
    });
  }

  search() {
    if (this.searchQuery.trim()) {
      this.results = this.performSearch(this.searchQuery);
    }
  }

  fetchUsers() {
    this.users = this.service.getUsers();
  }

  performSearch(query: string): any[] {
    const history = this.allUsers.filter((user) =>
      user.firstName.toLowerCase().includes(query.toLowerCase())
    );
    this.store.dispatch(addToHistory({ ids: history.map((x) => x.id) }));

    return history;
  }

  browseUser(userId: number) {
    this.router.navigate(['/user', userId]);
  }
}
