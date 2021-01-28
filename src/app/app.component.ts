import { Component, HostListener, OnInit } from '@angular/core';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title() {
    throw new Error('Method not implemented.');
  }

  //For filtering and Searching

  searchAndFilterTerm: string;

  //For the Table

  POSTS: any;
  pageSize: number;
  totalCount: any;
  tableSize = 1;
  tableSizes = [5, 10, 15, 20];

  collection = [];

  // For fetching data from the URL

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.postService.getAllPosts(URLSearchParams).subscribe(
      (response) => {
        this.POSTS = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //For the Table

  onTableDataChange(event: any) {
    this.pageSize = event;
    this.fetchPosts();
  }

  onTableSizeChange(event: { target: { value: number } }): void {
    this.tableSize = event.target.value;
    this.pageSize = 1;
    this.fetchPosts();
  }

  //For the Sorting function

  key: string = 'name';
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  //For the Scroll to top button

  whereToShow: boolean;
  whereToStart = 100;

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    console.log('[scroll]', scrollPosition);

    if (scrollPosition >= this.whereToStart) {
      this.whereToShow = true;
    } else {
      this.whereToShow = false;
    }
  }

  goToTheTopOfPage() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
