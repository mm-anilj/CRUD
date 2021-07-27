import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.css']
})
export class NewComponentComponent implements OnInit {
  public empList: employeecast[];
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
  constructor(private router: Router,
    private http: HttpClient,
    private toastr: ToastrManager,) {

  }
  ngOnInit() {
    this.getList();
  }

  ViewEmployee(id) {
    this.router.navigate(["/edit/" + id]);
  }
  DeleteEmployee(id) {
    if (id !== undefined) {
      this.http.delete("https://localhost:44361/api/Employees1/" + id).subscribe(response => {
        this.toastr.successToastr("delete successfully");
        this.getList();
        this.router.navigate(["/employee"]);
      }, error =>
        this.toastr.errorToastr(error)
      );
    }
  }
  getList() {
    this.http.get<employeecast[]>("https://localhost:44361/api/Employees1/").subscribe(result => {
      let myArray = [];
      result.forEach((element, index) => {
        element.state = this.State.find(a => a.id == parseInt(element.state)).name;
        element.city = this.City.find(a => a.id == parseInt(element.city)).name;
        myArray.push(element);
      });
      this.empList = myArray;
    }, error => this.toastr.errorToastr(error));
  }
}

interface employeecast {
  address: string;
  companyName: string;
  designation: string;
  employeeId: number;
  name: string;
  state: string;
  city: string;
}
