import { PostService } from './post.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get('/posts')
  getPosts(): string {
    return this.postService.getPosts();
  }
}
