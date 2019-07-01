import { Component, OnInit } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Category } from 'src/app/models/category';
import { Betts } from 'src/app/models/betts';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-betts-create',
  templateUrl: './betts-create.component.html',
  styleUrls: ['./betts-create.component.scss']
})
export class BettsCreateComponent implements OnInit {
  public bet: Betts = { title: null, description: null, categoryId: null, createdAt: null };
  public category: Category = { id: 1, description: null, name: null, sequence: null };
  public categories: Category[] = [{ description: null, id: null, name: null, sequence: null }];

  public bettsForm = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    categoryId: [null, Validators.required],
    createdAt: [new Date(), Validators.required]
  });
  constructor(private apollo: Apollo, private fb: FormBuilder) {}

  ngOnInit() {
    this.getCategories();
  }

  public getCategories() {
    this.apollo
      .watchQuery<{ categories: Category[] }>({
        query: gql`
          {
            categories {
              id
              description
              name
            }
          }
        `
      })
      .valueChanges.subscribe(({ data, loading }) => {
        console.log(loading);
        this.categories = data.categories;
        // this.categories = data.data.categories;
      });
  }

  public insertBetts() {
    console.log(this.category);
    this.apollo
      .mutate<Query>({
        mutation: gql`
        mutation {
          insert_betts(
            objects: {
              categoryId: ${this.category.id}
              description: "${this.bet.description}"
              event_url: "${this.bet.eventUrl}"
              title: "${this.bet.title}"
            }
          ) {
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
