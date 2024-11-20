import { Pipe, PipeTransform } from '@angular/core';
import { IRole } from '../models/roles';

@Pipe({
    name: 'userRoleDisplay',
    standalone: false
})
export class UserRoleDisplayPipe implements PipeTransform {
  transform(roles?: IRole[]): string {
    if (!roles || roles.length === 0) {
      return '无';
    }
    return roles.map((role) => role.name).join(', ');
  }
}
