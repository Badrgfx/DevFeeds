import { UserService } from './../services/user.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';


export class UsernameValidators {
    constructor(private userService: UserService) {
    }


    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {

        if ((control.value as string).indexOf(' ') >= 0) {
            return { cannotContainSpace: true };
        }
        return null;
    }

}
