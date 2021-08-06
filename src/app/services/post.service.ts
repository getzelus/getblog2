import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService {

  let url: string = "";
  postsSubject = new Subject<any[]>();

  private posts = [
    {
      id: 1,
      title: "Création",
      content: "Bienvenu sur mon blog !",
      loveIts: 0,
      created_at:  new Date('February 9, 2019 15:13:00')
    },
    {
      id: 2,
      title: "Lorem",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      loveIts: -1,
      created_at:  new Date('February 10, 2019 16:24:00')
    },
    {
      id: 3,
      title: "Angular",
      content: "C'est un merveilleux framework.",
      loveIts: 1,
      created_at:  new Date('February 11, 2019 17:15:00')
    },
    {
      id: 4,
      title: "Nouvelle fonctionnalité",
      content: "On peut supprimer des posts en cliquant sur la petite croix.",
      loveIts: 2,
      created_at:  new Date('February 24, 2019 20:44:00')
    }   
  ];

  constructor(private httpClient: HttpClient) { }

  emitPostSubject() {
    this.postsSubject.next(this.posts.slice());
  }

  resetLikes() {
    for(let post of this.posts) {
      post.loveIts = 0;
    }
    this.emitPostSubject();
  }
  changeLike(num: number, i: number){
    this.posts[i].loveIts += num;
    this.emitPostSubject();
  }

  getPostById(id: number) {
    const post = this.posts.find(
      (s) => {
        return s.id === id;
      }
    );
    return post;
  }

  addPost(title: string, content: string) {
    const postObject = {
      id: 0,
      title: '',
      content: '',
      loveIts: 0,
      created_at:  new Date()
    };
    postObject.title = title;
    postObject.content = content;
    postObject.id = this.posts[(this.posts.length - 1)].id + 1;
    this.posts.push(postObject);
    this.emitPostSubject();
  }

  savePostsToServer() {
    this.httpClient
      .put(url, this.posts)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  getPostsFromServer() {
    this.httpClient
      .get<any[]>(url)
      .subscribe(
        (response) => {
          this.posts = response;
          this.emitPostSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  removePost(id: number) {
    this.posts.splice(id, 1);
  //  this.saveBooks();
    this.emitPostSubject();
  }



}
