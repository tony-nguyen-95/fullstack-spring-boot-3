package com.asm.asm3.Controllers;

import com.asm.asm3.DTOs.CommentCreateDto;
import com.asm.asm3.Models.Comment;
import com.asm.asm3.Services.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{productId}")
    public ResponseEntity<List<Comment>> getCommentsByProductId(@PathVariable Long productId) {
        List<Comment> comments = commentService.getCommentsByProductId(productId);
        return ResponseEntity.ok(comments);
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody CommentCreateDto request) {
        Comment comment = commentService.createComment(request.getProductId(), request.getUserId(), request.getText(),
                request.getRate());
        return ResponseEntity.status(201).body(comment);
    }

}
