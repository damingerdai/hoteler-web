import { Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'ngx-avatars';

@Component({
  selector: 'app-profile-menu',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    RouterLink,
    AvatarModule
  ],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss',
})
export class ProfileMenuComponent {
  username = input.required<string>();
  role = input.required<string>();

  private readonly ROLE_DISPLAY_MAP: Record<string, string> = {
    'admin': '系统管理员',
    'users': '员工',
  };

  roleDisplayName = computed(() => {
    const currentRole = this.role();
    return this.ROLE_DISPLAY_MAP[currentRole] ?? currentRole;
  });

  logout = output<void>();

  onLogout() {
    this.logout.emit();
  }
}
