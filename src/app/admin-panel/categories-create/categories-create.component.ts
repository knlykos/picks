import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Apollo, Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.scss']
})
export class CategoriesCreateComponent implements OnInit {
  public category: Category = { description: null, name: null, sequence: null };
  constructor(private apollo: Apollo) {}

  ngOnInit() {}
  InsertCategories() {
    console.log(`          mutation {
      insert_categories(objects: { description: "${this.category.description}", name: "${
      this.category.name
    }", sequence: "${this.category.sequence}" }) {
        returning {
          id
        }
      }
    }`);
    this.apollo
      .mutate<Query>({
        mutation: gql`
          mutation {
            insert_categories(objects: { description: "${this.category.description}", name: "${
          this.category.name
        }", sequence: "${this.category.sequence}" }) {
              returning {
                id
              }
            }
          }
        `
      })
      .subscribe(value => {
        console.log(value);
      });
  }
}
