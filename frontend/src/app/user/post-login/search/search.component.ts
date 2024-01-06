import { Router } from '@angular/router'
import { FormControl } from '@angular/forms'
import { Component, OnInit } from '@angular/core'

import { SearchService } from './search.service'
import { Observable, map, startWith } from 'rxjs'
import { FindUser } from '../post-log-in.interface'
import { environment } from 'src/environments/environment'


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  myControl = new FormControl<string | FindUser>('');
  options: FindUser[] = [];
  filteredOptions!: Observable<FindUser[]>
  defaultProfilePicture: string = '';
  searchIcon

  constructor(private searchService: SearchService, private router: Router) {
    this.searchIcon = environment.FIND_FRIENDS_ICON
  }

  ngOnInit() {
    this.defaultProfilePicture = this.searchService.getDefualtProfilePicture()
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.userName
        return name ? this._filter(name as string) : this.options.slice()
      })
    )
  }

  displayFn(user: FindUser) {
    return user && user.userName ? user.userName : ''
  }

  private _filter(name: string): FindUser[] {
    const filterValue = name.toLowerCase()
    let usersArray: FindUser[] = []

    let usersSet = new Set([
      ...this.options.filter((option) =>
        option.userName.toLowerCase().includes(filterValue)
      ),
      ...this.options.filter((option) =>
        option.name.toLowerCase().includes(filterValue)
      ),
    ])

    usersArray = Array.from(usersSet)

    return usersArray

  }

  debounceFunction = this.debounce(
    (value: string) => {
      this.searchService.fetchUsers(value).subscribe({
        next: (response) => {
          this.options = response.users
          this.myControl.updateValueAndValidity()
        },
      })
    }
  );

  fetchUsers(event: any) {
    const input = event.target.value
    if (input !== '') this.debounceFunction(input)
  }

  debounce(cb: (value: string) => void): (value: string) => void {
    let timeOut: NodeJS.Timeout | undefined

    return (value: string) => {
      if (timeOut) {
        clearTimeout(timeOut)
      }

      timeOut = setTimeout(() => {
        cb(value)
      }, 250)
    }
  }


  onUserSelected(user: FindUser) {
    this.router.navigate(['/user', user])
  }
}
