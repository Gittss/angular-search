import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { GithubService } from '../../service/github.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: any = {};
  service = inject(GithubService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor() {}

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const userId = +params.get('id')!;
          return this.service.getUserById(userId);
        })
      )
      .subscribe((user) => {
        this.user = user;
      });
  }
}
