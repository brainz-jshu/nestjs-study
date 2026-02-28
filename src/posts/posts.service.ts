import { Injectable, NotFoundException } from '@nestjs/common';

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'John Doe',
    title: 'My First Post',
    content: 'This is the content of my first post.',
    likeCount: 100,
    commentCount: 20,
  },
  {
    id: 2,
    author: 'Jane Smith',
    title: 'My Second Post',
    content: 'This is the content of my second post.',
    likeCount: 150,
    commentCount: 30,
  },
  {
    id: 3,
    author: 'Alice Johnson',
    title: 'My Third Post',
    content: 'This is the content of my third post.',
    likeCount: 150,
    commentCount: 30,
  },
];

@Injectable()
export class PostsService {
  getAllPosts(): PostModel[] {
    return posts;
  }

  getPostById(id: number): PostModel {
    const post = posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  createPost(author: string, title: string, content: string): PostModel {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };
    posts = [...posts, post];
    return post;
  }

  updatePost(
    postId: number,
    author?: string,
    title?: string,
    content?: string,
  ): PostModel {
    const post = posts.find((post) => post.id === Number(postId));
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }
    if (author) {
      post.author = author;
    }
    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }
    posts = posts.map((prev) => (prev.id === Number(postId) ? post : prev));
    return post;
  }

  deletePost(postId: number): number {
    const post = posts.find((post) => post.id === Number(postId));
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }
    posts = posts.filter((post) => post.id !== Number(postId));

    return postId;
  }
}
