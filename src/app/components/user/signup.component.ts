import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../../models/user.model";
import { AuthService } from "../../models/auth.service";

@Component({
    selector: "signup",
    templateUrl: "signup.component.html"
})

export class SignupComponent {
    
    title:string = 'Sign Up';
    public user: User = new User();
    public confirmPassword: string;
    public message: string;

    constructor(private router: Router,
        private auth: AuthService) { }

        signup(form: NgForm) {
            if (form.valid) {
                // Checks if the passwords match.
                if(this.user.password == this.confirmPassword){
                    this.auth.signupUser(this.user)
                        .subscribe(response => {
                            console.log(response);
                            
                            if (response.success) {
                                alert(response.message);
                                this.router.navigateByUrl("/user/login");
                            }
                            // Error message from the API.
                            this.message = response.message; 
                        });
                } else {
                    this.message = "Passwords do not match";    
                }
            } else {
                this.message = "All the fields are required";
            }
        }
    }