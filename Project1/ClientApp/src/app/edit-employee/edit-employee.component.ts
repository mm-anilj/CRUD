import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  employee: any;
  id: number;

  State: any = [
    { id: 1, name: "Gujarat" },
    { id: 2, name: "Maharastra" },
    { id: 3, name: "Rajasthan" }
  ]

  City: any = [
    { id: 1, name: "Ahmedabad", state: 1 },
    { id: 2, name: "Rajkot", state: 1 },
    { id: 3, name: "Gandhinagar", state: 1 },
    { id: 4, name: "Mumbai", state: 2 },
    { id: 5, name: "Pune", state: 2 },
    { id: 6, name: "Udaipur", state: 3 },
    { id: 7, name: "Jaipur", state: 3 }
  ]

  selectedState: any = "";
  selectedCity: any = "";
  dropdownCity: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrManager,
  ) {
    this.employeeForm = this.formBuilder.group({
      employeeId: [""],
      name: ["", Validators.required],
      designation: [""],
      companyName: [""],
      address: [],
      state: ["", Validators.required],
      city: ["", Validators.required]
    });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    if (this.id !== undefined) {
      this.http.get("https://localhost:44361/" + 'api/Employees1/' + this.id).subscribe(response => {
        this.employeeForm.controls["employeeId"].setValue(response["employeeId"]);
        this.employeeForm.controls["name"].setValue(response["name"]);
        this.employeeForm.controls["designation"].setValue(response["designation"]);
        this.employeeForm.controls["companyName"].setValue(response["companyName"]);
        this.employeeForm.controls["address"].setValue(response["address"]);
        this.employeeForm.controls["state"].setValue(response["state"]);
        this.dropdownCity = this.City.filter(i => i.state == parseInt(response["state"]));
        this.employeeForm.controls["city"].setValue(response["city"]);

      }, error => console.error(error));
    }
  }
  updateEmployee() {
    this.employee = this.employeeForm.value;
    if (this.id !== undefined) {
      this.http.put("https://localhost:44361/api/Employees1/" + this.id, this.employee).subscribe(response => {
        this.toastr.successToastr("updated successfully");
        this.router.navigate(["/employee"]);
      }, error =>
        this.toastr.errorToastr(error)
      );
    } else {

      this.employee["employeeId"] = 0;
      this.http.post("https://localhost:44361/api/Employees1/", this.employee).subscribe(response => {
        this.toastr.successToastr("inserted successfully");
        this.router.navigate(["/employee"]);
      }, error =>
        this.toastr.errorToastr(error)
      );
    }
  }
  populateCity(value) {
    if (value == "") {
      this.employeeForm.controls["city"].setValue("");
    }
      this.dropdownCity = this.City.filter(i => i.state == value);
  }
}
