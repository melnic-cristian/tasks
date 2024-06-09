import { CommentDTO } from "./comment.dto";
import { PostDTO } from "./post.dto";

export type ExtendedPostDTO = PostDTO & {
    showComments: boolean;
    comments: CommentDTO[];
    loadingComments: boolean;
};