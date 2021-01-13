import { Component } from '@angular/core';

interface Post {
  title: string;
  imgUrl: string;
  username: string;
  content: string;
}

@Component({
  selector: 'eden-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  posts: Post[] =[
    {
      title: 'Neat tree',
      imgUrl: 'assets/tree.jpeg',
      username: 'nature',
      content: 'Saw this awesome during my hike today'
    },{
      title: 'Snowy mountain',
      imgUrl: 'assets/mountain.jpeg',
      username: 'mountainlover',
      content: 'A picture of a snowy mountain'
    },{
      title: 'Mountain Biking',
      imgUrl: 'assets/biking.jpeg',
      username: 'biking22222',
      content: 'I did some biking today'
    }
  ]
}
