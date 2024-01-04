import { Component } from '@angular/core';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  settingIcon = environment.GEAR
}
