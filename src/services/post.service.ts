import { BaseService } from "@/lib/core/BaseService";
import { injectable } from "tsyringe";
import { PostTable } from "@/db/schemas/post";
import { PostRepository } from "@/repository/post.repository";

@injectable()
export class PostService extends BaseService<typeof PostTable, PostRepository> {
  constructor(repository: PostRepository) {
    super(repository);
  }
}
