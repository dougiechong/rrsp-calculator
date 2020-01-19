import { Component, OnInit } from '@angular/core';
import { Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor() { }
  products = [];

  @Input() receivedParentMessage: String;

  ngOnInit() {
    this.products = this.getProducts();
    console.log(this.receivedParentMessage);
  }


  getProducts() {
      return [
          { 'id': '1', 'title': 'Screw Driver', 'price': 400, 'stock': 11 },
          { 'id': '2', 'title': 'Nut Volt', 'price': 200, 'stock': 5 },
          { 'id': '3', 'title': 'Resistor', 'price': 78, 'stock': 45 },
          { 'id': '4', 'title': 'Tractor', 'price': 20000, 'stock': 1 },
          { 'id': '5', 'title': 'Roller', 'price': 62, 'stock': 15 }
      ];
  }

}
