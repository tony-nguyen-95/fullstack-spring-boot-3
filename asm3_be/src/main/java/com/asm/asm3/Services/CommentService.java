package com.asm.asm3.Services;

import com.asm.asm3.Models.Comment;
import com.asm.asm3.Repositories.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getCommentsByProductId(Long productId) {
        return commentRepository.findByProductId(productId);
    }

    public Comment createComment(Long productId, Long userId, String text, Integer rate) {
        Comment comment = new Comment();
        comment.setProductId(productId);
        comment.setUserId(userId);
        comment.setText(text);
        comment.setRate(rate);
        return commentRepository.save(comment);
    }
}
