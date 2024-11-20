import { makeAutoObservable } from "mobx";
import { API, APIRoutes } from "../apis";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export interface IComment {
  id?: number;
  productId?: number;
  userId?: number;
  text?: string;
  rate?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICommentForm {
  productId?: number;
  userId?: number;
  text?: string;
  rate?: number;
}

class CommentStore {
  comments: IComment[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  comment: ICommentForm = {}; // Holds the current form data

  constructor() {
    makeAutoObservable(this);
  }

  // Fetch comments by productId
  async fetchCommentsByProductId(productId: number) {
    this.isLoading = true;
    this.error = null;

    try {
      const { data } = await API.get(
        APIRoutes.GET_COMMENTS_BY_PRODUCT_ID(productId)
      );
      this.comments = data || [];
    } catch (error) {
      this.error = "Failed to fetch comments";
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  // Add a new comment
  async addComment() {
    try {
      const { data } = await API.post(APIRoutes.CREATE_COMMENT, this.comment);

      if (data) {
        this.fetchCommentsByProductId(this.comment.productId || 0);

        // Reset form after successful submission
        this.resetForm();

        const swal = withReactContent(Swal);
        swal.fire({
          title: "Comment added successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  }

  // Set a specific field in the comment form
  setField(field: keyof ICommentForm, value: any) {
    this.comment[field] = value;
  }

  // Reset the form to its initial state
  resetForm() {
    this.comment = {};
  }

  // Getter to compute average rating
  get averageRating() {
    if (!this.comments.length) return 0;

    const totalRating = this.comments.reduce(
      (sum, comment) => sum + (comment.rate || 0),
      0
    );
    return (totalRating / this.comments.length).toFixed(1);
  }
}

export const commentStore = new CommentStore();
