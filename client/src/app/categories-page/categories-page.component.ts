import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/interfaces'
import { CategoriesService } from '../shared/services/categories.service'

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  loading = false
  categories: Category[] = []

  constructor(private categoriesServcie: CategoriesService) { }

  ngOnInit(): void {
    this.loading = true
    this.categoriesServcie.fetch().subscribe( categories => {
      this.loading = false
      this.categories = categories
      console.log(categories)
    })
  }

}
