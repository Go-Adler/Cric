import { Component, OnInit } from '@angular/core';
import { FindUser } from '../post-log-in.interface';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { SearchService } from './search.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  myControl = new FormControl<string | FindUser>('');
  options: FindUser[] = [];
  filteredOptions!: Observable<FindUser[]>;
  defaultProfilePicture: string = '';

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit() {
    this.defaultProfilePicture = this.searchService.getDefualtProfilePicture();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.userName;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }

  displayFn(user: FindUser) {
    return user && user.userName ? user.userName : '';
  }

  private _filter(name: string): FindUser[] {
    const filterValue = name.toLowerCase();
    let usersArray: FindUser[] = [];

    usersArray = [
      ...usersArray,
      ...this.options.filter((option) =>
        option.userName.toLowerCase().includes(filterValue)
      ),
      ...this.options.filter((option) =>
        option.name.toLowerCase().includes(filterValue)
      ),
    ];

    return usersArray;
  }

  fetchUsers(event: any) {
    const input = event.target.value;
    if (input !== '') {
      this.searchService.fetchUsers(input).subscribe({
        next: (response) => {
          this.options = response.users;
          this.myControl.updateValueAndValidity();
        },
      });
    }
  }

  onUserSelected(user: FindUser) {
    console.log(user, 66);
    
    this.router.navigate(['/profile']);
  }
}
